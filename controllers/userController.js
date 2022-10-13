//paquetes requieridos
const { response, request } = require("express");
const bcrypt = require("bcryptjs"); //!para encriptar la contraseña

//*modelo Requerido
const User = require("../models/user");
const { matchPassword } = require("../helpers/user-validations");

const userGet = async (req, res) => {
  const user = await User.find({ estado: true });
  const total = await User.countDocuments({ estado: true });

  res.json({
    user,
    total,
  });
};
const userGetEmailPass = async (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  
  const user = await User.findOne({ email: email });

  if (!user) return res.json({ msg: "Error en Email" });

  const vPass = await matchPassword(pass, user.password);

  if (!vPass) return res.json({ errors: "No match" });
  
  //console.log("TODO CORRECTO", matchPassword);
};
const userPost = async (req = request, res = response) => {
  const { nombre, password, correo, rol } = req.body;

  const usuario = new User({ nombre, password, correo, rol }); //

  //ENCRIPTAR LA CONTRASEÑA
  const salt = bcrypt.genSaltSync(10); //?son los saltos de encriptacion entre mas grande mas dificil de decifrar
  usuario.password = bcrypt.hashSync(password, salt); //? es para generar el hash que se asociara a la contraseña y se guardara con ella

  await usuario.save(); //esto es para guardar en bd

  res.json({
    usuario,
  });
};
const userPut = async (req = request, res = response) => {
  const { id } = req.params; //recupero el valor del url el id
  const { _id, password, google, ...resto } = req.body;

  //TODO validar contra base de datos
  const rol = await User.findOne({ id: req.params.id });
  if (rol !== "DEVELOMENT_ROL") {
    res.json({
      msg: "No cuentas con el rol permitido para esto",
    });
    return;
  }
  if (password) {
    //*ENCRIPTAR LA CONTRASEÑA
    const salt = bcrypt.genSaltSync(10); //?son los saltos de encriptacion entre mas grande mas dificil de decifrar
    resto.password = bcrypt.hashSync(password, salt); //? es para generar el hash que se asociara a la contraseña y se guardara con ella
  }

  const usuario = await User.findByIdAndUpdate(id, resto); //*1param, el id a buscar, 1param lo que se actualizara

  res.json({ usuario });
};
const userDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const rol = await User.findOne({ id: req.params.id });
  if (rol !== "DEVELOMENT_ROL") {
    res.json({
      msg: "No cuentas con el rol permitido para esto",
    });
    return;
  }
  const usuario = await User.findByIdAndUpdate(id, { estado: false }); //*el segundo elemento cambia el estado a false de ese id
  res.json({
    usuario,
  });
};
module.exports = {
  userGet,
  userGetEmailPass,
  userPost,
  userPut,
  userDelete,
};
