// server.js
const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const keypressHandler = require('./keypressHandler');
const messageQueues = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
console.log(module.exports.backgroundImageFile)
////////////////////////////////////////////////////////


// let messageQueue = null;
// module.exports.initialize = (queue) => {
//   messageQueue = queue;
// };

console.log('tong')

module.exports.router = (req, res, next = () => { }) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers); // send to client
    res.end(); // end fetch
    next();
  }
  if (req.method === 'GET') {
    // res.write(keypressHandler.getRandomMessage()) // 'UP/DOWN/.. '
    if (req.url === '/') {
      res.writeHead(200, headers); // send to client
      res.write('' + messageQueues.dequeue())
      res.end(); // end fetch
      next();
    }
    if (req.url === '/background.jpg') {
      console.log('before fs.read')
      fs.readFile(module.exports.backgroundImageFile, (err, data) => {
        console.log('inside fs.read')
        if (err) {
          res.writeHead(404, headers);
          res.end(); // end fetch
          console.log(module.exports.backgroundImageFile)
          console.log('err: 45 ', err);
          next();
        }
        else {
          res.writeHead(200, headers);
          res.write(data, 'binary');
          res.end(); // end fetch
          console.log(module.exports.backgroundImageFile)
          next();

        }
      })
    }
  }


}


  // res.writeHead(200, headers); // Sends status and response headers to the client
  // res.end(); // Signals that the the server should consider that the response is complete
  // next(); invoke next() at the end of a request to help with testing!
// };


// notes:
// whereas .write() will just write the response, but you have to send it using response.end()


      // try {
      //   var fileContent = fs.readFileSync('./background.jpg')
      //   console.log(fileContent)
      // } catch (error) {
      //   throw error;
      //   res.writeHead(404, headers);
      //   console.log(fileContent, 'error')
      //   res.end();
      // }
