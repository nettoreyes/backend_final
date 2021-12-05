const mongoose = require('mongoose');

const CarritoSchema = require('../schema/carritoSchema');
const Carrito = require('../models/Carrito');

class CarritoServicesMongoDB {
    
    async getId ( idCarrito ){
        try{
        let carrito = await CarritoSchema.find({_id: idCarrito });            
            return carrito[0];
        }catch( error ){
            console.log( error );
            return null;
        }
    }

    async save( productoCarrito ){
        try{
            //el carrito se crea al agregar el primer producto
            let carrito = new Carrito();            
            carrito.productos.push( productoCarrito );
            const carritoBD = new CarritoSchema(carrito);
            let respuesta = await carritoBD.save();

            //**esto lo hago para poder sacar el id creado */
            //la respuesta la paso a string
            let car = JSON.stringify( respuesta );
            //el string lo paso a objeto
            car = JSON.parse( car );

            return car._id;            
        }catch( error ){            
            console.log( "error", error );  
            return { 'error' : 'error al guardar' }
        }
    }

    async update( idCarrito, carrito ){
        try{
            let carritoUpdate = await CarritoSchema.findByIdAndUpdate( idCarrito, carrito, { useFindAndModify: false } );
            return { 'ok' : 'registro modificado' };            
        }catch( error ){           
            return { 'error' : 'error al modificar' }
        }
    }

    async delete( idCarrito ){
        try{
            let respuesta = await CarritoSchema.findByIdAndDelete( idCarrito );
            return { 'ok' : 'registro eliminado' };            
        }catch( error ){           
            return { 'error' : 'error al eliminar' }
        }
    }
    
}

module.exports = new CarritoServicesMongoDB();