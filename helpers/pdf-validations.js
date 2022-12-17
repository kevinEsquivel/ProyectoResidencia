import Pdf from "../models/pdf.js";
export const existeIdPdf = async (id) => {
    const idEncontrado = await Pdf.findById(id);
    if (!idEncontrado) {
      throw new Error(`El id ${id} no esta registrado. `);
    }
  };

