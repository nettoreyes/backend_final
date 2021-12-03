const mongoose = require('mongoose');


module.exports = class DatabaseMongoDB {

    async abrirConexionBD (){
         try{
             const user = "coderhouse";
             const password = "Vb61nzHCf0H2QWUG";
             const database = "ecommerce";
             const URL = `mongodb+srv://${ user }:${ password }@cluster0.qi2jb.mongodb.net/${ database }?retryWrites=true&w=majority`;
 
             let rta = await mongoose.connect(URL, {
                 useNewUrlParser: true,
                 useUnifiedTopology: true
             });
             console.log("Conectado a MongoDB");
 
         }catch( error ){
             console.log("Error conectar a MongoDB: ", error);
         }
     }
 };