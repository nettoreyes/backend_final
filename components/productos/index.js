const { Router } = require("express");
const router = new Router();
const Contenedor = require("../../models/Contenedor");
const contenedorProductos = new Contenedor('./productos.txt')

module.exports = ( app ) => {
    app.use("/api/productos",  router);
    
    router.get("/:id?", async (req, res) => {
        let id = parseInt(req.params.id);   
        if( id ){
            let producto = await contenedorProductos.getById( id ); 
            res.json( producto );
        }
        else{
            let productos = await contenedorProductos.getAll(); 
            res.json(productos);
        }
    });

    router.post('/', async (req, res) => {         
        let producto = req.body;
    
        //traigo todos los productos
        let productos = await contenedorProductos.getAll(); 

        let ultimoID = 0;        
        if(productos){
            //busco el ultimo id
            ultimoID = Math.max(...productos.map((i) => i.id));
            //le agrego1
            ultimoID++; 
        }else{
            //si no tengo productos asigno la id 1
            ultimoID=1;            
            productos = [];
        }

        //se lo asigno al nuevo producto
        producto.id = ultimoID;
        productos.push(producto);

        //guardo el producto
        let respuesta = await contenedorProductos.save(productos);
        
        res.json(respuesta);
    });

    router.put('/:id', async (req, res) => {    
        
        //capturo al producto
        let producto = req.body;      
        let idProducto =  parseInt(req.params.id);  
        
        if(idProducto){
            //rescato todos los productos
            let productos = await contenedorProductos.getAll();   
            
            //modifico el producto ingresado
            let productosEditados = productos.map(item => item.id === idProducto ? { 
                id : idProducto, 
                nombre : producto.nombre, 
                descripcion : producto.descripcion,                
                sku : producto.sku,
                urlImage : producto.urlImage,
                precio : producto.precio
            } : item );
            
            //guardo el nuevo listado
            let respuesta = await contenedorProductos.save(productosEditados);

            res.json(respuesta);
        }
        else{
            res.json({ 'error' : 'error al guardar' });
        }
    });

    router.delete('/:id', async (req, res) => {         
        //capturo el id
        let id = parseInt(req.params.id);        

        //rescato todos los productos
        let productos = await contenedorProductos.getAll();   

        //quito el producto con el mismo id
        let productosFiltrado = productos.filter(prod => prod.id !== id );

        //guardo el nuevo listado
        await contenedorProductos.save(productosFiltrado);

         res.json({'ok':'producto eliminado'});
    });

}