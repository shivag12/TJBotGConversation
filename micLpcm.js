var record = require('node-record-lpcm16');
var fs = require('fs');
const speech = require('@google-cloud/speech');

const projectId = 'tjbotspeechtotext-16730';

const client = new speech.SpeechClient({
  projectId: projectId, 
  keyFilename: "./TJBotSpeechToText 16730-0e1a5780594f.json"
});
  
//var file = fs.createWriteStream('test.wav', { encoding: 'binary' })
 
/*setInterval(()=>{
 record.stop();

},5000);*/


 /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
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
    .streamingRecognize(request)
    .on('error', console.error)
    .on('data', data =>
      process.stdout.write(
        data.results[0] && data.results[0].alternatives[0]
          ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
          : `\n\nReached transcription time limit, press Ctrl+C\n`
      )
);


record.start({
  sampleRate : 16000,
  verbose : true,
  recordProgram : 'arecord',
  device : 'plughw:CARD=Device,DEV=0'
})
.pipe(recognizeStream)