const spawn = require('child_process').spawn;
var fs = require("fs");
var outputFileStream = fs.WriteStream('output.raw');


const arecord = spawn('arecord', ['-f','S16_LE','-r','16000', '-D','plughw:CARD=Device,DEV=0'], {}, () => { console.log("Started"); });

arecord.stdout.pipe(outputFileStream);