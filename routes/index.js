const productos = require("../components/productos");
const carrito = require("../components/carrito");
const DatabaseMongoDB = require('../config/DatabaseMongoDB');
const conexionMongoDB = new DatabaseMongoDB();
const { config } = require("../config/");


module.exports = ( app ) => {
    
    //se abre conexion con mongoDB
    conexionMongoDB.abrirConexionBD();

    //se crea ruta a productos
    productos( app );

    //se crea ruta a carrito
    carrito( app );


    app.get("/", (req, res) => {
        res.send("Todo ok desde el inicio!");
    });

    //acceso al frontend
    app.get("/frontend", (req, res) => {
        res.render('index', { tipoUsuario : config.USUARIO_ADMINISTRADOR });
    });
}