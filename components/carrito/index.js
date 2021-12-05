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
    
    

    // //elimina todo el carrito
    // router.delete('/:id', async (req, res) => {         
    //     //capturo el id
    //     let id = req.params.id;        

    //     //rescato 
    //     let carritos = await contenedorCarrito.getAll();   

    //     //quito el carrito con el mismo id
    //     let carritoFiltrado = carritos.filter(prod => prod.id !== id );

    //     //guardo el nuevo listado
    //     await contenedorCarrito.save(carritoFiltrado);

    //      res.json({'ok':'carrito eliminado'});
    // });

}