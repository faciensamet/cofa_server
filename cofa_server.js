const express = require('express')
const app = express()

var serverName = "Cofa #" + GetRandomInt(100, 999);

function GetRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

exports.Start = () => {
    app.listen(3000)
    app.get('/', function (req, res) {
        res.send('Hello World - ' + serverName);
    })
}