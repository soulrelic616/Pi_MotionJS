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
    var socket = io.connect('/');    var status = document.getElementById("status");

    //Socket connection test
    socket.on('connect', function(){
        console.log('Connection successful');
    });

    //Setup HTML elements needed
    //TODO: need to play the video up to a point then fade it out to reveal overall site: http://codepen.io/adrianparr/pen/qmCek
    
    //NOTE: store the needed video frame times in variables, use those across the script
    //NOTE: video ID's set in variables too
    var video = $('video');
    var video_screenSaver = $('#screensaver');

    //Variable to establish which profile to load
    var profiletoLoad; 
    
    video.each(function(){
        var vidID = $(this).attr('id');
        
        $(this).on('loadedmetadata', function(){
            console.log(vidID + ' total playtime ' + this.duration);
        });
    });
    
    //Just for testing, log time counter of screensaver loop
    video_screenSaver.on('timeupdate', function(event){
        onTrackedVideoFrame(this.currentTime);
        //Define function to be excecuted depending on frame
        if (this.currentTime >= 1.000 && this.currentTime <= 5.000) {
            console.log('go to profile 1');
            profiletoLoad = loadProfile_1
        } else if(this.currentTime >= 5.000 && this.currentTime <= 10.000){
            console.log('go to profile 2');
            profiletoLoad = loadProfile_2
        } else if(this.currentTime >= 10.000 && this.currentTime <= 15.000){
            console.log('go to profile 3');
        } else if(this.currentTime >= 15.000 && this.currentTime <= 20.000){
            console.log('go to profile 4');
        }
    });
    
    //TEST Log screensaver current time to screen
    function onTrackedVideoFrame(currentTime){
        $(".current").text(currentTime);
        //console.log(currentTime);
    };
    
    //TEST play video backwards
    //NOTE: need to find a reverse video alternative, HTML5 pbrate not supported
    var videod = document.getElementById('screensaver');
    var intervalRewind;
    $(videod).on('play',function(){
        videod.playbackRate = 1.0;
        clearInterval(intervalRewind);
    });
    $(videod).on('pause',function(){
        videod.playbackRate = 1.0;
        clearInterval(intervalRewind);
    });
    $("#speed").click(function() { // button function for 3x fast speed forward
        videod.playbackRate = 3.0;
    });
    $("#negative").click(function() { // button function for rewind
        rewind(1.0);
    });
    
    function rewind(rewindSpeed) {    
        clearInterval(intervalRewind);
        var startSystemTime = new Date().getTime();
        var startVideoTime = videod.currentTime;

        intervalRewind = setInterval(function(){
            videod.playbackRate = 1.0;
            if(videod.currentTime == 0){
                clearInterval(intervalRewind);
                videod.pause();
            }
            else{
                videod.currentTime += -.1;
            }
        },100);
    };
    //END text finction here

    
    //MAIN load Profile functions
    function loadProfile_1() {
        alert('load profile 1');
    }
    
    function loadProfile_2() {
        alert('load profile 2');
    }
    
    
    
    //Event Trigger - Events on trigger
    socket.on('pirstatus', function(data) {
        if (data) {
            status.innerHTML = "Success";
            console.log('socket received');
        
            //TODO: set triggered events here
            profiletoLoad();
            
            
        } else {
            status.innerHTML = "Waiting for trigger";
            console.log('waiting for socket');
            
            //TODO: set a timeout here, then (in this order) fade screensaver back on then fade out live elements
            
        }
    });
}