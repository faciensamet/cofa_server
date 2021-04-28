const express = require('express')
const app = express()

var serverName = "Cofa #" + GetRandomInt(100, 999);

function GetRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db');
// user : uuid 
// content : base64
db.run('CREATE TABLE if not exists "data" (	"no"	INTEGER,	"user"	TEXT, "content"	TEXT,	"date"	TEXT DEFAULT CURRENT_TIMESTAMP,	PRIMARY KEY("no" AUTOINCREMENT));');

exports.Start = () => {
    app.listen(3000)
    app.get('/', function (req, res) 
    {
        res.send('Hello World - ' + serverName);
    });

    app.get("/v1/chat", function(req, res)
    {
        db.run('INSERT INTO "main"."data"("user", "content") VALUES ("' + req.query.u + '", "' + req.query.c + '");');
        res.send("1");
    });
}