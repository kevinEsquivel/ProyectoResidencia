const {Schema,model} = require('mongoose');

const PdfSchema= Schema({
    nombre:{
        type: String,
        required:[true,"El nombre es obligatorio"]
        
    },
    ruta:{
        type: String,
        required:[true,"El ruta es obligatorio"]
    },
    fecha:{
        type: Date,
        required:[true,"El fecha es obligatorio"]

    },
    magistrado:{
        type: String,
        required:[true,"El magistrado es obligatorio"]
    },
    seccion:{ 
        type: String,
        required:[true,"El seccion es obligatorio"]
    },
    tipo:{
        type: String
    },
    id_user:{
        type:Schema.Types.ObjectId, //*Esto es para hacer una referencia al tipo que es
        ref:'User', //se guardara un de tipo Usuario
        required:[true,"El usuario es obligatorio"]
    },
    estado:{
        type: Boolean,
        default:true
    },

})

//metodos para sobreescribir metodods
PdfSchema.methods.toJSON = function(){//debe ser de este tipo de funciones
    const {__v,_id,...pdf}= this.toObject();
    pdf.uid = _id
    return pdf; // es lo que estaba despues de los puntos
    }

module.exports = model('Pdf', PdfSchema);