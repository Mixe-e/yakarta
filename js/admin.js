let productos = JSON.parse(localStorage.getItem('productosTienda')) || [
    { nombre: "Midnight club", precio: 15000, imagen: "imgtienda/Midnight_Club-Los_Angeles.jpg" },
    { nombre: "Fifa street 2", precio: 10000, imagen: "imgtienda/fifastreet.jpg" },
    { nombre: "Black", precio: 5000, imagen: "imgtienda/black.jpg" }
];

let usuarios = JSON.parse(localStorage.getItem('usuariosAdmin')) || [
    { nombre: "Cristian Orlando", email: "cristian@admin.com", rol: "Administrador" },
    { nombre: "Juan Pérez", email: "juan@gmail.com", rol: "Cliente" },
    { nombre: "Mixin", email: "mixin@admin.com", rol: "Administrador" }
];

let modalProductoBS;
let modalUsuarioBS;

document.addEventListener('DOMContentLoaded', () => {

    modalProductoBS = new bootstrap.Modal(document.getElementById('modalProducto'));
    modalUsuarioBS = new bootstrap.Modal(document.getElementById('modalUsuario'));

    guardarYRenderizarProductos();
    guardarYRenderizarUsuarios();
});


function guardarYRenderizarProductos() {
    localStorage.setItem('productosTienda', JSON.stringify(productos));
    const tabla = document.getElementById('tablaProductos');
    if (!tabla) return;
    
    tabla.innerHTML = '';

    productos.forEach((p, index) => {
        tabla.innerHTML += `
            <tr>
                <td><img src="${p.imagen}" style="width: 40px; height: 50px; object-fit: cover;" class="rounded"></td>
                <td>${p.nombre}</td>
                <td>$ ${p.precio.toLocaleString('es-CL')} CLP</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-warning me-1" onclick="editarProducto(${index})"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto(${index})"><i class="bi bi-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

function prepararCrearProducto() {
    document.getElementById('tituloModalProducto').textContent = 'Nuevo Producto';
    document.getElementById('prodIndex').value = '';
    document.getElementById('formProducto').reset();
}

function editarProducto(index) {
    document.getElementById('tituloModalProducto').textContent = 'Editar Producto';
    document.getElementById('prodIndex').value = index;
    document.getElementById('prodNombre').value = productos[index].nombre;
    document.getElementById('prodPrecio').value = productos[index].precio;
    document.getElementById('prodImagen').value = productos[index].imagen;
    modalProductoBS.show();
}

document.getElementById('formProducto')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const idx = document.getElementById('prodIndex').value;
    const nuevo = {
        nombre: document.getElementById('prodNombre').value,
        precio: Number(document.getElementById('prodPrecio').value),
        imagen: document.getElementById('prodImagen').value
    };

    if (idx === '') {
        productos.push(nuevo);
    } else {
        productos[idx] = nuevo;
    }

    guardarYRenderizarProductos();
    modalProductoBS.hide();
});

function eliminarProducto(index) {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
        productos.splice(index, 1);
        guardarYRenderizarProductos();
    }
}


function guardarYRenderizarUsuarios() {
    localStorage.setItem('usuariosAdmin', JSON.stringify(usuarios));
    const tabla = document.getElementById('tablaUsuarios');
    if (!tabla) return;

    tabla.innerHTML = '';

    usuarios.forEach((u, index) => {
        tabla.innerHTML += `
            <tr>
                <td>${u.nombre}</td>
                <td>${u.email}</td>
                <td><span class="badge ${u.rol === 'Administrador' ? 'bg-danger' : 'bg-info'}">${u.rol}</span></td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-warning me-1" onclick="editarUsuario(${index})"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarUsuario(${index})"><i class="bi bi-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

function prepararCrearUsuario() {
    document.getElementById('tituloModalUsuario').textContent = 'Nuevo Usuario';
    document.getElementById('userIndex').value = '';
    document.getElementById('formUsuario').reset();
}

function editarUsuario(index) {
    document.getElementById('tituloModalUsuario').textContent = 'Editar Usuario';
    document.getElementById('userIndex').value = index;
    document.getElementById('userNombre').value = usuarios[index].nombre;
    document.getElementById('userEmail').value = usuarios[index].email;
    document.getElementById('userRol').value = usuarios[index].rol;
    modalUsuarioBS.show();
}

document.getElementById('formUsuario')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const idx = document.getElementById('userIndex').value;
    const nuevo = {
        nombre: document.getElementById('userNombre').value,
        email: document.getElementById('userEmail').value,
        rol: document.getElementById('userRol').value
    };

    if (idx === '') {
        usuarios.push(nuevo);
    } else {
        usuarios[idx] = nuevo;
    }

    guardarYRenderizarUsuarios();
    modalUsuarioBS.hide();
});

function eliminarUsuario(index) {
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
        usuarios.splice(index, 1);
        guardarYRenderizarUsuarios();
    }
}