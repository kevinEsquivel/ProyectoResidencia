const { response, request } = require("express");
const bcrypt = require("bcryptjs"); //!para encriptar la contraseña

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

module.exports = {
  matchPassword,
};
