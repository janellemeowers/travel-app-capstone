// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));


// Setup Server
app.listen(3000, function () {
  console.log("server has started on port 3000");
});

//GET route returns projectData
//FIX FOR WEBPACK 'dist/index.html'

app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
});

//app.get('/', function (req, res) {
//  res.send(projectData);
//});

//POST route adds incoming projectData

app.post('/add', function (req, res) {
projectData.locationAnswer = req.body.location;
projectData.dateAnswer = req.body.dateAnswer;
projectData.weather = req.body.weather;
projectData.daysUntil = req.body.daysUntil;
   res.send(projectData);
 });
