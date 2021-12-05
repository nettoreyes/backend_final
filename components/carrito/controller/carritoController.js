let CarritoServicesMongo = require('../services/carritoServicesMongoDB');

class CarritoController{

    async saveCarrito(req, res, next){
        try{            
            let carrito = req.body;
            let respuesta = await CarritoServicesMongo.save( carrito );
            res.json(respuesta);
        }catch( error ){
            next( error );
        }
    }  

    async addCarrito(req, res, next){
        try{  

            //capturo el id del carrito
            let id = req.params.id;    
            //capturo el nuevo producto del carrito      
            let producto = req.body;            
            //busco el carrito por su id
            let carritoUpdate = await CarritoServicesMongo.getId( id );            
            //agrego el nuevo producto al carro
            carritoUpdate.productos.push( producto );
            //modifico el carrito con el nuevo producto agregado
            let respuesta = await CarritoServicesMongo.update( id, carritoUpdate ); 

            res.json(respuesta);

        }catch( error ){
            next( error );
        }
    }

    async getProductosCar(req, res, next){   
        try{            
            //capturo la id del carrito
            let id = req.params.id;              
            //busco el carrito por su id
            let carrito = await CarritoServicesMongo.getId( id );  
            res.json( carrito.productos );
        }catch( error ){
            next( error );
        }
    }

    async removeProducto(req, res, next){
       
        try{  

            //capturo el id del carrito
            let id = req.params.id;                
            //capturo el id producto
            let idProducto = req.params.id_prod; 

            //busco el carrito por su id
            let carritoUpdate = await CarritoServicesMongo.getId( id );   
            
            //quito el producto con el id indicado
            let carritoFiltrado = carritoUpdate.productos.filter(prod => prod._id !== idProducto );

            carritoUpdate.productos = [...carritoFiltrado];

            //modifico el carrito con el nuevo producto agregado
            let respuesta = await CarritoServicesMongo.update( id, carritoUpdate ); 

            //res.json(respuesta);
            res.json({'ok':'producto eliminado'});

        }catch( error ){
            next( error );
        }
    }

    async removeCar(req, res, next){
        try{  

            //capturo el id del carrito
            let id = req.params.id;                          
            //elimino carrito por su id
            let respuesta = await CarritoServicesMongo.delete( id );   
            //res.json(respuesta);
            res.json(respuesta);

        }catch( error ){
            next( error );
        }
    }
   


}

module.exports = new CarritoController()