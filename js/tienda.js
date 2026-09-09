document.addEventListener('DOMContentLoaded', cargarProductosTienda);

                function cargarProductosTienda() {

                    const productosDefecto = [
                        { id: 1, nombre: "Midnight Club Los Angeles", precio: 15000, imagen: "imgtienda/Midnight_Club-Los_Angeles.jpg" },
                        { id: 2, nombre: "FIFA Street 2", precio: 10000, imagen: "imgtienda/fifastreet.jpg" },
                        { id: 3, nombre: "BLACK", precio: 5000, imagen: "imgtienda/black.jpg" }
                    ];
                    

                    let productos = JSON.parse(localStorage.getItem('productosTienda'));


                    if (!productos || productos.length === 0) {
                        productos = productosDefecto;
                        localStorage.setItem('productosTienda', JSON.stringify(productos));
                    }

                    const contenedor = document.getElementById('contenedorProductos');
                    contenedor.innerHTML = '';
                    
                    }

                    function agregarAlCarrito(nombre, precio, imagen) {
                        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                        let juegoExistente = carrito.find(producto => producto.nombre === nombre);
                        if (juegoExistente) {
                            juegoExistente.cantidad += 1;
                        } else {
                            carrito.push({
                                nombre: nombre,
                                precio: precio,
                                imagen: imagen,
                                cantidad: 1
                            });
                        }
                        localStorage.setItem('carrito', JSON.stringify(carrito));
                        alert(`${nombre} se agrego exitosamente al carrito`);
                    }