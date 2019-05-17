/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/

console.log("server werkt");
var express = require('express');
var app = express();
var server = app.listen(3000 , listening);

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

