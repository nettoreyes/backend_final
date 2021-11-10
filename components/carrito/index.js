const { Router } = require("express");
const router = new Router();
const Contenedor = require("../../models/Contenedor");
const contenedorCarrito = new Contenedor('./carrito.txt')
const Carrito = require('../../models/Carrito');

module.exports = ( app ) => {
    
    app.use("/api/carrito", router);
    
    //el carrito se crea al agregar el primer producto
    router.post('/', async (req, res) => {         
        
        //capturo el producto enviado
        let productoCarro = req.body;

        //creo el carrito
        let carrito = new Carrito();

        //agrego el producto al carrito
        carrito.productos.push(productoCarro);       

        //rescato todos los carritos
        let carritos = await contenedorCarrito.getAll(); 

        //verifico que existan
        if(carritos == null)
            carritos = [];
        
        //agrego el nuevo
        carritos.push(carrito);

        //guardo el carrito
        let respuesta = await contenedorCarrito.save(carritos);
        
        console.log(respuesta);

        res.json(carrito.id);
    });

    //elimina todo el carrito
    router.delete('/:id', async (req, res) => {         
        //capturo el id
        let id = req.params.id;        

        //rescato 
        let carritos = await contenedorCarrito.getAll();   

        //quito el carrito con el mismo id
        let carritoFiltrado = carritos.filter(prod => prod.id !== id );

        //guardo el nuevo listado
        await contenedorCarrito.save(carritoFiltrado);

         res.json({'ok':'carrito eliminado'});
    });

    //retorna los productos de un carrito
    router.get("/:id/productos", async (req, res) => {
        let id = req.params.id;           
        let carrito = await contenedorCarrito.getById( id ); 
        res.json( carrito.productos );
    });

    //agregar productos al carrito
    router.post('/:id/productos', async (req, res) => {         
        
        //capturo el id del carro
        let idCarro =  req.params.id;          

        //capturo el producto enviado
        let productoCarro = req.body;
        
        //rescato todos los carritos
        let carritos = await contenedorCarrito.getAll(); 

        //busco el carrito
        let carrito = carritos.find(item => item.id === idCarro);
        //agrego el producto
        carrito.productos.push(productoCarro);
        
        let carritosEditado = carritos.map(item => item.id === idCarro ? { 
            id : item.id, 
            timestamp : item.timestamp,
            productos : carrito.productos
        } : item );


        //guardo el carrito
        let respuesta = await contenedorCarrito.save(carritosEditado);
        
        console.log(respuesta);

        res.json(respuesta);
    });

    //elimina producto del carrito
    router.delete('/:id/productos/:id_prod', async (req, res) => {         
        //capturo el id carrito
        let idCarro = req.params.id;        

        //capturo el id producto
        let idProducto = parseInt(req.params.id_prod);

        //rescato 
        let carritos = await contenedorCarrito.getAll();

        //busco el carrito
        let carrito = carritos.find(item => item.id === idCarro);

        //quito el producto con el id indicado
        let carritoFiltrado = carrito.productos.filter(prod => prod.id !== idProducto );

        let carritosEditado = carritos.map(item => item.id === idCarro ? { 
            id : item.id, 
            timestamp : item.timestamp,
            productos : carritoFiltrado
        } : item );

        //guardo el nuevo listado
        await contenedorCarrito.save(carritosEditado);

         res.json({'ok':'producto eliminado'});
    });


}