const user = require("../components/users");
const productos = require("../components/productos");
const carrito = require("../components/carrito");
const DatabaseMongoDB = require('../config/DatabaseMongoDB');
const conexionMongoDB = new DatabaseMongoDB();
const { config } = require("../config/");
//const ContenedorMongo = require("../models/ContenedorMongoDb");
//const contenedorMongoDB = new ContenedorMongo();

module.exports = ( app ) => {

    
    //contenedorMongoDB.conexionBD();
    conexionMongoDB.abrirConexionBD();

    productos( app );
    carrito( app );


    app.get("/", (req, res) => {
        res.send("Todo ok desde el inicio!");
    });

    app.get("/frontend", (req, res) => {
        res.render('index', { tipoUsuario : config.USUARIO_ADMINISTRADOR });
    });
}