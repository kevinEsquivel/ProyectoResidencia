const { Router } = require("express");
const { check } = require("express-validator");

const {
  userGet,
  userGetEmailPass,
  userPost,
  userPut,
  userDelete,
  userGetUser,
  
} = require("../controllers/userController");
const {
  esRolValido,
  emailValidation,
  existeId,
} = require("../helpers/db-validations");
const { validarCampos } = require("../middlewares/validar-campos");

//const { check } = require("express-validator");

const router = Router();
router.get("/", userGet);
//!Esto se trendria que guardar desde los Login

router.get("/:correo", userGetUser);
//router.post("/users",);
router.post("/:correo",
  [
    check("correo", "El correo no esta con la sintaxis correcta").isEmail(), //esta crando los errores que los midelwers pueden hacerse
    validarCampos,
  ],
  userGetEmailPass);
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
module.exports = router;
