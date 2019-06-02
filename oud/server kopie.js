/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/

console.log("server werkt");
var express = require('express');
var app = express();
var server = app.listen(3000 , listening);
var path = require("path");
var exphbs = require("express-handlebars");

app.set('views', path.join(__dirname, "views"));
app.engine('handlebars',exphbs({defaultLayout : "main"}));
app.set("view engine", "handlebars");

app.set("port", (proces.env.PORT || 3000));


app.get("/", function(req, res){
    res.render("home");
})

app.listen(app.get('port'), function(){
    console.log("server started on port" + app.get("port"))
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
