const mongoose = require("mongoose");

const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const { table } = require("console");
const { resolve } = require("path");

const mongoURI = `mongodb+srv://Eddy:${process.env.mongoURIPass}@showcase.jaglz.mongodb.net/${process.env.mongoURIDBName}?retryWrites=true&w=majority`;

mongoose.set("useUnifiedTopology", true);

//create mongo connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;

//init gfs
let gfs;
let gridFSBucket;

// when our connection is opened set gfs to Grid
connection.once("open", () => {
  //initialized our stream
  gfs = Grid(connection.db, mongoose.mongo);

  // gridFSBucket = new mongoose.mongo.GridFSBucket(connection.db , {
  //   bucketName: 'uploads'
  // });

  // specify what we want to use for a collection name
  // gfs.collection("uploads");
  console.log("connected!");
});

///// -----------
const Check_If_File_And_Table_Is_Valid = (fileName, tableName) => {
  if (fileName === undefined || tableName === undefined) {
    return false;
  }

  if (tableName.length === 0 || fileName.length === 0) {
    return false;
  } else if (fileName.length > 0 && tableName.length > 0) {
    return true;
  }
};

//create storage obj;
const storage = new GridFsStorage({
  // we use our own url to connect to our mongoDB
  url: mongoURI,
  file: (req, file) => {
    // it then returns a promise
    console.log("grid fs called?");
    return new Promise((resolve, reject) => {
      // crypto.randomBytes is used to make a random string of 16 chars
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }

        let bucket_name = req.body.text;
        const filename = buf.toString("hex") + path.extname(file.originalname);

        const fileInfo = {
          filename: filename,
          bucketName: `${bucket_name}`,
        };

        resolve(fileInfo);
      });
    });
  },
});

const fileFilter = (req, file, callBack) => {
  let extension = path.extname(file.originalname);
  let collection = req.body.text;
  console.log(req.body, "req body");

  console.log(extension, "extnsion ", collection, "collection");

  console.log(req.body, "req body2");
  if (extension === undefined || collection === undefined) {
    req.body.isPicture = false;
    req.body.originalName = file.originalname;
    req.body.fileName = file.originalname;

    return callBack(null, false);
  }

  if (
    extension !== ".png" &&
    extension !== ".jpg" &&
    extension !== ".gif" &&
    extension !== ".jpeg"
  ) {
    req.body.fileName = file.originalname;
    req.body.originalName = file.originalname;
    req.body.isPicture = false;
    return callBack(null, false);
  }

  if (collection.length < 1) {
    req.body.fileName = file.originalname;
    req.body.originalName = file.originalname;
    req.body.isPicture = true;

    return callBack(null, false);
  }

  req.body.fileName = file.originalname;
  req.body.originalName = file.originalname;
  req.body.isPicture = true;

  console.log("passed and going into db");
  callBack(null, true);
};

const upload = multer({
  fileFilter: fileFilter,
  storage: storage,
});

//------ get projects in db

let findProjects = () => {
  return new Promise((resolve, reject) => {
    gfs.files.find().toArray((err, files) => {
      if (err) {
        console.log(err);
      }

      if (!files || files.length === 0) {
        return resolve(false);
      }

      return resolve(files);
    });
  });
};

const resolvePromises = async (promise) => {
  let val;

  if (promise === undefined) {
    val = await Promise.resolve(promise).then((collections) => {
      return collections;
    });

    return val;
  }

  val = await Promise.all(promise).then((collections) => {
    return collections;
  });

  return val;
};

const getCollections = async () => {
  try {
    let collectionPromise = await new Promise((resolve, reject) => {
      connection.db.listCollections().toArray(async (err, collections) => {
        if (err) {
          console.log(err);
          return reject(err);
        }

        return resolve(collections);
      });
    });

    return collectionPromise;
  } catch (err) {
    console.log(err);
  }
};

const getDocumentsFromCollections = async (collection) => {
  try {
    let collectionName = collection.name;

    let Get_Collection_Promise = await new Promise((resolve, reject) => {
      connection.db.collection(collectionName, async (err, collection) => {
        if (err) {
          return reject(err);
        }

        return resolve(collection);
      });
    });

    let Get_Document_Promise = await new Promise((resolve, reject) => {
      Get_Collection_Promise.find({}).toArray((err, data) => {
        if (err) {
          return reject(err);
        }

        data.unshift({ collectionName });
        return resolve(data);
      });
    });

    return Get_Document_Promise;
  } catch (err) {
    console.log(err);
  }
};

const findImg = async (fileName, collection) => {
  //specify our collection so it doesnt defualt a collection and return null
  gfs.collection(collection);

  let fileResult = await new Promise((resolve, reject) => {
    gfs.files.findOne({ filename: fileName }, (err, file) => {
      // console.log(file, "filee");
      // const readStream = gfs.createReadStream(file.filename);
      // console.log(gfs.files.find({}))
      // console.log(file)
      return resolve(file.filename);
    });
  });

  console.log(fileResult, "this is file result");
  return fileResult;
};

const imageFileGetReq = async (req, res) => {
  try {
    
    let fileName = req.params.filename;
    let collection = req.params.collection;

    //remove the .files extension from collection so gfs can add the .files extension and avoid bugs
    collection = collection.slice(0, -6);

    let fileResult = await findImg(fileName, collection);

    gridFSBucket = new mongoose.mongo.GridFSBucket(connection.db, {
      bucketName: collection,
    });

    const readStream = gridFSBucket.openDownloadStreamByName(fileResult);
    readStream.pipe(res);

  } catch (err) {
    console.log(err);
  }
};

module.exports.imageFileGetReq = imageFileGetReq;
module.exports.gfs = gfs;
module.exports.findImg = findImg;
module.exports.getDocumentsFromCollections = getDocumentsFromCollections;
module.exports.resolvePromises = resolvePromises;
module.exports.getCollections = getCollections;
module.exports.Check_If_File_And_Table_Is_Valid = Check_If_File_And_Table_Is_Valid;
module.exports.upload = upload;
module.exports.findProjects = findProjects;
