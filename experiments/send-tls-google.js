const tls = require("tls");

const HOST = "example.com";

(async function() {
    let socket = tls.connect(443, HOST, {
      servername: HOST,
      rejectUnauthorized: true,
      enableTrace: true,
    });
    socket.on("data", function(response) {
      console.log(`\n\n\n\n\n\n\n\n\n===== Data received =====\n\n`);
      console.log(response);
    });
    socket.setEncoding("utf8");
    socket.write(`GET / HTTP/1.1\nHost: ${HOST}\n\n`);
})();
