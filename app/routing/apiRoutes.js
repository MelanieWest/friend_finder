var express = require('express');
var apifriends = express.Router();

//data from other files
var friendsArray = require('../data/friends.js')

//access the data and display

apifriends.get('/list', function (req, res) {
  res.json(friendsArray);
});



apifriends.post('/', function (req, res) {
  //res.send('Hello from API friends root route.');

  //take UserData and find a match.  Return the match to the 'submit' function that called it,
  //where it will be stuffed into the modal
  
  var friendName = req.body.name;
  var friendPhoto = req.body.photo;
  var friendScores = req.body.scores;

  var newFriend = {
    name: friendName,
    scores: friendScores,
    photo: friendPhoto
  }

  //if I push 'newFriend' into the array now, they will match with themselves..

  //res.json(newFriend)	

  function findMatch(data) {
    var lowestDiff = 100;
    var match;

    for (var i = 0; i < friendsArray.length; i++) {

      var currentDiff = 0;

      for (var j = 0; j < newFriend.scores.length; j++) {
        //+= means to take the current value and add whatevers to the left of =...
        //math. ab-->give absoulute number so i can do (ex. 1-2), and get a positive answer
        //parseInt-->takes string makes it an integer
        currentDiff += Math.abs(parseInt(newFriend.scores[j]) - parseInt(friendsArray[i].scores[j]));
      }
      // console.log(currentDiff);
      //compare current diff to the lowest diff, if it's lower, set that as the new match.
      if (currentDiff <= lowestDiff) {
        lowestDiff = currentDiff;
        match = friendsArray[i];
        //console.log(match);   //this never logs
      }
    }
    
    friendsArray.push(newFriend)
    console.log(match);
    res.json(match);
    return match;
 

  }
  findMatch();

});

module.exports = apifriends;