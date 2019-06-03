/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/


var express = require('express');
var path = require("path");
var exphbs = require("express-handlebars");
var assert = require("assert");
var mongo = require("mongodb").MongoClient;
var router = express.Router();

var url = "mongodb://localhost:27017/bucket/user"

router.get("/get-date", function(req, res, next){
    
});

router.get("/insert", function(req, res, next){
    var resultArray = []
  mongo.connect(url, function(err, db){
      assert.equal(null, err);
      var cursor = db.collection("user").find();
      cursor.forEach(function(doc, err){
          assert.equal(null, err);
          resultArray.push(doc)
      }, function(){
          db.close();
          res.render("index", {items: resultArray});
      });
  });
});

router.get("/update", function(req, res, next){
    
});

router.get("/delete", function(req, res, next){
    
});

module.exports = router;

var app = express();

app.set('views', path.join(__dirname, "views"));
app.engine('handlebars',exphbs({defaultLayout : "main"}));
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, '/public')));

app.set("port", (process.env.PORT || 3000));

var profile = {
    "you" : [
        {
    "naam" : "Herman janssen",
"lidSinds" : "2017" ,
"type" : "Ontdekker",
"profielFotoUrl":  "images/profile/jouwprofielfoto.png",
"zoekType" : "ontdekker of een avondturier"
}]};

var people = 
{
"users" : [
    {
     "naam" : "Lisa van Poten",
 "lidSinds" : "2017" ,
 "type" : "Ontdekker",
 "profielFotoUrl":  "lisa.png",
 "zoekType" : "ontdekker of een avondturier",
 "wilGraag" : "Ik wil graag de Mount Everest is een keer beklimmen"
},
{
    "naam" : "Loes van Katen", 
    "lidSinds" : "2016",
    "profielFotoUrl": "loes.png",
    "zoekType" : "Relaxer",
    "wilGraag" : "Ik wil graag nog eens de Grand Canyon zien"
},
{
  "naam" : "Marjolein van Goten", 
  "lidSinds" : "2016",
  "profielFotoUrl": "marjolein.png",
  "zoekType" : "Relaxer",
  "wilGraag" : "Ik wil graag nog eens de Grand Canyon zien"
}
]

}

app.get("/", function(req, res){
    res.render("index",{
        content : "Dit is content",
        people : people,
        profile : profile,
        title : "Home"
    }
    );
})

app.get("/buckettest", function(req, res){
    res.render("buckettest",{
        title : "Test"
       }
    );
})

app.get("/:search", function(req, res){
    res.render("error",{
        title : "Error"
       }
    );
})

app.listen(app.get('port'), function(){
    console.log("server started on port " + app.get("port"))
})
var words = {
    "Relaxer" : 5,
    "ontdekker": 6,
    "Avondturier": 7

}

function listening() {
    console.log("im listening")
};

app.use(express.static('website'));

app.get('/bucketlist', sendBucketlist);

function sendBucketlist(request,response){
    response.send("Ik heb een bucketlist")
};

app.get('/search/:search/:num', userSearch);

function userSearch(request,response){
    var data = request.params;
    var num = data.num;
    var reply = "";
    for ( var i = 0 ; i < num ; i++){
reply += "ik heb " + data.search + " gezocht"
    }
    response.send(reply)
};

app.get('/all', sendAll);

function sendAll(request, response){
    response.send(words);
}

app.get('/add/:word/:score?', addWord);

function addWord(request,response){
    var data = request.params;
    var word = data.word;
    var score = Number(data.score);
    var reply;
    
    words[word] = score;
if (!score){
    var reply = {
        message : "I need a score"
    }
}
else {
    var reply = {
        message : "thanks for the word"
    }
}
    response.send(reply)
};

app.get('/search/:word/', searchWord);

function searchWord(request, response){
    var word = request.params.word;
    var reply;
    if (words[word]){
       reply = {
           status: "found",
        word: word,
        score : words[word]
    }
}
    else{
        reply = {
            status: "not found",
         word: word
         
    }
}
response.send(reply);
}
