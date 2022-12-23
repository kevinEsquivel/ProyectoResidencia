import { Router } from "express";
import { check } from "express-validator";
import { getPersona, getPersonal, postPersona, putPersona } from "../controllers/personalCotroller.js";
import { existeId } from "../helpers/db-validations.js";
import { existeIdPdf } from "../helpers/pdf-validations.js";


import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

//ESTO ES LO IMPORTANTE
//*Obtener todos las personas
router.get("/", getPersonal);
//*Obtener una persona
router.get("/:id", 
[
  check("id", "No es un id valido de Mongo").isMongoId(), 
  check("id").custom(existeId),
  validarCampos
]
,getPersona);
//*Agregar una persona
router.post("/:id",[
  check("id", "No es un id valido de Mongo").isMongoId(), 
  check("id").custom(existeId),
  validarCampos
],postPersona);

//*Actualizar una persona
router.put("/:id",
  [
    check("id", "No es un id de mongo").isMongoId(),
    check("id").custom(existeId),
    validarCampos,
  ],
  putPersona
);


export default router;