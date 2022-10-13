require('dotenv').config();

const Server = require('./models/server');

const server1 = new Server();

server1.start();