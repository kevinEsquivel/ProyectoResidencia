const { request, response } = require("express");
const { escape } = require("querystring");
const fs = require('fs').promises
//*modelo Requerido
const Pdf = require("../models/pdf");
const User = require("../models/user");
//const { mkdir } = require('fs/promises');
const getPdfs = async  (req = request, res = response) => {
  const { seccion = '', tipo = '',magistrado='',año='',mes=''} = req.query;
  
    const pdfs = await Pdf.find({estado: true });
    const total = await Pdf.countDocuments({ estado: true });
  
  res.json({pdfs,total})
  //const user = await User.findById(id_user);
}
const pdfPost = async (req = request, res = response) => {
  //subir archivo y movero a una carpeta
  let {seccion,nombre} = req.params;
  let archivo = req.files.file;
  archivo.name=nombre;
  let uploadPath = `${__dirname}/../archivos/${seccion}/${archivo.name}`;
  
  archivo.mv(uploadPath, (err) => {
    if (err) {
      return res.status(400).json({ err });
    }
    res.json({uploadPath});
  });
};
const postSubir = async (req = request, res = response) => {
  let { id_user } = req.params;

  let { nombre, ruta,fecha, magistrado, seccion, tipo } = req.body;
  const user = await User.findById(id_user);

  if (!user) {
    res.json({
      errors: "El usuario no existe",
    });
  }

  const pdfs = new Pdf({
    nombre,
    ruta,
    fecha,
    magistrado,
    seccion,
    tipo,
    id_user,
  }); //
  await pdfs.save(); //esto es para guardar en bd

  res.json({
    pdfs,
  });
};
const putPdf = async (req = request, res = response) => {
  const id = req.params.id;
  const {...valores} = req.body;
  const pdf = await Pdf.findByIdAndUpdate(id, valores);

  res.json({ msg: "Actualizado ", pdf });
}
const deletePdf = async (req = request, res = response) => {
  const {id} = req.params;
  
  const pdf = await Pdf.findByIdAndUpdate(id, { estado: false });
  let direccion ='archivos/'+pdf.seccion+'/'+pdf.nombre;
  console.log(direccion);
  fs.unlink(direccion,function (err) {if(err) throw err; console.log('file delete');});
  res.json({ msg: "Borrado ",pdf});
};
module.exports = {
  getPdfs,
  pdfPost,
  postSubir,
  putPdf,
  deletePdf,
};
