const express = require('express');
const bodyParser = require("body-parser");

require('dotenv').config();
// 

const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

//

const app = express();

//middle ware

app.use(methodOverride('_method'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../dist'))

//

//view engine
app.set('view engine', 'ejs');


//declare port
const port = 5000;
// app is listening on port 
app.listen( port, () => {
    console.log(`Server started on port ${port}`);
})


/////////////////////

// const mongoURI = `mongodb+srv://Eddy:${process.env.PASSWORD}@showcase.jaglz.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;

