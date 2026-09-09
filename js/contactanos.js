  const formulario = document.getElementById('formulario');

  formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('gmail').value;
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;

    alert(`¡Información enviada correctamente!\n\nDatos registrados:\n- Nombre: ${nombre}\n- Correo: ${email}\n- Telefono: ${telefono}`);

    formulario.reset();
  });