document.addEventListener('DOMContentLoaded', verificarSesionNavbar);

function verificarSesionNavbar() {
    const authNavbar = document.getElementById('authNavbar');
    if (!authNavbar) return;

    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));

    if (usuarioLogueado) {

        let opcionesRol = '';

        if (usuarioLogueado.rol === 'Administrador') {
            opcionesRol = `
                <li>
                    <a class="dropdown-item text-warning fw-bold d-flex align-items-center gap-2" href="admin.html">
                        <i class="bi bi-shield-lock-fill"></i> Panel Admin
                    </a>
                </li>
            `;
        } else {

            opcionesRol = `
                <li>
                    <a class="dropdown-item text-info fw-bold d-flex align-items-center gap-2" href="compras.html">
                        <i class="bi bi-bag-check-fill"></i> Mis Compras Recientes
                    </a>
                </li>
            `;
        }

        authNavbar.innerHTML = `
            <div class="dropdown">
                <button class="btn btn-outline-light btn-navbar-custom d-flex align-items-center justify-content-center gap-2 dropdown-toggle" 
                        type="button" 
                        id="dropdownMenuUser" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false">
                    <i class="bi bi-person-circle"></i>
                    <span>${usuarioLogueado.nombre}</span>
                </button>
                <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow mt-2" aria-labelledby="dropdownMenuUser">
                    ${opcionesRol}
                    <li><hr class="dropdown-divider"></li>
                    <li>
                        <button class="dropdown-item text-danger fw-bold d-flex align-items-center gap-2" onclick="cerrarSesion()">
                            <i class="bi bi-box-arrow-right"></i> Cerrar Sesión
                        </button>
                    </li>
                </ul>
            </div>
        `;

        const btnDropdown = document.getElementById('dropdownMenuUser');
        if (btnDropdown) {
            btnDropdown.addEventListener('click', function (e) {
                e.preventDefault();
                const menu = this.nextElementSibling;
                menu.classList.toggle('show');
            });

            document.addEventListener('click', function (e) {
                if (!btnDropdown.contains(e.target)) {
                    const menu = btnDropdown.nextElementSibling;
                    if (menu) menu.classList.remove('show');
                }
            });
        }
    }
}

function cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    window.location.href = 'index.html';
}