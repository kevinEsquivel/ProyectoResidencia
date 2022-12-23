import {Schema,model} from 'mongoose';

const PersonaSchema= Schema({
    nombre:{ //el esquema tendra un nombre con los valores
        type: String
    },
    apellidoP:{
        type: String
    },
    apellidoM:{
        type: String
    },
    curp:{
        type: String,
        
    },
    rfc:{ //el esquema tendra un nombre con los valores
        type: String,
    },
    homoclave:{ //el esquema tendra un nombre con los valores
        type: String,
    },
    correoInst:{ //el esquema tendra un nombre con los valores
        type: String
        //enum:['ADMIN_ROLE','USER_ROLE']
    },
    correoPer:{ //el esquema tendra un nombre con los valores
        type: String,
        default:false
    },
    TelCasa:{ //el esquema tendra un nombre con los valores
        type: String,
        default:false
    },
    cel:{ //el esquema tendra un nombre con los valores
        type: String,
        default:false
    },
    estadoCivil:{
        type: String,
        default:false
    },
    regMatri:{
        type: String,
        default:false
    },
    paisNacimiento:{
        type: String,
        default:false
    },
    nacionalidad:{
        type: String,
        default:false
    },
    Observaciones:{
        type: String,
        default:false
    },
    domicilio:{
        calle:{
            type:String,
            default:false
        },
        NumExt:{
            type:String,
            default:false
        },
        NumInt:{
            type:String,
            default:false
        },
        col:{
            type:String,
            default:false
        },
        municipio:{
            type:String,
            default:false
        },
        entFederativa:{
            type:String,
            default:false
        },
        CP:{
            type:String,
            default:false
        },
        Observaciones:{
            type:String,
            default:false
        },
        extranjero:{
            calle:{
                type:String,
                default:false
            },
            NumExt:{
                type:String,
                default:false
            },
            NumInt:{
                type:String,
                default:false
            },
            col:{
                type:String,
                default:false
            },
            estado:{
                type:String,
                default:false
            },
            pais:{
                type:String,
                default:false
            },
            CP:{
                type:String,
                default:false
            },
        },
        
    },
    escolaridad:{
        nivel:{
            type:String,
            default:false
        },
        instEducativa:{
            type:String,
            default:false
        },
        carrera:{
            type:String,
            default:false
        },
        estatus:{
            type:String,
            default:false
        },
        docObtenido:{
            type:String,
            default:false
        },
        fechaObtencion:{
            type:String,
            default:false
        },
        lugarInstitucion:{
            type:String,
            default:false
        },
        observaciones:{
            type:String,
            default:false
        },

    },
    id_user:{
        type:Schema.Types.ObjectId, //*Esto es para hacer una referencia al tipo que es
        ref:'User', //se guardara un de tipo Usuario
        required:[true,"El usuario es obligatorio"]
    },
})

//metodos para sobreescribir metodods
PersonaSchema.methods.toJSON = function(){//debe ser de este tipo de funciones
    const {__v,_id,...persona}= this.toObject();
    persona.uid = _id
    return persona; // es lo que estaba despues de los puntos
    }

export default model('Persona', PersonaSchema);