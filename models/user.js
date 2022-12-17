import {Schema,model} from 'mongoose';

const UsuarioSchema= Schema({
    nombre:{ //el esquema tendra un nombre con los valores
        type: String,
        required:[true,'El nombre es obligatorio'], //primero es si es requerido y el segundo mensaje de error
    },
    apellido:{
        type: String,
        required:[true,'El apellido es obligatorio'], 
    },
    puesto:{
        type: String
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
    const {__v,_id,...usuario}= this.toObject();
    usuario.uid = _id
    return usuario; // es lo que estaba despues de los puntos
    }

    export default model('User', UsuarioSchema);