const { Router } = require("express");
const { check } = require("express-validator");
const { calendarioPost, calendarioGet, calendarioPut } = require("../controllers/calendarioController");
const { userExists } = require("../helpers/user-validations");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});
//!Obtener  Calendario por IDUser
router.get("/:id_user",[
    check("id_user", "El id_user No es de MongoDB").isMongoId(),
    validarCampos
],calendarioGet);
//!Guardar un Calendario id_user
router.post("/:id_user",[
    check("id_user", "El id_user No es de MongoDB").isMongoId(),
    check("id_user").custom(id_user =>userExists(id_user)),
    validarCampos
],calendarioPost);

router.put('/:_id',[
  check("_id", "El id_user No es de MongoDB").isMongoId(),

  validarCampos
],calendarioPut)

module.exports = router;