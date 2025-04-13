document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'index.html';
        return;
    }

    // Manejar cierre de sesión
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            window.location.href = 'index.html';
        });
    }

    // Manejadores para los botones de servicio
    document.querySelectorAll('.service-types .btn').forEach(button => {
        button.addEventListener('click', function() {
            crearRecado(button.dataset.tipo);
        });
    });

    actualizarEstadoRecados();
});

function actualizarEstadoRecados() {
    const recadosCounter = document.querySelector('.gradient-purple h3');
    const mapSection = document.getElementById('map');
    
    if (localStorage.getItem('recadoEnCurso')) {
        recadosCounter.textContent = '1';
        mapSection.innerHTML = `
            <div class="active-recado p-4" onclick="verRecadoActivo()">
                <h5><i class="bi bi-clock-history text-primary"></i> Recado Activo</h5>
                <p class="mb-0">Click para ver detalles</p>
            </div>
        `;
    } else {
        recadosCounter.textContent = '0';
        mapSection.innerHTML = `
            <div class="text-center py-5 text-muted">
                <i class="bi bi-map" style="font-size: 48px;"></i>
                <p class="mt-3">No hay recados activos para mostrar</p>
            </div>
        `;
    }
}

function crearRecado(tipo) {
    localStorage.setItem('recadoEnCurso', 'true');
    localStorage.setItem('tipoRecado', tipo);
    window.location.href = 'nuevo-recado.html';
}

function aceptarGestor() {
    const profileOverlay = document.getElementById('profileOverlay');
    profileOverlay.style.display = 'none';
    window.location.href = 'nuevo-recado.html';
}

function buscarOtroGestor() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    const profileOverlay = document.getElementById('profileOverlay');
    
    profileOverlay.style.display = 'none';
    loadingOverlay.style.display = 'flex';
    
    setTimeout(() => {
        loadingOverlay.style.display = 'none';
        profileOverlay.style.display = 'flex';
    }, 2000);
}

function verRecadoActivo() {
    if (localStorage.getItem('recadoEnCurso')) {
        window.location.href = 'tracking.html';
    }
}

function abrirChat() {
    document.getElementById('chatModal').style.display = 'block';
}

function cerrarChat() {
    document.getElementById('chatModal').style.display = 'none';
}

function seleccionarOpcion(opcion) {
    let mensaje = '';
    switch(opcion) {
        case 'info':
            mensaje = 'Un agente te ayudará con información general';
            break;
        case 'ayuda':
            mensaje = 'Te conectaremos con soporte para tu recado';
            break;
        case 'soporte':
            mensaje = 'Un técnico te atenderá en breve';
            break;
        case 'reclamo':
            mensaje = 'Tu reclamo será atendido por un supervisor';
            break;
    }
    alert(mensaje);
    cerrarChat();
}
