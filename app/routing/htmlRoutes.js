var express = require('express');
var path = require("path");

var apipublic = express.Router();

apipublic.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});

apipublic.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/survey.html"));
});
module.exports = apipublic;

