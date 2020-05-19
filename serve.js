const port = process.env.PORT || '8081';
const REMOVE_BG_API_KEY = process.env.REMOVE_BG_API_KEY;

const express = require('express');
const http = require('http');
const path = require('path');
const request = require('request');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

let app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost: ${port}`));

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.post('/remove_bg', upload.single('image'), (req, res) => {
  request.post({
    url: 'https://api.remove.bg/v1.0/removebg',
    formData: {
      image_file: req.file.buffer,
      size: 'auto',
    },
    headers: {
      'X-Api-Key': REMOVE_BG_API_KEY
    },
    encoding: null
  }, function(error, response, body) {
    if (error) {
      res.status(500).send('Something broke!');
    } else if (response.statusCode != 200) {
      const message = JSON.parse(body).errors[0].title;
      res.status(response.statusCode).send(message);
    } else {
      res.send(body);
    }
  });
});
