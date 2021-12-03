const tipoUsuario = document.getElementById('tipoUsuario').innerHTML;
const contenedorProductos = document.querySelector('#contenedorProductos');
const alerta = document.querySelector('#alerta');
const cantidadCarrito = document.querySelector('#cantidadCarrito');
const idCarrito = document.querySelector('#idCarrito');
const tablaProductosCarro = document.querySelector('#tablaProductosCarro');
alerta.classList.add("d-none");


const cargaProductos = () => {
    fetch('http://localhost:8080/api/productos/')
    .then(res => res.json())
    .then(data => {
        contenedorProductos.innerHTML = ``;
        //console.log(data);
        data.forEach(element => {
            contenedorProductos.innerHTML += 
            `<div class="col d-flex justify-content-center">
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="${ element.urlImage }" alt="Card image cap">
                    <div class="card-body">
                        <p class="card-text">Codigo: ${ element.sku }</p>
                        <h5 class="card-title">${ element.nombre }</h5>
                        <p class="card-text">${ element.descripcion }</p>                       
                        <h6 class="card-title">$ ${ element.precio }</h6>
                        <div class="text-center">                            
                            <button type="button" class="btn btn-primary btn-sm ${ ( tipoUsuario === 'ADMINISTRADOR' ? 'd-none' : '' ) } " onclick="agregarAlCarro(${ element._id })">Agregar al Carro</button>
                            <button type="button" class="btn btn-success btn-sm ${ ( tipoUsuario === 'CLIENTE' ? 'd-none' : '' ) } " onclick="editaProducto('${element._id}') " data-bs-toggle="modal" data-bs-target="#exampleModal" >Editar</button>
                            <button type="button" class="btn btn-danger btn-sm ${ ( tipoUsuario === 'CLIENTE' ? 'd-none' : '' ) }" onclick="eliminaProducto('${element._id}') " >Eliminar</button>                            
                        </div>
                    </div>
                </div>
            </div>`;
        });
    });
}

const editaProducto = (idProducto) => {    
    fetch(`http://localhost:8080/api/productos/${idProducto}`)
    .then(res => res.json())
    .then(producto => {          
        document.querySelector('#id').value = producto[0]._id;
        document.querySelector('#nombre').value = producto[0].nombre;
        document.querySelector('#sku').value = producto[0].sku;
        document.querySelector('#descripcion').value = producto[0].descripcion;
        document.querySelector('#precio').value = producto[0].precio;
        document.querySelector('#urlImage').value = producto[0].urlImage;           
    });
}

const eliminaProducto = ( idProducto ) => {

    fetch(`http://localhost:8080/api/productos/${ idProducto }`, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => {
        
        alerta.classList.remove("d-none");

        if(data.ok){            
            alerta.innerHTML = `${ data.ok }`;
            cargaProductos();
        }else{
            alerta.innerHTML = `Error: ${ data.descripcion }`;
        }
        
    });
}


const agregarAlCarro = ( idProducto ) => {
    fetch(`http://localhost:8080/api/productos/${ idProducto }`)
    .then(res => res.json())
    .then(producto => {
        creaCarro( producto );
    });
}

const creaCarro = ( producto ) => { 
    
    //si no hay un carrito creado lo creo
    if(idCarrito.innerHTML.length === 0){
        fetch(`http://localhost:8080/api/carrito/`,
        {   
            headers:{'content-type' : 'application/json'},
            method:  'POST',
            body : JSON.stringify(producto)
        })
        .then(resp => resp.json())
        .then(data => {
            idCarrito.innerHTML = `${ data }`;
            cantidadCarrito.innerHTML = "1";
            alerta.classList.remove("d-none");
            alerta.innerHTML = "Producto agregado";
        })
    }else{
        //de lo contrario agrego mas productos              
        fetch('http://localhost:8080/api/carrito/'+ idCarrito.innerHTML  +'/productos/',
        {   
            headers:{'content-type' : 'application/json'},
            method:  'POST',
            body : JSON.stringify(producto)
        })
        .then(resp => resp.json())
        .then(data => {            
            alerta.classList.remove("d-none");
            alerta.innerHTML = `${ data.ok }`;
            cantidadCarrito.innerHTML =  parseInt(cantidadCarrito.innerHTML) + 1;
            
        }).catch(function(error) {
            console.log('Hubo un problema :' + error.message);
        });
    }

    setTimeout(() => { 
        alerta.classList.add("d-none");
    }, 2000);

}

