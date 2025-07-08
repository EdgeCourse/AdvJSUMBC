const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

//http://127.0.0.1:3000?name=YourName to run
const server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;
  let message = 'Hello!';

  if (queryObject.name) {
    message = `Hello, ${queryObject.name}!`;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(message);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});