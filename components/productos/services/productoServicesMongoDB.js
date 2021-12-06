
const mongoose = require('mongoose');
const ProductoSchema = require('../schema/productoSchema');

class ProductoServicesMongoDB {
    
    async getAll (){
        try{
            let productos = await ProductoSchema.find();
            //console.log( productos );
            return productos;
        }catch( error ){
            console.log( error );
            return null;
        }
    }

    async getId ( idProducto ){
        try{
        let producto = await ProductoSchema.find({_id: idProducto });            
            return producto[0];
        }catch( error ){
            console.log( error );
            return null;
        }
    }

    async save( producto ){
        try{
            const productoBD = new ProductoSchema( producto );
            await productoBD.save();            
            return { 'ok' : 'registro guardado' };            
        }catch( error ){     
            console.log( error );
            return { 'error' : 'error al guardar en mongo' }
        }
    }

    async update(idProducto, producto ){
        try{
            let productoUpdate = await ProductoSchema.findByIdAndUpdate( idProducto, producto, { useFindAndModify: false } );
            return { 'ok' : 'registro modificado' };            
        }catch( error ){           
            return { 'error' : 'error al modificar' }
        }
    }

    async delete( idProducto ){
        try{
            let productoUpdate = await ProductoSchema.findByIdAndDelete( idProducto );
            return { 'ok' : 'registro eliminado' };            
        }catch( error ){           
            return { 'error' : 'error al eliminar' }
        }
    }
}

module.exports = new ProductoServicesMongoDB();