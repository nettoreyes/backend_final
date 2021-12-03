const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarritoSchema = new Schema({
    timestamp: { type: String, require: true},
    productos: { type: Array }
})

//crea modelo
const Carrito = mongoose.model('Carritos', CarritoSchema);

module.exports = Carrito;