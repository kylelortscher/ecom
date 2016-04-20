//Framework
var express    = require('express');
//Shows routes being accessed
var morgan     = require('morgan');
//Connects to mongoose
var mongoose   = require('mongoose');
//Can get the data from html
var bodyParser = require('body-parser');
//Template system to put JS in HTML
var ejs        = require('ejs');

var ejsMate   = require('ejs-mate');

//Model
var User = require('./models/user');

//Using express
var app = express();


//Connecting To Mongoose Database
mongoose.connect("mongodb://localhost/market");

//Express Middleware To Setup public as the folder for static files
app.use(express.static(__dirname + '/public'));

//Morgan Middleware To Show The Routes That A User Is Accessing
app.use(morgan('dev'));
//bodyParser Middleware To Retrieve Data From Html
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//ejs middleware
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

app.post('/create-user', function(req, res){
    var user = User();

    user.profile.name = req.body.name;
    user.password     = req.body.password;
    user.email        = req.body.email;

    user.save(function(err){
        if(err) {
            console.log(err);
        } else {
            res.json('Successfully Created New User');
        }
    })

});

app.get('/', function(req, res){
   res.render("main/home");
});

app.get('/about', function(req, res){
   res.render("main/about");
});

app.listen(3000, function(err){
   if (err) throw err;
    console.log("Server is running on port 3000");
});