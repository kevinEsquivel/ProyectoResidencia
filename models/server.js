const express = require("express");
const cors = require("cors");
const { dbConection } = require("../database/config");

class server {
    constructor(){
        this.app=express();
        this.port=process.env.PORT;
        this.paths={
            user:'/api/user'
        };
        this.conectarDB();
        this.middlewares();
        this.routes();
    }
    async conectarDB(){
        await dbConection();
    }
    //!IMPORTANTE para poder optener el json de el postman
    
    middlewares() {
        //directorio publico que se accedera con la ruta /
        this.app.use(express.static('public'))
        this.app.use(cors())
        //Lecura y parseo del body en postman
        this.app.use(express.json());// intentara serealizar la informacion a un json
      }

    routes(){
        this.app.use(this.paths.user,require('../routes/userRoutes'));
    }
    start() {
        this.app.listen(this.port, () => {
          console.log("servidor en puerto ", this.port);
        }); //port 8080
      }
}


module.exports = server;