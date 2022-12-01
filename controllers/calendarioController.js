const { response, request } = require("express");
const Calendario = require("../models/calendario");



const calendarioGet = async (req = request, res = response) => {
    const {id_user} = req.params;
  const calendarioU = await Calendario.findOne({ id_user });

  if (!calendarioU) return res.json({ msg: "Error en ID" });
  res.json({
    id: calendarioU.id,
    calendarioU
  })
};

const calendarioPost = async (req = request, res = response) => {
    const { boards,settings,currentBoard,identifier } = req.body;
    const {id_user} = req.params;
    
    let c = await Calendario.findOne({ id_user });
    if(c) return res.json({ errors: "Ya Exite un Calendario para este usuario" });
    const calendario = new Calendario({ boards,settings,currentBoard,identifier,id_user }); //  
    await calendario.save(); //esto es para guardar en bd
    res.json({
        calendario,
    });
  };

  const calendarioPut = async (req = request, res = response) => {
    const { _id } = req.params; //recupero el valor del url el id
    const {...resto } = req.body;
    const calendario = await Calendario.findByIdAndUpdate(_id, resto); //*1param, el id a buscar, 1param lo que se actualizara
    if(!calendario) return res.json({msg:"NO se encontro el calendario"})
    res.json({msg:"Calendario actualizado"})
  };

  module.exports={
    calendarioGet,
    calendarioPost,
    calendarioPut

  }