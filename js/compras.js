        document.addEventListener('DOMContentLoaded', cargarHistorialCompras);

function cargarHistorialCompras() {
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    const contenedor = document.getElementById('contenedorCompras');


    if (!usuarioLogueado) {
        window.location.href = 'logeo.html';
        return;
    }


    const historialGlobal = JSON.parse(localStorage.getItem('historialCompras')) || [];


    const idUsuario = usuarioLogueado.email || usuarioLogueado.nombre;
    const misCompras = historialGlobal.filter(c => c.usuarioEmail === idUsuario || !c.usuarioEmail);


    if (misCompras.length === 0) {
        contenedor.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-bag-x display-1 text-secondary"></i>
                <h4 class="mt-3">Aún no has realizado ninguna compra</h4>
                <p class="text-secondary">Explora nuestro catálogo y agrega tus juegos favoritos al carrito.</p>
                <a href="tienda.html" class="btn btn-primary mt-2">Ir a la Tienda</a>
            </div>
        `;
        return;
    }

    contenedor.innerHTML = '';
    misCompras.forEach((compra, index) => {
        contenedor.innerHTML += `
            <div class="col-12">
                <div class="card card-compra p-3 rounded-3 mb-3" style="background-color: #1e1e1e; border: 1px solid #333;">
                    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2">
                        <div>
                            <span class="badge bg-info text-dark me-2">${compra.id}</span>
                            <span class="text-secondary small"><i class="bi bi-calendar3 me-1"></i>${compra.fecha}</span>
                        </div>
                        <div>
                            <span class="badge bg-success me-3">${compra.estado}</span>
                            <strong class="text-warning fs-5">$ ${compra.total.toLocaleString('es-CL')} CLP</strong>
                        </div>
                    </div>
                    <hr class="border-secondary my-2">
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="small text-secondary">${compra.productos.length} producto(s) en este pedido</span>
                        <button class="btn btn-outline-info btn-sm" onclick="verDetalleCompra(${index})">
                            <i class="bi bi-eye me-1"></i> Ver Detalle
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}






        function verDetalleCompra(index) {
            const historial = JSON.parse(localStorage.getItem('historialCompras')) || [];
            const compra = historial[index];

            if (!compra) return;

            document.getElementById('modalDetalleCodigo').textContent = `Detalle del Pedido: ${compra.id}`;
            
            let tablaHtml = `
                <p><strong>Fecha:</strong> ${compra.fecha}</p>
                <p><strong>Estado:</strong> <span class="badge bg-success">${compra.estado}</span></p>
                <div class="table-responsive">
                    <table class="table table-dark table-striped align-middle mt-3">
                        <thead>
                            <tr>
                                <th>Juego</th>
                                <th class="text-center">Cant.</th>
                                <th class="text-end">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            compra.productos.forEach(p => {
                tablaHtml += `
                    <tr>
                        <td>${p.nombre}</td>
                        <td class="text-center">${p.cantidad}</td>
                        <td class="text-end">$ ${(p.precio * p.cantidad).toLocaleString('es-CL')} CLP</td>
                    </tr>
                `;
            });

            tablaHtml += `
                        </tbody>
                    </table>
                </div>
                <div class="text-end mt-3">
                    <h5 class="fw-bold">Total: <span class="text-warning">$ ${compra.total.toLocaleString('es-CL')} CLP</span></h5>
                </div>
            `;

            document.getElementById('modalDetalleContenido').innerHTML = tablaHtml;
            const modal = new bootstrap.Modal(document.getElementById('modalDetalleCompra'));
            modal.show();
        }