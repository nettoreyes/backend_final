const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = new Schema({
    nombre: {type: String, require: true},
    descripcion: {type: String, require: true},
    sku: {type: String, require: true},
    urlImage: {type: String, require: true},
    precio:{type: Number, require: true}
})

//crea modelo
const Producto = mongoose.model('Productos', ProductoSchema);

module.exports = Producto;


// module.exports =  class Producto{
//     constructor ( id=0, nombre, descripcion, sku, urlImage, precio ){
//         this.id = id;
//         this.timestamp = Date.now();
//         this.nombre = nombre;
//         this.descripcion = descripcion;
//         this.sku = sku;
//         this.urlImage = urlImage;
//         this.precio = precio;
//     }
// }