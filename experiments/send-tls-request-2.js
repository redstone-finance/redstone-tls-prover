// More info: https://github.com/nodejs/help/issues/253
// USAGE: node experiments/send-tls-request-2.js  2> https-trace.out

const tls = require("tls");

const PORT = 443;
const HOST = 'arweave.org';

main();

async function main() {

  const socket = tls.connect({
    enableTrace: true,
    host: HOST,
    port: PORT,
    // path: '/',
    servername: HOST,
    rejectUnauthorized: true,

  }, () => {
    // client.enableTrace();

    // process.stdin.pipe(socket);
    // process.stdin.resume();

    socket.end(() => {
      console.log("Client closed successfully");

      sendRequest(socket);
    });

  });

  socket.setEncoding('utf8');

  // socket.on('OCSPResponse', console.log);
  socket.on('keylog', (keylog) => {
    process.stdout.write(keylog);
    console.log('');
  });

  
  // socket.on('session', session => console.log));
  socket.on('secureConnect', secureConnect => console.log({secureConnect}));

  socket.on('data', data => {
    console.log('\n\nReceived socket data');
    console.log(data);
  });

  // socket.on('end', () => {
  //   server.close();
  // });
}

function sendRequest(tlsSocket) {

}
