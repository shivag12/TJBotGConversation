/*var Gpio = require('onoff').Gpio,
button = new Gpio(17, 'in', 'both');

button.watch(function(err, value) {

    if(value === 1) {
    	console.log('button released');
    } 

console.log("Mic recording started");   

});*/

var buttons = require('rpi-gpio-buttons')([11]);

buttons.on('pressed', function (pin) {
  console.log('User pressed button on pin ', pin);
});