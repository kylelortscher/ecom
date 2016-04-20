var express  = require('express');
var morgan   = require('morgan');
var mongoose = require('mongoose');
var app = express();


//Connecting To Mongoose Database
mongoose.connect("mongodb://localhost/market");

//Morgan Middleware To Show The Routes That A User Is Accessing
app.use(morgan('dev'));

app.get('/', function(req, res){
    res.json('Hi There');
});

app.listen(3000, function(err){
   if (err) throw err;
    console.log("Server is running on port 3000");
});