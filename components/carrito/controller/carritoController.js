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
   


}

module.exports = new CarritoController()