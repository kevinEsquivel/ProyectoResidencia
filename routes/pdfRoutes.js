import { Router } from "express";
import { check } from "express-validator";

import {
  pdfPost,
  postSubir,
  deletePdf,
  putPdf,
  getPdfs,
  getPdfSeccion,
} from "../controllers/pdfController.js";
import { existeIdPdf } from "../helpers/pdf-validations.js";
import { validarCampos } from "../middlewares/validar-campos.js";

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

export default router;
