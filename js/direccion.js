 document.getElementById('formDireccion').addEventListener('submit', function(e) {
            e.preventDefault();


            const datosEnvio = {
                nombre: document.getElementById('nombre').value.trim(),
                direccion: document.getElementById('direccion').value.trim(),
                comuna: document.getElementById('comuna').value.trim(),
                telefono: document.getElementById('telefono').value.trim()
            };


            localStorage.setItem('datosEnvio', JSON.stringify(datosEnvio));


            window.location.href = 'resumen.html';
        });