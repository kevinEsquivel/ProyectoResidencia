import { response, request } from "express";
import bcrypt from "bcryptjs"; //!para encriptar la contraseña
import User from "../models/user.js";

export const matchPassword = function (password, savedPassword) {
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
export const userExists = function (_id) {
return new Promise( async(resolve, reject) => {
    let u = await User.findOne({_id});
    if(!u) reject("Usuario no existe");
    resolve("")
});
};


