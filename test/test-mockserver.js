var net = require("net");

function getRandom(n, m) {
  var num = Math.floor(Math.random() * (m - n + 1) + n);
  return num;
}
function getFloatRandom(n, m) {
  return (Math.random() * (n - m) + m).toFixed(1);
}

var HOST = "127.0.0.1";
var PORT = 6969;

var server = net.createServer();
server.listen(PORT, HOST);

server.on("connection", function(sock) {
  console.log("CONNECTED: " + sock.remoteAddress + ":" + sock.remotePort);

  setInterval(() => {
    sock.write(
      JSON.stringify({
        power: getRandom(800, 1150),
        standingWave: getFloatRandom(1, 4.8),
        band: 15,
        status: 1,
        reflect: getRandom(10, 120)
      })
    );
  }, "500");
});
