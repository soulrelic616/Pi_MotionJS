/*var http = require("http");
var express = require("express");
var app = express();*/

var express = require('express');
var app = express();
var server = require('http').createServer(app);
//var io = require('..')(server);

var port = process.env.port || 3700;

var io = require('socket.io').listen(app.listen(port));

var gpio = require('gpio');
//var socket = io.connect('/');

app.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function(socket) {
    socket.on('pirstatus', function(data) {
        io.sockets.emit('pirstatus', data);
    });
    
    
    //GPIO functions
    var gpio7 = gpio.export(7, {
        direction: "in",
        ready: function() {
            console.log('ready');
        }
    });
    gpio7.on("change", function(val) {
        console.log(val)
        if (val == 0) {
            socket.emit('pirstatus', false);
            console.log(true);
        } else {
            socket.emit('pirstatus', true);
            console.log(false);
        }
    });
    
});


console.log("Listening on port " + port);