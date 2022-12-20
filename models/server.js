
import express from 'express';

import MongoStore from 'connect-mongo';
import fileupload from 'express-fileupload';
import cors from 'cors';

import { dbConection } from"../database/config.js";


import userRoutes from "../routes/userRoutes.js";
import pdfRoutes from "../routes/pdfRoutes.js";
import calendarioRoutes from "../routes/calendarioRoutes.js";
import emailRoutes from "../routes/emailRoutes.js";
import personalRoutes from "../routes/personalRoutes.js";


import http from 'http';
import { Server } from "socket.io";
class server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      user: "/api/user",
      pdf: "/api/pdf",
      calendario: "/api/calendario",
      email: "/api/email",
      personal: "/api/personal",
    };

    //!ESTO ES PARA LOS SOCKETS
    this.server = http.createServer(this.app); //!para el socket
    this.io = new Server(this.server);

    this.sockets();
    //***************************************** */

    this.conectarDB();
    this.middlewares();
    this.routes();
  }
  async conectarDB() {
    await dbConection();
  }
  //!SOCKETS
  sockets() {
    this.io.on("connection", (socket) => {
      console.log("Socket conectado");

      socket.on("disconnect", () => {
        console.log("Socket desconectado");
      });
      /*  socket.on('enviar-mensaje',(payload,callback) => {//!el callback es para imprimir el console.log
        const id = 123;
        callback( id );
        this.io.emit('enviar-mensaje',payload);//*esto es para enviar datos desde el server
      }); */
    });
  }
  //!IMPORTANTE para poder optener el json de el postman

  middlewares() {
    //directorio publico que se accedera con la ruta /
    this.app.use(express.static("public"));
    this.app.use(cors());
    this.app.use(fileupload());
    //Lecura y parseo del body en postman
    this.app.use(express.json()); // intentara serealizar la informacion a un json
  }

  routes() {

    this.app.use(this.paths.user,       userRoutes);
    this.app.use(this.paths.pdf,        pdfRoutes);
    this.app.use(this.paths.calendario, calendarioRoutes);
    this.app.use(this.paths.email,      emailRoutes);
    this.app.use(this.paths.personal,   personalRoutes);
  }
  start() {
    this.server.listen(this.port, () => {
      //!modificado por el cserver socket
      console.log("servidor en puerto ", this.port);
    }); //port 8080
  }
}

export default  server;
