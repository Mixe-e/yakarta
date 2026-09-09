document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('formLogin');


    if (localStorage.getItem('registroExitoso') === 'true') {
        mostrarMensajeExito("¡Tu cuenta se ha creado con éxito! Ya puedes iniciar sesión.");
        localStorage.removeItem('registroExitoso'); 
    }

    if (formLogin) {
        formLogin.addEventListener('submit', autenticarUsuario);
    }
});

function autenticarUsuario(e) {
    e.preventDefault();

    const emailInput = document.getElementById('email').value.trim().toLowerCase();
    const passwordInput = document.getElementById('password').value;


    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];


    const adminDefault = {
        nombre: "Cristian Orlando",
        email: "admin@tienda.com",
        password: "123",
        rol: "Administrador"
    };

    let usuarioEncontrado = usuarios.find(u => u.email === emailInput && u.password === passwordInput);


    if (!usuarioEncontrado && emailInput === adminDefault.email && passwordInput === adminDefault.password) {
        usuarioEncontrado = adminDefault;
    }

    if (usuarioEncontrado) {

        localStorage.setItem('usuarioLogueado', JSON.stringify({
            nombre: usuarioEncontrado.nombre,
            email: usuarioEncontrado.email,
            rol: usuarioEncontrado.rol
        }));

        window.location.href = "index.html";
    } else {
        mostrarMensajeError("Correo o contraseña incorrectos.");
    }
}

function mostrarMensajeExito(mensaje) {
    const alertContainer = document.getElementById('alertError');
    if (alertContainer) {
        alertContainer.className = "alert alert-success py-2";
        alertContainer.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i>${mensaje}`;
        alertContainer.classList.remove('d-none');
    }
}

function mostrarMensajeError(mensaje) {
    const alertContainer = document.getElementById('alertError');
    if (alertContainer) {
        alertContainer.className = "alert alert-danger py-2";
        alertContainer.innerHTML = `<i class="bi bi-exclamation-triangle-fill me-2"></i>${mensaje}`;
        alertContainer.classList.remove('d-none');
    }
}