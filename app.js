import dotenv from 'dotenv';

dotenv.config();

import Server from './models/server.js';

const server1 = new Server();

server1.start();