import {Schema,model} from 'mongoose';

const calendarioSchema= Schema({
    
        boards: [],
        settings: {
          userName: {type: String,},
          //[not yet] 'defaultTheme': "blue",
          dataPersistence: {type:Boolean},
        },
        currentBoard: {type:Number}, // The index of the currently open board.
        identifier: {type:Number},
    id_user:{
        type:Schema.Types.ObjectId, //*Esto es para hacer una referencia al tipo que es
        ref:'User', //se guardara un de tipo Usuario
        required:[true,"El usuario es obligatorio"]
    },
    
})

export default model('Calendario', calendarioSchema);