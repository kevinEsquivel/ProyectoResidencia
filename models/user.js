const {Schema,model} = require('mongoose');

const UsuarioSchema= Schema({
    nombre:{ //el esquema tendra un nombre con los valores
        type: String,
        required:[true,'El nombre es obligatorio'], //primero es si es requerido y el segundo mensaje de error
    },
    correo:{ //el esquema tendra un nombre con los valores
        type: String,
        required:[true,'El correo es obligatorio'], //primero es si es requerido y el segundo mensaje de error
        unique:true //no habra correos  iguales
    },
    password:{ //el esquema tendra un nombre con los valores
        type: String,
        required:[true,'La contraseña es obligatoria'], //primero es si es requerido y el segundo mensaje de error
    },
    rol:{ //el esquema tendra un nombre con los valores
        type: String,
        required:true,
        //enum:['ADMIN_ROLE','USER_ROLE']
    },
    estado:{ //el esquema tendra un nombre con los valores
        type: Boolean,
        default:true
    },
    google:{ //el esquema tendra un nombre con los valores
        type: Boolean,
        default:false
    }
})

//metodos para sobreescribir metodods
UsuarioSchema.methods.toJSON = function(){//debe ser de este tipo de funciones
    const {__v,password,_id,...usuario}= this.toObject();
    usuario.uid = _id
    return usuario; // es lo que estaba despues de los puntos
    }

module.exports = model('User', UsuarioSchema);