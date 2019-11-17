const http = require('http');
const app = require('./backend/app.js');

const normalizePort = val => {
    var port = parseInt(val, 10);
  
        if (isNaN(port)) {
          // named pipe
            return val;
      }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  };

const port = normalizePort(process.env.PORT || "3000");

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server running at http://${port}/`);
});