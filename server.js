// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require('fs')


//data from other files
var friendsArray = require('./app/data/friends.js')

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

//Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

app.get('/api/friends', function(req, res){
  res.json(friendsArray);
});

app.post('/api/friends', function(req, res){

	var friendName = req.body.name;
	var friendPhoto = req.body.photo;
	var friendScores = req.body.scores;
	
	var newFriend = {
		name : friendName,
		scores : friendScores,
		photo : friendPhoto
	}

	// friendsArray.push(newFriend)
	
	// res.json(newFriend)	

	function findMatch(data){
    var lowestDiff = 100;
    var match;
    
    for (var i = 0; i < friendsArray.length; i++){
     
        var currentDiff = 0;
       
        for (var j = 0; j < newFriend.scores.length; j++){
       //+= means to take the current value and add whatevers to the left of =...
       //math. ab-->give absoulute number so i can do (ex. 1-2), and get a positive answer
       //parseInt-->takes string makes it an integer
            currentDiff+=Math.abs(parseInt(newFriend.scores[j]) - parseInt(friendsArray[i].scores[j]));
        }
        // console.log(currentDiff);
        //compare current diff to the lowest diff, if it's lower, set that as the new match.
        if (currentDiff <= lowestDiff){
            lowestDiff = currentDiff;
            match = friendsArray[i];
            console.log(match) 

        }
    }
    return match;
      // res.json(match);
}
findMatch();
});

 

//lets the server recongnize the js files
app.use(express.static('app'));

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});






