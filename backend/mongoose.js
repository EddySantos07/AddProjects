const mongoose = require("mongoose");

const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");

const mongoURI = `mongodb+srv://Eddy:${process.env.mongoURIPass}@showcase.jaglz.mongodb.net/${process.env.mongoURIDBName}?retryWrites=true&w=majority`;

mongoose.set("useUnifiedTopology", true);

//create mongo connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;

//init gfs
let gfs;

// when our connection is opened set gfs to Grid
connection.once("open", () => {
  //initialized our stream
  gfs = Grid(connection.db, mongoose.mongo);

  // specify what we want to use for a collection name
  gfs.collection("uploads");
  console.log('connected!')
});


const Check_If_File_And_Table_Is_Valid = (fileName, tableName) => {
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
          console.log("rejected?");
          return reject(err);
        }
        console.log(req.body);

        let bucket_name = req.body.text;
        const filename = buf.toString("hex") + path.extname(file.originalname);

        console.log(filename, "File name?");

        let CheckIfFileIsValid = Check_If_File_And_Table_Is_Valid(
          filename,
          bucket_name
        );

        const fileInfo = {
          filename: filename,
          bucketName: `${bucket_name}`,
        };

        // if (CheckIfFileIsValid === false) {
        //   console.log('rejected')
        //   // return false;
   
        //   //then res. redirect and pop an err 
        // } else if ( CheckIfFileIsValid === true ) {

        //   console.log("resolved?");
        //   resolve(fileInfo);
        // }

        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

module.exports.Check_If_File_And_Table_Is_Valid = Check_If_File_And_Table_Is_Valid
module.exports.upload = upload;
