var express = require('express');

var apifriends = express.Router();

apifriends.get('/', function(req, res) {
  res.send('Hello from API friends root route.');
});
 
apifriends.get('/list', function(req, res) {
  res.send('List of friends.');
});

module.exports = apifriends;