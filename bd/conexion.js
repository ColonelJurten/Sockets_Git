const mongoose = require ('mongoose');
require('dotenv').config()
async function conectarMongoDB(){
    mongoose.set('strictQuery', true);
    try{
      //const conexion = await mongoose.connect(process.env.mongoAtlas);
      const conexion = await mongoose.connect(process.env.mongoLocal);
        console.log('Conexion a MongoDB correcta');

    }catch(err){
        console.error('Error al intentar conectar con MongoDB '+err);
    }
}
module.exports={
    conectarMongoDB,
    mongoose
}