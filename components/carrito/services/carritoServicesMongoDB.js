const mongoose = require('mongoose');

const CarritoSchema = require('../schema/carritoSchema');
const Carrito = require('../models/Carrito');

class CarritoServicesMongoDB {
    
    async save( productoCarrito ){
        try{
            //el carrito se crea al agregar el primer producto
            let carrito = new Carrito();            
            carrito.productos.push( productoCarrito );
            const carritoBD = new CarritoSchema(carrito);
            let respuesta = await carritoBD.save();
            let idC = JSON.stringify(respuesta);

            console.log("carrito: ", idC);
            return { 'ok' : 'registro guardado' };            
        }catch( error ){            
            console.log( "error", error );  
            return { 'error' : 'error al guardar' }
        }
    }
    
}

module.exports = new CarritoServicesMongoDB();