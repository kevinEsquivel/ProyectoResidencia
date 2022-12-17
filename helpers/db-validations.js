
import Role from "../models/role.js";
import User from "../models/user.js";


export const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`Rol NO permitido`);
  }
};
export const emailValidation = async (correo = "") => {
    const existeEmail = await User.findOne({ correo });
    if (existeEmail) {
      throw new Error(`El correo ${correo} ya esta registrado`);
    }
  };
  
export const existeId = async (id) => {
    const idEncontrado = await User.findById(id);
    if (!idEncontrado) {
      throw new Error(`El id ${id} no esta registrado. `);
    }
  };
  
 