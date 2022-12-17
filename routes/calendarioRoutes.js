import { Router } from"express";
import { check } from"express-validator";
import { calendarioPost, calendarioGet, calendarioPut } from"../controllers/calendarioController.js";
import { userExists } from"../helpers/user-validations.js";
import { validarCampos } from"../middlewares/validar-campos.js";

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

export default router;