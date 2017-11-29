var mic = require('mic');
var Gpio = require('onoff').Gpio,
button = new Gpio(17, 'in', 'both');
var fs = require('fs');
const speech = require('@google-cloud/speech');

const projectId = 'tjbotspeechtotext-16730';

const client = new speech.SpeechClient({
  projectId: projectId, 
  keyFilename: "./TJBotSpeechToText 16730-0e1a5780594f.json"
})

  const encoding = 'LINEAR16';
  const sampleRateHertz = 16000;
  const languageCode = 'en-US';

  const request = {
    config: {
      encoding: encoding,
      sampleRateHertz: sampleRateHertz,
      languageCode: languageCode,
    },
    interimResults: false, // If you want interim results, set this to true
    single_utterance: true
  };

  // Create a recognize stream
  const recognizeStream = client
    .streamingRecognize(request);
    /*.on('error', console.error)
    .on('data', data =>
      process.stdout.write(
        data.results[0] && data.results[0].alternatives[0]
          ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
          : `\n\nReached transcription time limit, press Ctrl+C\n`
      )
);*/


  var micInstance = mic({
  rate: '16000', // 44100
  channels: '1', // 2 
  debug: false,
  exitOnSilence: 6,
  device : 'plughw:CARD=Device,DEV=0'
});

  // (re-)create the mic audio stream and pipe it to STT
var _micInputStream = micInstance.getAudioStream();

var outputFileStream = fs.WriteStream('outputtjbot.wav');

var _micTextStream = _micInputStream.pipe(recognizeStream);
//_micTextStream.setEncoding('utf8');

_micInputStream.on('startComplete', function() {
    console.log("microphone started");
});

_micInputStream.on('pauseComplete', function() {
  console.log("microphone paused");
});

  // log errors in the mic input stream
_micInputStream.on('error', function(err) {
  console.log("the microphone input stream experienced an error", err);
});

_micInputStream.on('processExitComplete', function() {
  console.log("microphone exit");
});

// ignore silence
_micInputStream.on('silence', function() {
  console.log("microphone silence");
});

_micTextStream.on('data', function(transcript) {
        console.log("TJBot heard: " + JSON.stringify(transcript));
	var i = 0;
        while(i < 100000000000){
	    i++;
	}
	console.log('data ended');
    });

micInstance.start();

