const { Router } = require("express");
const router = new Router();

let CarritosController = require('./controller/carritoController');

module.exports = ( app ) => {
    
    app.use("/api/carrito", router);

    //el carrito se crea al agregar el primer producto
    router.post('/', CarritosController.saveCarrito);
    //agregar productos al carrito
    router.put('/:id/productos', CarritosController.addCarrito); 

    //retorna los productos de un carrito
    router.get("/:id/productos", CarritosController.getProductosCar);

    //elimina un producto del carrito
    router.delete('/:id/productos/:id_prod', CarritosController.removeProducto);  
    
    // //elimina todo el carrito
    router.delete('/:id', CarritosController.removeCar);  
    
    

}