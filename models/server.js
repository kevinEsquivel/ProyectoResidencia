const express = require("express");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const fileupload = require("express-fileupload")
const cors = require("cors");

const { dbConection } = require("../database/config");

class server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      user: "/api/user",
      pdf: "/api/pdf",
    };

    //!ESTO ES PARA LOS SOCKETS
    this.server = require("http").createServer(this.app); //!para el socket
    this.io = require("socket.io")(this.server);

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
    this.app.use(
      session({
        secret: process.env.SESSION_SECRET || "some-secret",
        resave: false, // investigar mas -> https://www.npmjs.com/package/express-session
        saveUninitialized: false,
        store: MongoStore.create({
          mongoUrl: process.env.MONGODB,
        }),
      })
    );
    //!Para las sessiones

    //Lecura y parseo del body en postman
    this.app.use(express.json()); // intentara serealizar la informacion a un json
  }

  routes() {
    this.app.use(this.paths.user, require("../routes/userRoutes"));
    this.app.use(this.paths.pdf, require("../routes/pdfRoutes"));
  }
  start() {
    this.server.listen(this.port, () => {
      //!modificado por el cserver socket
      console.log("servidor en puerto ", this.port);
    }); //port 8080
  }
}

module.exports = server;