const cargaProductosCarro = () => {
    tablaProductosCarro.innerHTML = ``;

    if(idCarrito.innerHTML.length > 0){
        fetch('http://localhost:8080/api/carrito/'+ idCarrito.innerHTML +'/productos/')
        .then(res => res.json())
        .then(data => {
            if(data){
                data.forEach(producto => {
                    tablaProductosCarro.innerHTML += 
                    `<tr>
                        <th scope="row">1</th>
                        <td>${ producto.sku }</td>
                        <td>${ producto.nombre }</td>
                        <td class="text-center">1</td>
                        <td class="text-end">$ ${ producto.precio }</td>
                        <td class="text-end">$ ${ producto.precio }</td>
                        <td class="text-center"><button type="button" class="btn btn-sm btn-danger" onclick="quitarProductoCarro( ${ producto.id } )"> X </button></td>
                    </tr>`;
                });
            }else{
                tablaProductosCarro.innerHTML += `<tr>
                    <th scope="row" colspan="7" class="text-center">SIN PRODUCTOS</th>
                </tr>`;
            }
        });
    }else{
        tablaProductosCarro.innerHTML += `<tr>
            <th scope="row" colspan="7" class="text-center">SIN PRODUCTOS</th>
        </tr>`;
    }
}

const quitarProductoCarro = ( idProducto ) => {
    fetch(`http://localhost:8080/api/carrito/`+ idCarrito.innerHTML +`/productos/${ idProducto }`, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => { 

        if(data.ok){            
            alerta.innerHTML = `${ data.ok }`;
            cargaProductosCarro();
        }else{
            alerta.innerHTML = `Error: ${ data.descripcion }`;
        }
        
    });
}

const eliminaCarrito = ( ) => {
    fetch(`http://localhost:8080/api/carrito/`+ idCarrito.innerHTML, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => {
        
        alerta.classList.remove("d-none");

        if(data.ok){            
            idCarrito.innerHTML = ``;
            cantidadCarrito.innerHTML = "0";
            tablaProductosCarro.innerHTML = ``;
            alerta.innerHTML = `${ data.ok }`;

            tablaProductosCarro.innerHTML += `<tr>
                <th scope="row" colspan="7" class="text-center">SIN PRODUCTOS</th>
            </tr>`;

            setTimeout(() => { 
                alerta.classList.add("d-none");
            }, 2000);
            
        }else{
            alerta.innerHTML = `Error: ${ data.descripcion }`;
        }
        
    });
}

//guardo productos
const creaProducto = document.getElementById("btnGuardaProducto");
creaProducto.addEventListener("click", () => {

    const id = document.querySelector('#id').value;
    const nombre = document.querySelector('#nombre').value;
    const sku = document.querySelector('#sku').value;
    const descripcion = document.querySelector('#descripcion').value;
    const precio = document.querySelector('#precio').value;
    const urlImage = document.querySelector('#urlImage').value;

    const nuevoProducto = {
        id,
        nombre,
        sku,
        descripcion,
        precio,
        urlImage
    };    

    let url = ( parseInt(id) > 0 ? id : "" );
    let metodo = ( parseInt(id) == 0 ? 'POST' : 'PUT' );
    fetch(`http://localhost:8080/api/productos/${ url }`,
    {   
        headers:{'content-type' : 'application/json'},
        method:  metodo,
        body : JSON.stringify(nuevoProducto)
    })
    .then(resp => resp.json())
    .then(data => {
        document.querySelector('#id').value = '0';
        document.querySelector('#nombre').value = '';
        document.querySelector('#sku').value = '';
        document.querySelector('#descripcion').value = '';
        document.querySelector('#precio').value = '';
        document.querySelector('#urlImage').value = '';
        

        alerta.classList.remove("d-none");
        if(data.ok){
            alerta.innerHTML = `${ data.ok }`;
            cargaProductos();            
        }
        else{
            alerta.innerHTML = `${ data.error }`;
        }
    })

});

cargaProductos();