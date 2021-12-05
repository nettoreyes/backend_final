let ProductoServicesMongo = require('../services/productoServicesMongoDB');
let ProductoServicesFirebase = require('../services/productosServicesFirebase');
const { config } = require("../../../config");

class ProductoController{

    async getProducto(req, res, next){
        try {            
            let id = req.params.id;  
            if( id ){                
                //let productos = await ProductoServicesMongo.getId( id );
                let productos = await ProductoServicesFirebase.getId( id );
                if( productos )
                    res.json( productos );
                else
                    res.json({'error': 'producto no entontrado'});
            }else{

                //let productos = await ProductoServicesMongo.getAll();
                let productos = await ProductoServicesFirebase.getAll();


                if( productos.length > 0)
                    res.json( productos );
                else
                    res.json({'error': 'no hay productos'});
            }
        } catch ( error ) {
            next(error);
        }
    }

    async saveProducto(req, res, next){
        try{
            if(config.USUARIO_ADMINISTRADOR){
                let producto = req.body;            
                //let respuesta = await ProductoServicesMongo.save( producto );  
                
                let respuesta = await ProductoServicesFirebase.save( producto );  

                res.json(respuesta);
            }else{
                res.json({error: -1, descripcion: 'RUTA /api/productos METODO post NO AUTORIZADA' });
            }

        }catch( error ){
            next( error );
        }

    }
    
    async updateProducto(req, res, next){
        try{
            if(config.USUARIO_ADMINISTRADOR){
                let producto = req.body;   
                let idProducto =  req.params.id;          
                //let respuesta = await ProductoServicesMongo.update( idProducto, producto );
                let respuesta = await ProductoServicesFirebase.update( idProducto, producto );
                res.json(respuesta);
            }else{
                res.json({error: -1, descripcion: 'RUTA /api/productos METODO put NO AUTORIZADO' });
            }

        }catch( error ){
            next( error );
        }
    }

    async deleteProducto(req, res, next){
        try{
            if(config.USUARIO_ADMINISTRADOR){                  
                let idProducto =  req.params.id;          
                //let respuesta = await ProductoServicesMongo.delete( idProducto );
                let respuesta = await ProductoServicesFirebase.delete( idProducto );
                res.json(respuesta);
            }else{
                res.json({error: -1, descripcion: 'RUTA /api/productos METODO DELETE NO AUTORIZADO' });
            }

        }catch( error ){
            next( error );
        }
    }


}

module.exports = new ProductoController()