const { request, response } = require("express");
const { escape } = require("querystring");
const fs = require("fs").promises;
//*modelo Requerido
const Pdf = require("../models/pdf");
const User = require("../models/user");

//*Metodo para obtener todos los pdfs
const getPdfs = async (req = request, res = response) => {
  const pdfs = await Pdf.find({ estado: true });
  const total = await Pdf.countDocuments({ estado: true });

  res.json({ pdfs, total });
  //const user = await User.findById(id_user);
};

//*Metodo para encontrar en determinada seccion al o los pdfs que este buscando
const getPdfSeccion = async (req = request, res = response) => {
  const { seccion } = req.params;
  const { tipo, magistrado, año, mes } = req.query;

  let pdfs = await Pdf.find({ seccion, estado: true });
  if (tipo) pdfs = await Pdf.find({ tipo, seccion, estado: true }).sort({nombre:1});
  if (magistrado) pdfs = await Pdf.find({ magistrado, seccion, estado: true });
  if (tipo && magistrado)
    pdfs = await Pdf.find({ tipo, magistrado, seccion, estado: true });
  if (mes) 
    pdfs = pdfs.filter(item => item.fecha.getMonth() === Number(mes))
  if (año) 
    pdfs = pdfs.filter(item => item.fecha.getFullYear() === Number(año))

  const total = await pdfs.length;

  res.json({ pdfs, total });
  
};
//*Metodo para Subir un archivo a el servidor
const pdfPost = async (req = request, res = response) => {
  //subir archivo y movero a una carpeta
  let { seccion, nombre } = req.params;
  let archivo = req.files.file;
  archivo.name = nombre;
  let uploadPath = `${__dirname}/../public/archivos/${seccion}/${archivo.name}`;
  //console.log(uploadPath);
  archivo.mv(uploadPath, (err) => {
    if (err) {
      return res.status(400).json({ err });
    }
    res.json({ uploadPath });
  });
};
//*Metodo para conectar el archivo a la base de datos
const postSubir = async (req = request, res = response) => {
  let { id_user } = req.params;

  let { nombre, ruta, fecha, magistrado, seccion, tipo } = req.body;
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
//*Metodo para actualizar al archivo, 
//!NO SE USA
const putPdf = async (req = request, res = response) => {
  const id = req.params.id;
  const { ...valores } = req.body;
  const pdf = await Pdf.findByIdAndUpdate(id, valores);

  res.json({ msg: "Actualizado ", pdf });
};
//*Metodo para Borrar de el servidor y eliminar de la base de datos
const deletePdf = async (req = request, res = response) => {
  const { id } = req.params;
  try {
  const pdf = await Pdf.findByIdAndUpdate(id, { estado: false }); //!No se borra de la base de datos, se cambia el estado para que no se pueda ver 
  let direccion = "archivos/" + pdf.seccion + "/" + pdf.nombre;
  
  let dirO=`archivos/${pdf.seccion}/${pdf.nombre}`;//Direccion de Origen
  let dest = `archivos/Borrados/${pdf.nombre}`;//Direccion de Borrado
  await fs.copyFile(dirO,dest,0,(err)=>{if(err)  console.log("err",err);});
  await fs.unlink(direccion, function (err) {
    if (err) throw err;
    console.log("file delete");
  });
  
  res.json({ msg: "Borrado ", pdf });
}catch (e) {console.log(e);}
  
};

module.exports = {
  getPdfs,
  getPdfSeccion,
  pdfPost,
  postSubir,
  putPdf,
  deletePdf,
};
