//importar el modelo de PDF
const fileUpload = require("express-fileupload");

const pdfPost = (req, res) => {
  
  //subir archivo y movero a una carpeta
  let archivo = req.files.file;
  let path = 'D:/Kevin/Documents/Proyecto_Residencia_2/';
  let uploadPath =`${__dirname}/../archivos/${archivo.name}`;
 
  archivo.mv(uploadPath, (err) => {
    if (err) {
      return res.status(400).json({err});
    }
    res.send(`Archivo ${req.files.file} subido al archivo correctamnte`);
  });
}

module.exports={
  pdfPost
}