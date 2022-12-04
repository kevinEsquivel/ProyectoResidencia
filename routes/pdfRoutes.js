const { Router } = require("express");
const { check } = require("express-validator");

const { pdfPost, postSubir, deletePdf, putPdf, getPdfs } = require("../controllers/pdfController");
const { existeIdPdf } = require("../helpers/pdf-validations");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//ESTO ES LO IMPORTANTE

router.get("/", getPdfs);
router.post("/uploadF/:seccion/:nombre",pdfPost);
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
