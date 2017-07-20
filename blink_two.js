'use strict';

// Import the interface to Tessel hardware
const tessel = require('tessel');
var pin = tessel.port.A.pin[0];
var pin2 = tessel.port.A.pin[1];
pin2.write(0, (error, buffer) => {
    if (error) {
      throw error;
    }
  });
var a = 1;
  setInterval(function toggle() {
    if(a===1)
    {
      console.log("off");
      pin.write(0, (error, buffer) => {
          if (error) {
            throw error;
          }
        });
        pin2.write(1, (error, buffer) => {
            if (error) {
              throw error;
            }
          });
        a = 0
    }
    else
    {
      console.log("on");
      pin.write(1, (error, buffer) => {
          if (error) {
            throw error;
          }
        });
        pin2.write(0, (error, buffer) => {
            if (error) {
              throw error;
            }
          });
      a = 1;
  }
}, 1000);
