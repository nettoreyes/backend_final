const { db } = require('../../../config/firebase/database');
const shortid = require('shortid');

class ProductoServicesFirebase {
    
    constructor(){
        this.query = db.collection('productos');
    }


    async getAll (){
        try{
            const querySnapShot = await this.query.get();
            let docs =   querySnapShot.docs;
            
            const productos = docs.map((doc) => (
                {                
                _id: doc.data()._id,
                nombre: doc.data().nombre,
                sku: doc.data().sku,
                descripcion: doc.data().descripcion,
                precio: doc.data().precio,
                urlImage: doc.data().urlImage
            }))

            return productos;
        }catch( error ){
            console.log( error );
            return null;
        }
    }

    async getId ( idProducto ){
        try{
            const doc = this.query.doc(`${idProducto}`);
            const item = await doc.get();
            const producto = item.data();
            return producto;
        }catch( error ){
            console.log( error );
            return null;
        }
    }

    async save( producto ){
        try{      
            let _id = shortid.generate();             
            let productoBD = this.query.doc(`${_id}`);
            producto._id = _id; //le asigno la nueva id al producto
            await productoBD.create( producto );            
            return { 'ok' : 'registro guardado en firebase' };            
        }catch( error ){ 
            console.log( error );           
            return { 'error' : 'error al guardar' }
        }
    }

    async update(idProducto, producto ){
        try{            
            const doc = this.query.doc(`${idProducto}`);
            const item = await doc.update( producto );
            return { 'ok' : 'registro modificado' };            
        }catch( error ){           
            return { 'error' : 'error al modificar' }
        }
    }

    async delete( idProducto ){
        try{
            const doc = this.query.doc(`${idProducto}`);
            const item = await doc.delete();
            return { 'ok' : 'registro eliminado' };            
        }catch( error ){           
            return { 'error' : 'error al eliminar' }
        }
    }
}

module.exports = new ProductoServicesFirebase();