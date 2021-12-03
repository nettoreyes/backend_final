const { Router } = require("express");
const router = new Router();
//const Contenedor = require("../../models/Contenedor");
//const contenedorProductos = new Contenedor('./productos.txt');
let ProductosController = require('./controller/productoController');


module.exports = ( app ) => {
    app.use("/api/productos",  router);    

    router.get("/:id?", ProductosController.getProducto);
    router.post('/', ProductosController.saveProducto);
    router.put('/:id', ProductosController.updateProducto);
    router.delete('/:id', ProductosController.deleteProducto);
}