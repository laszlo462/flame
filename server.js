require('dotenv').config();
const http = require('http');
const { connectDB } = require('./db');
const api = require('./api');
const jobs = require('./utils/jobs');
const Socket = require('./Socket');
const Sockets = require('./Sockets');
const associateModels = require('./models/associateModels');
const initConfig = require('./utils/initConfig');

const PORT = process.env.PORT || 5005;

connectDB()
  .then(() => {
    associateModels();
    initConfig();
  });

// Create server for Express API and WebSockets
const server = http.createServer();
server.on('request', api);

// Register weatherSocket
const weatherSocket = new Socket(server);
Sockets.registerSocket('weather', weatherSocket);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
})