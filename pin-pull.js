var tessel= require('tessel');

var pin = tessel.port.A.pin[2];

var pullType = "pullup";

var led = tessel.led[3];

pin.pull(pullType,(error, buffer) => {

  if (error){
    throw error;
  }
});



setInterval(function toggle() {
  pin.read(function(error, number){

    if (error) {
      throw error;
    }

      console.log(number);
      if (number == 1){
        led.on();
      }
      else{
        led.off();
      }

  });

}, 2000);
