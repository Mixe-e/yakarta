document.addEventListener('DOMContentLoaded', () => {
    const formDireccion = document.getElementById('formDireccion') || document.querySelector('form');

    if (formDireccion) {
        formDireccion.addEventListener('submit', guardarDireccion);
    }
});

function guardarDireccion(e) {
    e.preventDefault();


    const direccionData = {
        nombre: document.getElementById('nombre') ? document.getElementById('nombre').value : '',
        calle: document.getElementById('calle') ? document.getElementById('calle').value : '',
        numero: document.getElementById('numero') ? document.getElementById('numero').value : '',
        comuna: document.getElementById('comuna') ? document.getElementById('comuna').value : '',
        ciudad: document.getElementById('ciudad') ? document.getElementById('ciudad').value : '',
        telefono: document.getElementById('telefono') ? document.getElementById('telefono').value : ''
    };

    localStorage.setItem('direccionDespacho', JSON.stringify(direccionData));


    window.location.href = 'resumen.html';
}