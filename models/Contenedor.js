const fs = require('fs'); 

module.exports = class Contenedor {
    
    constructor (nombreArchivo){
        this.nombreArchivo=nombreArchivo;        
    }

    async save(producto){
        try{            
            let productoString = JSON.stringify(producto);
            await fs.promises.writeFile(`./${this.nombreArchivo}`, productoString, 'utf-8');
            return { 'ok' : 'registro guardado' };
        }
        catch(err){
            return { 'error' : 'error al guardar' }
        }
    }

    async getById(id){       
        try{      
            const contenido = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8');
            let productos = JSON.parse(contenido);             
            let producto = productos.filter(x => x.id === id);             
            const valor = Object.keys(producto);        
            if(valor[0] == 0)
                return producto[0]; //retorno el primer elemento del array
            else
                return { 'error': 'producto no entontrado'};
        }
        catch(err){
            console.log('Error al leer archivo productos: ', err );
            return { 'error': 'no existe producto'};
        }    
    }

    async getAll(){
        try{
            const contenido = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8');
            if(contenido)
                return JSON.parse(contenido);    
            else
                return null;       
        }
        catch(err){             
            return null;                            
        }    
    }

    async deleteById(id){
        const contenido = await this.getAll();
        let productos = contenido.filter(x => x.id !== id);
        await this.save(productos);
    }

    async deleteAll(){
        try{       
            await fs.promises.writeFile(`./${this.nombreArchivo}`, '', 'utf-8'); //solo elimino los productos
            console.log('************Producto Eliminado***************');
            return true;
        }
        catch(err){
            console.log('**********Error al eliminar producto: ', err );
            return { 'error': err};
        }
    }
}