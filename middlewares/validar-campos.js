const {validationResult} = require("express-validator")

const validarCampos=(req,res,next) =>{// un midelware siempre tiene el nest
    const errores = validationResult(req);  //extraigo los errores que mande en las rutas, y veo si esta vacio
    if(!errores.isEmpty()){
      return res.status(400).json(errores)
    }
    next();
}


module.exports ={
    validarCampos,
}