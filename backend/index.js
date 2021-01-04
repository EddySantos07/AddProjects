const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../dist'))


//view engine
app.set('view engine', 'ejs');


//declare port
const port = 5000;
// app is listening on port 
app.listen( port, () => {
    console.log(`Server started on port ${port}`);
})