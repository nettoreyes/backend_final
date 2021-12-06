const { db } = require('../../../config/firebase/database');
const shortid = require('shortid');
const Carrito = require('../models/Carrito');

class CarritoServicesFirebase {
    constructor(){
        this.query = db.collection('carritos');
    }
    
    async getId ( idCarrito ){
        try{
            const doc = this.query.doc(`${idCarrito}`);
            const item = await doc.get();
            const carrito = item.data();
            return carrito;
        }catch( error ){
            console.log( error );
            return null;
        }
    }

    async save( productoCarrito ){
        try{

            let _id = shortid.generate();
            //el carrito se crea al agregar el primer producto
            let carrito = {
                _id : _id,       
                timestamp: Date.now(),
                productos: []
            };

            carrito.productos.push( productoCarrito );
             
            let carritoDoc = this.query.doc(`${_id}`);
            await carritoDoc.create( carrito );            
            return carrito._id;            
        }catch( error ){            
            console.log( "error", error );  
            return { 'error' : 'error al guardar' }
        }

       
    }

    async update( idCarrito, carrito ){
        try{            
            const doc = this.query.doc(`${idCarrito}`);
            const item = await doc.update( carrito );
            return { 'ok' : 'registro modificado' };            
        }catch( error ){           
            return { 'error' : 'error al modificar' }
        }
    }

    async delete( idCarrito ){
        try{            
            const doc = this.query.doc(`${idCarrito}`);
            const item = await doc.delete();
            return { 'ok' : 'registro eliminado' };            
        }catch( error ){           
            return { 'error' : 'error al eliminar' }
        }
    }
    
}

module.exports = new CarritoServicesFirebase();