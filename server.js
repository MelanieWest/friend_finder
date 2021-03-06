// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require('fs')

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// html + api Routes
// =============================================================

//require('./app/rounting/apiRoutes');
app.use('/api/friends', require('./app/routing/apiRoutes'));
app.use('/', require('./app/routing/htmlRoutes'));

// app.get('/', function(req, res) {
//   res.send('Hello from root route.');
// });


//lets the server recongnize the js files
app.use(express.static('app'));

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

