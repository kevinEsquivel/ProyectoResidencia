const { response, request } = require("express");
const Calendario = require("../models/calendario");

const calendarioGet = async (req = request, res = response) => {
    const {id_user} = req.params;
  const calendarioU = await Calendario.findOne({ id_user });

  if (!calendarioU) return res.json({ msg: "Error en ID" });
  res.json({
    id: id_user,
    calendarioU
  })
};

const calendarioPost = async (req = request, res = response) => {
    const { boards,settings,currentBoard,identifier } = req.body;
    const  {id_user} = req.params;
  
    const calendario = new Calendario({ boards,settings,currentBoard,identifier,id_user }); //
  
    await calendario.save(); //esto es para guardar en bd
  
    res.json({
        calendario,
    });
  };

  module.exports={
    calendarioGet,
    calendarioPost
  }