'use strict';

// Import the interface to Tessel hardware
const tessel = require('tessel');
var pin = tessel.port.A.pin[0];
var pin2 = tessel.port.A.pin[1];
var pin3 = tessel.port.A.pin[2];
var pin4 = tessel.port.A.pin[3];
pin2.write(0, (error, buffer) => {
    if (error) {
      throw error;
    }
  });
pin3.write(0, (error, buffer) => {
    if (error) {
      throw error;
    }
  });
pin4.write(0, (error, buffer) => {
    if (error) {
      throw error;
    }
  });
var a = 1;
  setInterval(function toggle() {
    if(a===1)
    {
      console.log("off");
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
      pin3.write(0, (error, buffer) => {
              if (error) {
                throw error;
              }
            });
      pin4.write(0, (error, buffer) => {
                if (error) {
                  throw error;
                }
              });
        a = 2
    }
    else if(a===2)
    {
      console.log("on");
      pin.write(1, (error, buffer) => {
          if (error) {
            throw error;
          }
        });
      pin2.write(1, (error, buffer) => {
            if (error) {
              throw error;
            }
          });
      pin3.write(0, (error, buffer) => {
              if (error) {
                throw error;
              }
            });
      pin4.write(0, (error, buffer) => {
                if (error) {
                  throw error;
                }
              });
      a = 3;
  }
  else if(a===3)
  {
    pin.write(1, (error, buffer) => {
        if (error) {
          throw error;
        }
      });
    pin2.write(1, (error, buffer) => {
          if (error) {
            throw error;
          }
        });
    pin3.write(1, (error, buffer) => {
            if (error) {
              throw error;
            }
          });
    pin4.write(0, (error, buffer) => {
              if (error) {
                throw error;
              }
            });
    a=4
  }
  else if(a===4)
  {
    pin.write(1, (error, buffer) => {
        if (error) {
          throw error;
        }
      });
    pin2.write(1, (error, buffer) => {
          if (error) {
            throw error;
          }
        });
    pin3.write(1, (error, buffer) => {
            if (error) {
              throw error;
            }
          });
    pin4.write(1, (error, buffer) => {
              if (error) {
                throw error;
              }
            });
    a = 5;
  }
  else if(a===5)
  {
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
    pin3.write(1, (error, buffer) => {
            if (error) {
              throw error;
            }
          });
    pin4.write(1, (error, buffer) => {
              if (error) {
                throw error;
              }
            });
    a = 6;
  }
  else if(a===6)
  {
    pin.write(0, (error, buffer) => {
        if (error) {
          throw error;
        }
      });
    pin2.write(0, (error, buffer) => {
          if (error) {
            throw error;
          }
        });
    pin3.write(1, (error, buffer) => {
            if (error) {
              throw error;
            }
          });
    pin4.write(1, (error, buffer) => {
              if (error) {
                throw error;
              }
            });
    a = 7;
  }
  else if(a===7)
  {
    pin.write(0, (error, buffer) => {
        if (error) {
          throw error;
        }
      });
    pin2.write(0, (error, buffer) => {
          if (error) {
            throw error;
          }
        });
    pin3.write(0, (error, buffer) => {
            if (error) {
              throw error;
            }
          });
    pin4.write(1, (error, buffer) => {
              if (error) {
                throw error;
              }
            });
    a = 8;
  }
  else if(a===8)
  {
    pin.write(0, (error, buffer) => {
        if (error) {
          throw error;
        }
      });
    pin2.write(0, (error, buffer) => {
          if (error) {
            throw error;
          }
        });
    pin3.write(0, (error, buffer) => {
            if (error) {
              throw error;
            }
          });
    pin4.write(0, (error, buffer) => {
              if (error) {
                throw error;
              }
            });
    a = 1;
  }
}, 500);
