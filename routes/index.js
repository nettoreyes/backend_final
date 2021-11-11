const user = require("../components/users");
const productos = require("../components/productos");
const carrito = require("../components/carrito");


module.exports = ( app ) => {

    // app.use((req, res, next) => {
    //     res.status(404).json({
    //         titulo: "404",
    //         descripcion: "Sitio no encontrado"
    //     })
    // })

    const ADMINISTRADOR = false; //para usar en rutas de administrador

    productos( app, ADMINISTRADOR );
    carrito( app );


    app.get("/", (req, res) => {
        res.send("Todo ok desde el inicio!");
    });

    app.get("/frontend", (req, res) => {
        res.render('index', { tipoUsuario : ADMINISTRADOR });
    });
}