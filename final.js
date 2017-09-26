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

  The organisation of the registers can be seen in the datasheet inside section 6.1 (Data Registers), page number - 21

*/
  i2c.transfer(new Buffer([0x01]), 6, function (error, dataReceived) {

      // This is an exception. If an error is generated, it will throw the error
      if (error) throw error;

      //This array is going to store the final x,y,z values
      var out=[];

      /*

      The for loop is iterated 3 times, in order to extract the x,y,z values.
      The gCount variable is a bitwise OR operation between two binary numbers:
        1. The OUT_MSB of the respective coordinate, that is left shifted by 8 bits in order to make space for the remaining 8 bits
        of the OUT_LSB.
        2. The OUT_LSB of the respective coordinate.

      The OUT_LSB of the respective coordinate right shifted by 4 to get rid of the redundant lower 0 bits which are 4 in number.

      Finally, check whether the number is negtative. If it is negative

      */

      for (var i=0;i<3;i++){
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
