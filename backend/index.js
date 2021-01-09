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

app.post('/', (req, res) => {
  console.log('redirected')
  res.send(403)
})
// upload.single('file') 

app.post("/validationForm",(req, res ) => {


});

/////////////////////
