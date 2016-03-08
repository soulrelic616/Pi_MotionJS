//var socket = require('socket.io-client')('http://xxxxxxxxxxxxxx');
var socket = require('socket.io-client')('/');
socket.emit('pirstatus', false);
var gpio = require("gpio");
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
    } else {
        socket.emit('pirstatus', true);
    }
});