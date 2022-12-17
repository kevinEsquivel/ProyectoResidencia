import { Router }  from "express";
import { check }  from "express-validator";

import {
  userGet,
  userGetEmailPass,
  userPost,
  userPut,
  userDelete,
  userGetUser,
  getUser,
}  from "../controllers/userController.js";
import {
  esRolValido,
  emailValidation,
  existeId,
}  from "../helpers/db-validations.js";
import { validarCampos }  from "../middlewares/validar-campos.js";

//const { check } = require("express-validator");

const router = Router();
router.get("/", userGet);
//!Esto se trendria que guardar desde los Login
router.get("/id/:_id",
  [
    check("_id", "No es un id valido de Mongo").isMongoId(), validarCampos
  ],
  getUser
);
router.get("/:correo", userGetUser);

//router.post("/users",);
router.post(
  "/:correo",
  [
    check("correo", "El correo no esta con la sintaxis correcta").isEmail(), //esta crando los errores que los midelwers pueden hacerse
    validarCampos,
  ],
  userGetEmailPass
);
router.post(
  "/",
  [
    check("nombre", "El Nombre es obligatorio").not().isEmpty(), //no tiene que estar vacio
    check("password", "El password edebe ser de mas de 6 letras").isLength({
      min: 6,
    }), //no tiene que estar vacio
    check("correo", "El correo no est con la sintaxis correcta").isEmail(), //esta crando los errores que los midelwers pueden hacerse
    check("rol").custom((rol) => esRolValido(rol)), //esto se pued eimplificar
    check("correo").custom((correo) => emailValidation(correo)), //estoy haciendo una validacion custor
    validarCampos,
  ],
  userPost
);

router.put(
  "/:id",
  [
    check("id", "No es un id valido de Mongo").isMongoId(),
    check("id").custom(existeId),
    check("rol").custom(esRolValido), // es lo mismo que (rol) =>esRolValido(rol)
    validarCampos,
  ],
  userPut
);
router.delete(
  "/:id",
  [
    check("id", "No es un id valido de Mongo").isMongoId(),
    check("id").custom(existeId),
    validarCampos,
  ],
  userDelete
);
export default router;
