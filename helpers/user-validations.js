const { response, request } = require("express");
const bcrypt = require("bcryptjs"); //!para encriptar la contraseña
const User = require("../models/user");

const matchPassword = function (password, savedPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, savedPassword, (err, matches) => {
      if (err) {
        console.log("ERROR");
        reject(err);
      } else {
        //console.log(matches,"passIn", password,"PassUser",savedPassword);
        resolve(matches);
      }
    });
  });
};
const userExists = function (_id) {
return new Promise( async(resolve, reject) => {
    let u = await User.findOne({_id});
    if(!u) reject("Usuario no existe");
    resolve("")
});
};

module.exports = {
  matchPassword,
  userExists
};
