// reference: https://www.npmjs.com/package/osc-js

const dgram = require('dgram')
const OSC = require('osc-js')

class OSCServer {
  socket = dgram.createSocket('udp4');

  constructor(port, address='localhost') {
    this.port = port;
    this.address = address;
  }

  // send a messsage via udp
  sendMsg(msgStr, value) {
    const message = new OSC.Message('/' + msgStr, value);
    console.log('message: ', message);
    const binary = message.pack();
    this.socket.send(new Buffer.from(binary), 0, binary.byteLength, this.port, this.address);
  }

  setListener() {
    this.socket.on('message', data => {
      const msg = new OSC.Message()
      msg.unpack(data)
      console.log(msg.args)
    });
  }

}

module.exports = OSCServer;