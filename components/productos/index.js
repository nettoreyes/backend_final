const { Router } = require("express");
const router = new Router();
let ProductosController = require('./controller/productoController');


module.exports = ( app ) => {
    app.use("/api/productos",  router);    

    //trae un producto
    router.get("/:id?", ProductosController.getProducto);
    //guarda producto
    router.post('/', ProductosController.saveProducto);
    //modifica producto
    router.put('/:id', ProductosController.updateProducto);
    //elimina un producto por su id
    router.delete('/:id', ProductosController.deleteProducto);
}