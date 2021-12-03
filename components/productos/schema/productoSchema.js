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