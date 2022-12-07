const { Router } = require("express");
const { check } = require("express-validator");

const {
  pdfPost,
  postSubir,
  deletePdf,
  putPdf,
  getPdfs,
  getPdfSeccion,
} = require("../controllers/pdfController");
const { existeIdPdf } = require("../helpers/pdf-validations");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//ESTO ES LO IMPORTANTE
//*Obtener todos los PDFS
router.get("/", getPdfs);
//*Obtener todos los pfs que correspondan con los datos
router.get("/seccion/:seccion", getPdfSeccion);
//*Subir el PDF al servidor
router.post("/uploadF/:seccion/:nombre", pdfPost);
//*Subir el PDF a la Base de Datos
router.post(
  "/upload/:id_user",
  [check("id_user", "No es un id valido de Mongo").isMongoId(), validarCampos],
  postSubir
);
//!NO se usa, es para actualizar el archivo
router.put(
  "/upload/:id",
  [
    check("id", "No es un id de mongo").isMongoId(),
    check("id").custom(existeIdPdf),
    validarCampos,
  ],
  putPdf
);
//*Borrar archivo del servidor y BD
router.delete(
  "/upload/:id",
  [
    check("id", "No es un id de mongo").isMongoId(),
    check("id").custom(existeIdPdf),
    validarCampos,
  ],
  deletePdf
);

module.exports = router;
