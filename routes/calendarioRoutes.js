const { Router } = require("express");
const { check } = require("express-validator");
const { calendarioPost, calendarioGet } = require("../controllers/calendarioController");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});
router.get("/:id_user",[
    check("id_user", "El id_user No es de MongoDB").isMongoId(),
    validarCampos
],calendarioGet);
router.post("/:id_user",[
    check("id_user", "El id_user No es de MongoDB").isMongoId(),
    validarCampos

],calendarioPost);

module.exports = router;