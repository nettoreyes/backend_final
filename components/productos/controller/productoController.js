let ProductoServicesMongo = require('../services/productoServicesMongoDB');
let ProductoServicesFirebase = require('../services/productosServicesFirebase');
const { config } = require("../../../config");

class ProductoController{

    async getProducto(req, res, next){
        try {            
            let id = req.params.id;  
            let productos;

            console.log("conectada aaaa: ", config.TIPO_BD ); 

            if( id ){   
                if(config.TIPO_BD === 'MONGO'){                    
                    productos = await ProductoServicesMongo.getId( id );
                }
                
                if(config.TIPO_BD === 'FIREBASE'){ 
                   productos = await ProductoServicesFirebase.getId( id );
                }

                if( productos )
                    res.json( productos );
                else
                    res.json({'error': 'producto no entontrado'});
            }else{
                

                if(config.TIPO_BD === 'MONGO'){
                    console.log("paso por mondo");
                    productos = await ProductoServicesMongo.getAll();
                }
                if(config.TIPO_BD === 'FIREBASE'){                     
                    productos = await ProductoServicesFirebase.getAll();
                }

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
                let respuesta;

                if(config.TIPO_BD === 'MONGO')
                   respuesta = await ProductoServicesMongo.save( producto );

                if(config.TIPO_BD === 'FIREBASE')
                   respuesta = await ProductoServicesFirebase.save( producto );  
                

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

                let respuesta;

                if(config.TIPO_BD === 'MONGO')         
                    respuesta = await ProductoServicesMongo.update( idProducto, producto );

                if(config.TIPO_BD === 'FIREBASE')
                    respuesta = await ProductoServicesFirebase.update( idProducto, producto );

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
                let respuesta;
                
                if(config.TIPO_BD === 'MONGO')     
                    respuesta = await ProductoServicesMongo.delete( idProducto );
                
                if(config.TIPO_BD === 'FIREBASE')
                    respuesta = await ProductoServicesFirebase.delete( idProducto );

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