document.addEventListener('DOMContentLoaded', () => {
    const formRegistro = document.getElementById('formRegistro');

    if (formRegistro) {
        formRegistro.addEventListener('submit', registrarUsuario);
    }
});

function registrarUsuario(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;


    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden. Inténtalo de nuevo.");
        return;
    }


    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];


    const usuarioExiste = usuarios.some(u => u.email === email);
    if (usuarioExiste) {
        alert("Este correo electrónico ya está registrado. Intenta iniciar sesión.");
        return;
    }

    const nuevoUsuario = {
        nombre: nombre,
        email: email,
        password: password,
        rol: 'Cliente'
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));


    localStorage.setItem('registroExitoso', 'true');


    window.location.href = "logeo.html";
}