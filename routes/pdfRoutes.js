const { Router } = require("express");
const { check } = require("express-validator");

const { pdfPost } = require("../controllers/pdfController");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//ESTO ES LO IMPORTANTE

router.get("/", (req, res) => {
  res.send("Hello World");
});
router.post("/upload", validarCampos,pdfPost);

module.exports = router;
