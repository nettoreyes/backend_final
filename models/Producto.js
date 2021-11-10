module.exports =  class Producto{
    constructor ( id=0, nombre, descripcion, sku, urlImage, precio ){
        this.id = id;
        this.timestamp = Date.now();
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.sku = sku;
        this.urlImage = urlImage;
        this.precio = precio;
    }
}