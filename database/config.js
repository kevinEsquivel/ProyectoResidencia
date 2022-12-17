import mongoose from'mongoose';

mongoose.Promise = global.Promise; 

export const dbConection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB,{
            useNewUrlParser:true,
            useUnifiedTopology:true
            
        });
        console.log('base de datos conectada');
    } catch (error) {
        console.log('error al inicir la bd',error);
    }
}
