var TJBot = require('tjbot');

//Watson API credentials
var credentials = {
    speech_to_text : {
        username : 'skhfjkshdsdhfg',
        password : 'sdfsdfsfd'
    }
}

//Specifying the hardware used
var hardware = ["microphone"];

var configuration = {
    robot : {
        gender : "female",
        name : "watson"
    },
    log : {
        level : "debug"
    },
    listen : {
    	microphoneDeviceId : 'plughw:CARD=Device,DEV=0'
    }
}

//Initializing the TJBot instance
var tj = new TJBot(hardware,configuration,credentials);

tj.listen(function(data){
	if(data.results.length === 0){
	   console.log('Error : Audio data is being streamed too fast..!!');
	} else {
	   //console.log('Log from Main program : ' + JSON.stringify(data.results[0].alternatives[0].transcript));
	   //var i = 0;
	  // while(i < 100){
		//console.log("While Loop"); 
		//i++;
	   // }
	}
	
});
