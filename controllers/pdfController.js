const { request, response } = require("express");

//*modelo Requerido
const Pdf = require("../models/pdf");
const User = require("../models/user");

const pdfPost = async (req = request, res = response) => {
  //subir archivo y movero a una carpeta
  console.log(req.files.file);
  let archivo = req.files.file;
  let uploadPath = `${__dirname}/../archivos/${archivo.name}`;

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
  const id = req.params.id;
  const pdf = await Pdf.findByIdAndUpdate(id, { estado: false });

  res.json({ msg: "Borrado ", pdf });
};
module.exports = {
  pdfPost,
  postSubir,
  putPdf,
  deletePdf,
};
