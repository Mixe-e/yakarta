        document.addEventListener('DOMContentLoaded', cargarCarrito);


        function irADireccion() {
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            if (carrito.length === 0) {
                alert("Tu carrito está vacío. Agrega al menos un producto para proceder al pago.");
            } else {
                window.location.href = 'direccion.html';
            }
        }

        function cargarCarrito() {
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            let listaContainer = document.getElementById('listaCarrito');
            let totalContainer = document.getElementById('totalPagar');

            listaContainer.innerHTML = '';
            let total = 0;

            if (carrito.length === 0) {
                listaContainer.innerHTML = '<li class="list-group-item bg-dark text-white border-secondary">El carrito está vacío. </li>';
                totalContainer.textContent = '$ 0 CLP';
                return;
            }

            carrito.forEach((producto, index) => {
                let subtotal = producto.precio * producto.cantidad;
                total += subtotal;

                listaContainer.innerHTML += `
                    <li class="list-group-item bg-dark text-white border-secondary d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <img src="${producto.imagen}" style="width: 50px; height: 60px; object-fit: cover;" class="me-3 rounded">
                            <div>
                                <h6 class="mb-0">${producto.nombre}</h6>
                                <small class="text-muted">Cantidad: ${producto.cantidad} x $${producto.precio} CLP</small>
                            </div>
                        </div>
                        <div>
                            <span class="me-3 fw-bold">$ ${subtotal} CLP</span>
                            <button onclick="eliminarProducto(${index})" class="btn btn-danger btn-sm">X</button>
                        </div>
                    </li>
                `;
            });

            totalContainer.textContent = `$ ${total} CLP`;
        }

        function eliminarProducto(index) {
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            carrito.splice(index, 1); 
            localStorage.setItem('carrito', JSON.stringify(carrito));
            cargarCarrito(); 
        }

        function vaciarCarrito() {
            localStorage.removeItem('carrito');
            cargarCarrito(); 
        }



function finalizarCompra() {

    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (!usuarioLogueado) {
        alert("Debes iniciar sesión para completar la compra.");
        window.location.href = "logeo.html";
        return;
    }


    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    const totalCompra = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    const nuevaOrden = {
        id: "ORD-" + Math.floor(10000 + Math.random() * 90000),
        usuarioEmail: usuarioLogueado.email || usuarioLogueado.nombre, 
        fecha: new Date().toISOString().split('T')[0],
        total: totalCompra,
        estado: "Entregado",
        productos: carrito.map(item => ({
            nombre: item.nombre,
            precio: item.precio,
            cantidad: item.cantidad
        }))
    }; 

    let historialGlobal = JSON.parse(localStorage.getItem('historialCompras')) || [];
    historialGlobal.unshift(nuevaOrden);


    localStorage.setItem('historialCompras', JSON.stringify(historialGlobal));
    localStorage.removeItem('carrito');

    alert("¡Compra realizada con éxito!");
    window.location.href = "compras.html";
}