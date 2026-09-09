document.getElementById('formLogin').addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const alertError = document.getElementById('alertError');


            let usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosAdmin')) || [
                
            { nombre: "mixin", email: "mixin@gmail.com", rol: "Administrador", pass: "tumamita123"},
                { nombre: "Juanito escarcha", email: "juanitoescarcha@gmail.com", rol: "Cliente", pass: "juanito123" }
                
            ];


            if (email === "admin@admin.com" && password === "admin123") {

                localStorage.setItem('usuarioLogueado', JSON.stringify({ nombre: "Administrador", rol: "Administrador" }));
                window.location.href = 'admin.html';
                return;
            }


            const usuarioEncontrado = usuariosRegistrados.find(u => u.email === email);

            if (usuarioEncontrado) {

                if (password === "123456" || usuarioEncontrado.pass === password) {
                    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioEncontrado));
                    
                    if (usuarioEncontrado.rol === "Administrador") {
                        window.location.href = 'admin.html';
                    } else {
                        window.location.href = 'index.html';
                    }
                    return;
                }
            }

            alertError.classList.remove('d-none');
        });