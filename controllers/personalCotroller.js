import { response, request } from "express";
import Persona from "../models/persona.js";

//*Obtener informacion de todas las personas
export const getPersonal = async (req = request, res = response) => {
  const personas = await Persona.find({ estado: true });
  const total = await Persona.countDocuments({ estado: true });
  res.json({
    personas,
    total,
  });
};
//*Obtener informacion de una persona
export const getPersona = async (req = request, res = response) => {
  const { id } = req.params;
  const persona = await Persona.findOne({ id });

  if (!persona) return res.json({ msg: "Error en Email" });
  res.json({
    id: user.id,
    persona,
  });
};
//*Agregar un persona
export const postPersona = async (req = request, res = response) => {
    const {id} = req.params;
  const {
    nombre,
    apellidoP,
    apellidoM,
    curp,
    rfc,
    homoclave,
    correoInst,
    correoPer,
    TelCasa,
    cel,
    estadoCivil,
    regMatri,
    paisNacimiento,
    nacionalidad,
    Observaciones,
    domicilio,
    escolaridad,
  } = req.body;

  const persona = new Persona({
    nombre,
    apellidoP,
    apellidoM,
    curp,
    rfc,
    homoclave,
    correoInst,
    correoPer,
    TelCasa,
    cel,
    estadoCivil,
    regMatri,
    paisNacimiento,
    nacionalidad,
    Observaciones,
    domicilio,
    escolaridad,
    id_user:id
  }); //
  await persona.save(); //esto es para guardar en bd

  res.json({
    persona,
  });
};
//*Actualizar un persona
export const putPersona = async (req = request, res = response) => {};
