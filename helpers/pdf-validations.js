const Pdf = require("../models/pdf");
const existeIdPdf = async (id) => {
    const idEncontrado = await Pdf.findById(id);
    if (!idEncontrado) {
      throw new Error(`El id ${id} no esta registrado. `);
    }
  };

  module.exports = {
    existeIdPdf,
  }