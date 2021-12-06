let CarritoServicesMongo = require('../services/carritoServicesMongoDB');
let CarritoServicesFirebase = require('../services/carritoServicesFirebase');
const { config } = require("../../../config");

class CarritoController{

    async saveCarrito(req, res, next){
        try{            
            let carrito = req.body;
            let respuesta;

            if(config.TIPO_BD === 'MONGO')
                respuesta = await CarritoServicesMongo.save( carrito );
            
            if(config.TIPO_BD === 'FIREBASE')
                respuesta = await CarritoServicesFirebase.save( carrito );

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
            
            let carritoUpdate;
            let respuesta;

            if(config.TIPO_BD === 'MONGO'){
                //busco el carrito por su id
                carritoUpdate = await CarritoServicesMongo.getId( id );            
                //agrego el nuevo producto al carro
                carritoUpdate.productos.push( producto );
                //modifico el carrito con el nuevo producto agregado
                respuesta = await CarritoServicesMongo.update( id, carritoUpdate ); 
            }

            if(config.TIPO_BD === 'FIREBASE'){                
                carritoUpdate = await CarritoServicesFirebase.getId( id ); 
                carritoUpdate.productos.push( producto ); 
                
                respuesta = await CarritoServicesFirebase.update( id, carritoUpdate );
            }

            res.json(respuesta);

        }catch( error ){
            next( error );
        }
    }

    async getProductosCar(req, res, next){   
        try{
            //capturo la id del carrito
            let id = req.params.id;              
            let carrito;

            if(config.TIPO_BD === 'MONGO'){
            //busco el carrito por su id
                carrito = await CarritoServicesMongo.getId( id );  
            }
            if(config.TIPO_BD === 'FIREBASE'){
                carrito = await CarritoServicesFirebase.getId( id ); 
            }

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
            let carritoUpdate;
            let carritoFiltrado;
            let respuesta ;

            if(config.TIPO_BD === 'MONGO'){
                //busco el carrito por su id
                carritoUpdate = await CarritoServicesMongo.getId( id );               
                //quito el producto con el id indicado
                carritoFiltrado = carritoUpdate.productos.filter(prod => prod._id !== idProducto );
                carritoUpdate.productos = [...carritoFiltrado];
                //modifico el carrito con el nuevo producto agregado
                respuesta = await CarritoServicesMongo.update( id, carritoUpdate ); 
            }

            if(config.TIPO_BD === 'FIREBASE'){
                carritoUpdate = await CarritoServicesFirebase.getId( id ); 
                carritoFiltrado = carritoUpdate.productos.filter(prod => prod._id !== idProducto );
                carritoUpdate.productos = [...carritoFiltrado];
                respuesta = await CarritoServicesFirebase.update( id, carritoUpdate ); 
            }

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
            let respuesta;

            if(config.TIPO_BD === 'MONGO'){                      
            //elimino carrito por su id
                respuesta = await CarritoServicesMongo.delete( id );   
            }

            if(config.TIPO_BD === 'FIREBASE'){
                respuesta = await CarritoServicesFirebase.delete( id );
            }

            //res.json(respuesta);
            res.json(respuesta);

        }catch( error ){
            next( error );
        }
    }
   


}

module.exports = new CarritoController()