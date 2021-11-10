const user = require("../components/users");
const productos = require("../components/productos");
const carrito = require("../components/carrito");


module.exports = ( app ) => {
  

    productos( app );
    carrito( app );


    app.get("/", (req, res) => {
        res.send("Todo ok desde el inicio!");
    });
}