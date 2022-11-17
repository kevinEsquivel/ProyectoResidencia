const { Router } = require("express");
const { check } = require("express-validator");

const { pdfPost, postSubir, deletePdf, putPdf } = require("../controllers/pdfController");
const { existeIdPdf } = require("../helpers/pdf-validations");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//ESTO ES LO IMPORTANTE

router.get("/", (req, res) => {
  res.send("Hello World");
});
router.post("/upload", validarCampos,pdfPost);
router.post("/upload/:id_user",
[
  check("id_user", "No es un id valido de Mongo").isMongoId(),
  validarCampos
], postSubir);
router.put("/upload/:id",
[
  check("id", "No es un id de mongo").isMongoId(),
  check("id").custom(existeIdPdf),
  validarCampos
],putPdf);
router.delete("/upload/:id",
[
  check("id", "No es un id de mongo").isMongoId(),
  check("id").custom(existeIdPdf),
  validarCampos
],deletePdf);
module.exports = router;
