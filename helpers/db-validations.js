
const Role = require("../models/role");
const User = require("../models/user");


const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`rol ${rol} NO permitido`);
  }
};
const emailValidation = async (correo = "") => {
    const existeEmail = await User.findOne({ correo });
    if (existeEmail) {
      throw new Error(`El correo ${correo} ya esta registrado ${existeEmail}`);
    }
  };
  
  const existeId = async (id) => {
    const idEncontrado = await User.findById(id);
    if (!idEncontrado) {
      throw new Error(`El id ${id} no esta registrado. `);
    }
  };
  
  module.exports = {
    esRolValido,
    emailValidation,
    existeId,
  };