require('http').createServer(function(req, res) {
  res.end('Hello World!\n');
  console.log('Someone visited our web server!');
}).listen(3001, process.argv[2]);
console.log('Sending greetings on ', process.argv[2] + ':3001');

