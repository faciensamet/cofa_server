const express = require('express')
const app = express()

var config = 
{
    serverName:"Cofa #" + GetRandomInt(100000, 999999),
  
    open_server: 1, // 0 - private, 1 - open(anyone can see your server)
    permission_write: 0, // 0 - all, 1 - authorized person
};

function GetRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db');

// create db table  user = uuid,  content = base64
db.run('CREATE TABLE if not exists "data" (	"no"	INTEGER,	"user"	TEXT, "content"	TEXT,	"date"	TEXT DEFAULT CURRENT_TIMESTAMP,	PRIMARY KEY("no" AUTOINCREMENT));');

exports.Start = () => {
    app.listen(3000)
    app.get('/', function (req, res) 
    {
        res.send('Hello World - ' + config.serverName);
    });

    app.get("/v1/add", function(req, res)
    {
        db.run('INSERT INTO "main"."data"("user", "content") VALUES ("' + req.query.u + '", "' + req.query.c + '");');
        res.send("1");
    });

    app.get("/v1/get", function(req, res)
    {
        
        res.send("1");
    });
}