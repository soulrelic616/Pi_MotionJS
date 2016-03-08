//NOTE: Remember this: ssh bernardobozo@10.50.7.37

/*
         * Instructions:
         * 
         * 1. From the raspberry's console login to the PC/Mac console via SSH 
         * ssh username@IP
         * type yes and proceed
         * type the PC's profile password
         * 
         * 2. Once logged into the pc we need to kick the localhost server:
         * navigate to the webapp directory in the console using the cd command
         * once in there type: node server.js
         * 
         * 3. If correct the console should come back with "Listening on port 3700" (where 3700 is the localhost assigned server).
         * navigate to the trigger page on the PI by typing http://1.1.1.1:3700/test_controller.html (where 1.1.1.1 is the PC's IP).
         * On the pc, navigate to http://localhost:3700/ in order to see the webappworking with the triggered events.
         * 
         * 4. Profit.
         * 
         * */

//FUTURE: When we transfer the app to the different PCs on the day of the event, we will need each pc's SSH login details (username@ipaddress - password) in order to start their own localhosts.



window.onload = function() {

    //CHROME IS A MUST
    console.log('CHROME IS A MUST');

    //Socket.io setup
    var messages = [];
    var socket = io.connect('/');
    //var socket = io.connect('http://xxxxxxxxxxxxxx');
    var status = document.getElementById("status");

    //Socket connection test
    socket.on('connect', function(){
        console.log('Connection successful');
    });

    //Setup HTML elements needed
    //TODO: need to play the video up to a point then fade it out to reveal overall site: http://codepen.io/adrianparr/pen/qmCek
    
    //NOTE: store the needed video frame times in variables, use those across the script
    
    
    
    //Event Trigger - Events on trigger
    socket.on('pirstatus', function(data) {
        if (data) {
            status.innerHTML = "Success";
            console.log('socket received');
            
            //TODO: set triggered events here
            
            
            
        } else {
            status.innerHTML = "Waiting for trigger";
            console.log('waiting for socket');
            
            //TODO: set a timeout here, then (in this order) fade screensaver back on then fade out live elements
            
        }
    });
}