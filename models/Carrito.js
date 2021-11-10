const shortid = require('shortid');

module.exports =  class Carrito{
    constructor(){
        this.id = shortid.generate(); //genero la id del carrito
        this.timestamp = Date.now();
        this.productos = [];
    }
}