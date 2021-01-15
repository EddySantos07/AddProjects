const express = require("express");
const bodyParser = require("body-parser");

const methodOverride = require("method-override");
// const popup = require('popups');

require("dotenv").config();

// get funcs from mongoose
const { upload } = require("./mongoose");
const { Check_If_File_And_Table_Is_Valid } = require("./mongoose");
const { findProjects } = require("./mongoose");
const { getCollections } = require("./mongoose");
const { resolvePromises } = require("./mongoose");
const { getDocumentsFromCollections } = require("./mongoose");

//
const app = express();

//middle ware

// telling method override that we want to make a query string in order to make a delete req
app.use(methodOverride("_method"));

//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../dist"));
//

const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// app.post('/formValid' , upload.single("file") , ( req, res) => {
//   console.log('form passed')
//   res.status(200).send(req.body);
// })

app.post("/validationForm", upload.single("file"), (req, res) => {
  console.log(req.body, "req bod");
  let collectionName = req.body.text;
  let fileName = req.body.originalName;

  let formValidation = Check_If_File_And_Table_Is_Valid(
    collectionName,
    fileName
  );

  console.log(collectionName, fileName);

  // if form validation is false
  if (formValidation === false) {
    // then we can pop up an err to the page,

    console.log("form validation did not pass");
    res.status(200).send(req.body);
  } else {
    // else we have to make a pop up saying file save successful!
    res.status(200).send(req.body);
  }
});

app.get("/GetAllProjectCollections", async (req, res) => {
  try {
    // let areThereProjects = await findProjects();
    let getCollectionsResult = await getCollections();
    let resolvedGetCollections = await resolvePromises(getCollectionsResult);

    res.send(resolvedGetCollections);
  } catch (err) {
    console.log(err);
  }
});

app.put("/GetImagesFromCollections", async (req, res) => {
  try {
    console.log("called from Get images");

    let collectionsData = req.body.collections;

    /*  Reading in parallel  */

    let collectionDataPromise = await Promise.all(
      collectionsData.map(async (collection) => {
        let result = await getDocumentsFromCollections(collection);

        return result;
      })
    );

    /* -----------  https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop

    ------------------  Reading in sequence
    let result = []; 

    for (let i = 0; i < collectionsData.length; i++) {
      let data = await getDocumentsFromCollections(collectionsData[i]);
      result.push(data);
    }

    */

    console.log("after calculations");

    console.log(
      // collectionDataPromise,
      result,
      "awaited collection data promise! after calculations"
    );
    res.end();
  } catch (err) {
    console.log(err);
  }
});

/////////////////////
