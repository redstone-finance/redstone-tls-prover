const https = require('https');

main();


async function main() {
  const myAgent = new https.Agent({
    keepAlive: true,
    keepAliveMsecs: 1000,
    maxSockets: Infinity,
    maxTotalSockets: Infinity,
    maxFreeSockets: 256,
    scheduling: 'lifo',
    timeout: 20000, // milliseconds
  });

  const options = {
    hostname: 'example.com',
    port: 443,
    path: '/',
    method: 'GET',
    agent: myAgent,
    // agent: https.globalAgent,
  }
  
  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    const sockets = myAgent.sockets['example.com:443:::::::::::::::::::::'];

    listenOnSocketData(sockets[0]);

    console.log({myAgentSockets: myAgent.sockets[0]});

    // console.log();
  
    // res.on('data', d => {
    //   console.log(`\n\n\n\n\n=== Data ===`);
    //   console.log({d});
    //   process.stdout.write(d);

    //   console.log(`\n\n\n\n\n=== Res ===`);
    //   console.log(res);
    // })

    // res.on('se')
  })

  console.log({myAgentSockets: myAgent.sockets.length});

  // req.on('information', info => {
  //   console.log(`\n\n\n\n\n=== Info ===`);
  //   console.log({info});
  //   process.stdout.write(info);
  // })

  // req.on('socket', socket => {
  //   // console.log(`\n\n\n\n\n=== Socket ===`);
  //   // console.log({socket});

  //   req.socket.on('data', (socketData1) => {
  //     console.log({socketData1});
  //   });

  //   socket.on('data', (socketData) => {
  //     console.log(`\n\n\n\n\n=== Socket data ===`);
  //     console.log({socketData});
  //     process.stdout.write(socketData);
  //   });

  //   // socket.on('ready', socketReady => {
  //   //   console.log(`\n\n\n\n\n=== Socket ready ===`);
  //   //   console.log({socketReady});
  //   //   // process.stdout.write(socketReady);
  //   // });

  //   // socket.on('connect', socketConnect => {
  //   //   console.log(`\n\n\n\n\n=== Socket connect ===`);
  //   //   console.log({socketConnect});
  //   //   // process.stdout.write(socketReady);
  //   // });

  //   // socket.on('lookup', socketLookup => {
  //   //   console.log(`\n\n\n\n\n=== Socket lookup ===`);
  //   //   console.log({socketLookup});
  //   //   // process.stdout.write(socketReady);
  //   // });

  //   socket.on('end', socketEnd => {
  //     console.log(`\n\n\n\n\n=== Socket end ===`);
  //     console.log({socketEnd});
  //     // process.stdout.write(socketReady);
  //   });
  // })
  
  req.on('error', error => {
    console.error(error)
  })
  
  req.end()
  
}

function listenOnSocketData(socket) {
  socket.on('data', socketData => {
    console.log(`\n\n\n\n\n=== Socket data ===`);
    console.log(socketData);
    process.stdout.write(socketData);
    console.log(`\n\n\n\n\n=== Socket data (end) ===`);
  });
}