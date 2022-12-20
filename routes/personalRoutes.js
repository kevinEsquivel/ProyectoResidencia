import { Router } from "express";
import { check } from "express-validator";
import { getPersona, getPersonal, postPersona, putPersona } from "../controllers/personalCotroller.js";
import { existeIdPdf } from "../helpers/pdf-validations.js";


import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

//ESTO ES LO IMPORTANTE
//*Obtener todos las personas
router.get("/", getPersonal);
//*Obtener una persona
router.get("/:id", getPersona);
//*Agregar una persona
router.post("/:id",postPersona);

//*Actualizar una persona
router.put("/:id",
  [
    check("id", "No es un id de mongo").isMongoId(),
    check("id").custom(existeIdPdf),
    validarCampos,
  ],
  putPersona
);


export default router;