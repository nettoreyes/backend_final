
const mongoose = require('mongoose');
const Producto = require('./Producto');

module.exports = class ContenedorMongoDb {

   async conexionBD (){
        try{
            const user = "coderhouse";
            const password = "Vb61nzHCf0H2QWUG";
            const database = "ecommerce";
            const URL = `mongodb+srv://${ user }:${ password }@cluster0.qi2jb.mongodb.net/${ database }?retryWrites=true&w=majority`;

            let rta = await mongoose.connect(URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log("Base datos conectada");

        }catch( error ){
            console.log("Error al conectar: ", error);
        }
    }

    async getAll (){
        try{
        let productos = await Producto.find();
            console.log( productos );
        }catch( error ){
            console.log( error );
        }
    }
};