 document.addEventListener('DOMContentLoaded', function() {
            // Cargar Datos de Envío
            const datosEnvio = JSON.parse(localStorage.getItem('datosEnvio'));
            const contenedorDireccion = document.getElementById('contenedorDireccion');

            if (datosEnvio) {
                contenedorDireccion.innerHTML = `
                    <p class="mb-1"><strong>Nombre:</strong> ${datosEnvio.nombre}</p>
                    <p class="mb-1"><strong>Dirección:</strong> ${datosEnvio.direccion}, ${datosEnvio.comuna}</p>
                    <p class="mb-0"><strong>Teléfono:</strong> ${datosEnvio.telefono}</p>
                `;
            } else {
                contenedorDireccion.innerHTML = '<p class="text-danger">No se han ingresado datos de envío.</p>';
            }


            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            const listaResumen = document.getElementById('listaResumen');
            const totalFinal = document.getElementById('totalFinal');

            listaResumen.innerHTML = '';
            let total = 0;

            if (carrito.length === 0) {
                listaResumen.innerHTML = '<li class="list-group-item bg-secondary text-white">No hay productos en el carrito.</li>';
            } else {
                carrito.forEach(producto => {
                    let subtotal = producto.precio * producto.cantidad;
                    total += subtotal;

                    listaResumen.innerHTML += `
                        <li class="list-group-item bg-secondary text-white border-dark d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center">
                                <img src="${producto.imagen}" style="width: 40px; height: 50px; object-fit: cover;" class="me-3 rounded">
                                <div>
                                    <h6 class="mb-0">${producto.nombre}</h6>
                                    <small>Cantidad: ${producto.cantidad}</small>
                                </div>
                            </div>
                            <span class="fw-bold">$ ${subtotal} CLP</span>
                        </li>
                    `;
                });
            }

            totalFinal.textContent = `$ ${total} CLP`;
        });

        function finalizarCompra() {
            alert('Gracias por tu compra Tu pedido ha sido procesado con exito y se enviara en breve....');

            localStorage.removeItem('carrito');
            localStorage.removeItem('datosEnvio');
            window.location.href = 'index.html'; 
        }