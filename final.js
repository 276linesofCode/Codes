var BitArray = require('node-bitarray');
var tessel = require('tessel');

// Connect to device
var port = tessel.port.A; // Use the SCL/SDA pins of Port A
var slaveAddress = 0x1D; // Specific to device
var i2c = new port.I2C(slaveAddress); // Initialize I2C communication

// Details of I2C transfer
var numBytesToRead = 1; // Read back this number of bytes

// Read data over I2C using i2c.transfer
i2c.read(numBytesToRead, function (error, dataReceived) {
  // Print data received (buffer of hex values)
  console.log('Buffer returned by I2C slave device ('+slaveAddress.toString(16)+'):', dataReceived);
});

i2c.transfer(new Buffer([0x0D]), numBytesToRead, function (error, dataReceived) {
    // Print data received (buffer of hex values)
  console.log('Buffer returned by I2C slave device ('+slaveAddress.toString(16)+'):', dataReceived);

});
// dataReceived contains all of the the bits for x, y, z - OUT_X_MSB as well as OUT_X_LSB - 6 bytes which is 48 bits

/*
  In the i2c.transfer function the dataReceived consists of all the 6 bytes of data 2 bytes each for the x, y and z values.
  Each of the x, y and z coordinates have two registers associated with them for storing the 12 bit long sample.
  The first 8 bits are stored in their respective OUT_MSB registers. These are the Most Significant first 8 bits.
  The next 4 bits are stored in their respective OUT_LSB registers. The remaining 4 bits are occupied
  by 0s. These lower 4 bits are redundant bits which are not required.
*/
  i2c.transfer(new Buffer([0x01]), 2, function (error, dataReceived) {
      // Print data received (buffer of hex values)
      if (error) throw error;

      var out=[];
      for (var i=0;i<1;i++)µ{
        // dataReceived[0] - OUT_X_MSB decimal values
        // dataReceived[1] - OUT_X_LSB decimal values
        console.log(dataReceived[0]);
        console.log(dataReceived[0]<<8);
        console.log(dataReceived[1]);
        var gCount=(dataReceived[i*2] << 8) | dataReceived[(i*2)+1];
        console.log(gCount);
        gCount=gCount >> 4;

        // 127 is checking whether we have a 0 or a 1 at the first position - basically its sign.
        if (dataReceived[i*2] > 0x7F) {
            gCount = -(1 + 0xFFF - gCount); // Transform into negative 2's complement
          }
          console.log(gCount);
          // / - normal division
          // we are scaling it down to 0 - 1 (normalising the values)
          out[i] = gCount / ((1<<12)/(2*2));
      }

      console.log('The x, y, z values are :',out);

  });
