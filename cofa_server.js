const express = require('express')
const app = express()

var config = 
{
    serverName:"Cofa #" + GetRandomInt(100000, 999999),
    port: 30123,
  
    open_server: 1, // 0 - private, 1 - open(anyone can see your server)
    permission_write: 0, // 0 - all, 1 - authorized person
};

function GetRandomInt(min, max)
 {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db');

// create db table  username = base64,  content = base64
db.run('CREATE TABLE if not exists "contents" (	"no" INTEGER, "uid" TEXT, "content" TEXT, "date" TEXT DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY("no" AUTOINCREMENT));');
db.run('CREATE TABLE if not exists "user" (	"no" INTEGER, "uid" TEXT, "name" TEXT, "message" TEXT, "join_date" TEXT DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY("no" AUTOINCREMENT));');

exports.Start = () => 
{
    app.listen(config.port)
    app.get('/', function (req, res) 
    {
        res.send('Hello World - ' + config.serverName);
    });

    app.get("/v1/add", function(req, res)
    {
        db.run('INSERT INTO "contents" ("username", "content") VALUES ("' + req.query.u + '", "' + req.query.c + '");');
        res.send("1");
    });

    app.get("/v1/get", function(req, res)
    {
        var start = req.query.s;
        if(start==undefined)
            start = 0;

        var result = [];

        db.all('select * from contents where no > ' + start + ' limit 10', [], (err, rows) => 
        {
            if (err) 
            {
                throw err;
            }
            rows.forEach((row) => 
            {
                result.push(row);
            });

            res.send(JSON.stringify(result));
        });
        
    });
}