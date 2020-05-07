const port = process.env.PORT || '8080';

const express = require('express');
const http = require('http');
const path = require('path');

let app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost: ${port}`));

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
