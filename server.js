/*var http = require("http");
var express = require("express");
var app = express();*/

var express = require('express');
var app = express();
var server = require('http').createServer(app);
//var io = require('..')(server);

var port = process.env.port || 3700;

var io = require('socket.io').listen(app.listen(port));

app.use(express.static(__dirname + '/public'));

/*app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client.html')
});*/

io.sockets.on('connection', function(socket) {
    socket.on('pirstatus', function(data) {
        io.sockets.emit('pirstatus', data);
    });
});

console.log("Listening on port " + port);