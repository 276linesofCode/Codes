//can you see this?
//need to see how to write the pull ka code from other examples
//should the callback funtion be also included in the code? Yes -- see write ka example -- but they havent wriiten write method as such, I think we should remove pull() which I just added

var tessel= require('tessel');

var pin = tessel.port.A.pin[2];

var pullType = "pullup";

var led = tessel.led[3];

pin.pull(pullType,(error, buffer) => {

  if (error){
    throw error;
  }

});

pin.read(function(error, number){

  if (error) {
    throw error;
  }

    console.log(number);
    if (number == 1){
      led.off();
    }
    else{
      led.on();
    }

});
