// server.js
const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const keypressHandler = require('./keypressHandler');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

console.log('tong')

module.exports.router = (req, res, next = () => { }) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  // req.method: GET / POST / OPTIONS ...
  // req.url: / / /
  // keypressHandler.getRandomMessage();

  // if req.method is GET;
  // res.writeHead(200, headers)
  // res.write(??)
  // keypressHandler.getRandomMessage();
  // res.end();

  // switch (res.method)
  // case: 'GET';
  // case: 'OPTION'
  res.writeHead(200, headers); // send to client
  switch (req.method) {
    case 'GET':
      res.write(keypressHandler.getRandomMessage()) // 'UP/DOWN/.. '
      break;

  }
  res.end(); // end fetch
  next();

  // res.writeHead(200, headers); // Sends status and response headers to the client
  // res.end(); // Signals that the the server should consider that the response is complete
  // next(); invoke next() at the end of a request to help with testing!
};
