const express = require("express");
const bodyParser = require("body-parser");

const methodOverride = require("method-override");
// const popup = require('popups');

require("dotenv").config();

// get funcs from mongoose
const { upload } = require("./mongoose");
const { Check_If_File_And_Table_Is_Valid } = require("./mongoose");
const { findProjects } = require("./mongoose");
//
const app = express();

//middle ware

// telling method override that we want to make a query string in order to make a delete req
app.use(methodOverride("_method"));

//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../dist"));
//

//declare port
const port = 5000;

// app is listening on port
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get( '/invalidForm', ( req, res ) => {

  res.end()
})

app.post("/validationForm", upload.single("file"), (req, res) => {
  let fileName = req.body.fileName;
  let collectionName = req.body.text;

  let formValidation = Check_If_File_And_Table_Is_Valid(
    fileName,
    collectionName
  );

  console.log(formValidation);
  console.log(req.body, "req body");

  // if form validation is false

  if (formValidation === false) {
    // then we can pop up an err to the page,

    console.log("form validation did not pass");
    res.end()
    return;
  } else {

    // else we have to make a pop up saying file save successful!
    res.status(200).send( req.body );
    return;
  }

  
});

app.get("/GetAllProjects", async (req, res) => {
  try {
    let areThereProjects = await findProjects();
    console.log(areThereProjects, "are there projects?");
  } catch (err) {
    console.log(err);
  }
  req.body.test = 'test'
  res.send(req.body)
  res.end();
});

/////////////////////
