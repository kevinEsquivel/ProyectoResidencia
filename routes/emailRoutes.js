const { Router } = require("express");
const { enviarEmail } = require("../controllers/emailController");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", (req, res) => {
  res.send("Email funciona");
});
router.post("/:correo", enviarEmail)
module.exports = router;