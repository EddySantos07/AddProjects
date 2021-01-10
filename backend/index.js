const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();
//

const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");

// get funcs from mongoose

const { upload } = require("./mongoose");
const { Check_If_File_And_Table_Is_Valid } = require('./mongoose');
//
const app = express();

//middle ware

// adds body for requests to make things easier using multer
// const busboy = require('busboy')
// const busboy = require('express-busboy');
// busboy.extend(app);

// telling method override that we want to make a query string in order to make a delete req
app.use(methodOverride("_method"));

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

// route to POST to /upload
//desc uploads file to mongo


// upload.single('file') 

app.post("/validationForm",  upload.single('file')  ,(req, res) => {

  //grab the original name to check if its an actual file
  //then grab the name of the bucket and validate
  console.log( req.body.text, 'REQ TEXT')
  console.log(req.body, 'REQ BODY')
  console.log(req.body.files, 'BODY FILE')
  console.log(req.file, 'REQ FILE')

  res.redirect('/')
  res.end();
});

app.post('/uploadFile', upload.single('file') , (req, res) => {
  console.log('redirected')
  res.json({file: req.file})
  res.end();
})

/////////////////////
