document.addEventListener('DOMContentLoaded', () => {
    cargarDatosResumen();
});

function cargarDatosResumen() {

    const direccionData = JSON.parse(localStorage.getItem('direccionDespacho'));
    const contenedorDireccion = document.getElementById('contenedorDireccion');

    if (contenedorDireccion) {
        if (direccionData) {
            contenedorDireccion.innerHTML = `
                <p class="mb-1"><strong>Nombre:</strong> ${direccionData.nombre || 'No especificado'}</p>
                <p class="mb-1"><strong>Dirección:</strong> ${direccionData.calle || ''} ${direccionData.numero || ''}</p>
                <p class="mb-1"><strong>Comuna/Ciudad:</strong> ${direccionData.comuna || ''}, ${direccionData.ciudad || ''}</p>
                <p class="mb-0"><strong>Teléfono:</strong> ${direccionData.telefono || 'No especificado'}</p>
            `;
        } else {
            contenedorDireccion.innerHTML = `<p class="text-warning mb-0">No se ha registrado una dirección de despacho.</p>`;
        }
    }

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const listaResumen = document.getElementById('listaResumen');
    const totalFinal = document.getElementById('totalFinal');

    if (listaResumen) {
        if (carrito.length === 0) {
            listaResumen.innerHTML = `<li class="list-group-item bg-dark text-white text-center">El carrito está vacío.</li>`;
            if (totalFinal) totalFinal.textContent = '$ 0 CLP';
            return;
        }

        listaResumen.innerHTML = '';
        let acumulado = 0;

        carrito.forEach(item => {
            const subtotal = item.precio * item.cantidad;
            acumulado += subtotal;

            listaResumen.innerHTML += `
                <li class="list-group-item bg-dark text-white d-flex justify-content-between align-items-center border-secondary">
                    <div>
                        <h6 class="mb-0 fw-bold">${item.nombre}</h6>
                        <small class="text-secondary">Cantidad: ${item.cantidad} x $ ${item.precio.toLocaleString('es-CL')} CLP</small>
                    </div>
                    <span class="text-warning fw-bold">$ ${subtotal.toLocaleString('es-CL')} CLP</span>
                </li>
            `;
        });

        if (totalFinal) {
            totalFinal.textContent = `$ ${acumulado.toLocaleString('es-CL')} CLP`;
        }
    }
}

function finalizarCompra() {

    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (!usuarioLogueado) {
        alert("Debes iniciar sesión para confirmar la compra.");
        window.location.href = "logeo.html";
        return;
    }


    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de pagar.");
        window.location.href = "tienda.html";
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
    localStorage.removeItem('direccionDespacho');

    alert("¡Pago exitoso! Tu compra ha sido confirmada.");
    window.location.href = "compras.html";
}