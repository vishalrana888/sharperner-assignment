const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Vishal Rana</title></head>');
    res.write('<body><h1>Hello Vishal Rana!</h1></body>');
    res.write('</html>');
    return res.end();
  } else if (url === '/home') {
    res.setHeader('Content-Type', 'text/plain');
    res.write('Welcome home');
    return res.end();
  } else if (url === '/about') {
    res.setHeader('Content-Type', 'text/plain');
    res.write('Welcome to About Us page');
    return res.end();
  } else if (url === '/node') {
    res.setHeader('Content-Type', 'text/plain');
    res.write('Welcome to my Node.js project');
    return res.end();
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.write('Page not found');
    return res.end();
  }
});

server.listen(4000);

