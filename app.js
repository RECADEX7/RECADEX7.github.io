// Cachear selectores DOM frecuentes
const domElements = {
    loginForm: document.getElementById('loginForm'),
    registerForm: document.getElementById('registerForm'),
    authBox: document.querySelector('.auth-box'),
};

// Debounce para optimizar eventos
const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
};

// Event delegation para mejor rendimiento
document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.matches('.btn')) {
        requestAnimationFrame(() => {
            // Manejar clicks de botones
        });
    }
}, { passive: true });

// Optimizar manejo de formularios
const handleSubmit = debounce((e) => {
    e.preventDefault();
    const form = e.target;
    
    // Usar Promise.all para requests paralelos
    Promise.all([
        validateForm(form),
        prepareFormData(form)
    ]).then(([isValid, data]) => {
        if (isValid) {
            submitForm(data);
        }
    }).catch(console.error);
}, 250);

// Event listeners optimizados
document.addEventListener('DOMContentLoaded', () => {
    const acceptTermsCheckbox = document.getElementById('acceptTerms');
    const confirmTermsButton = document.getElementById('confirmTerms');
    const termsModal = document.getElementById('termsModal');

    // Habilitar/deshabilitar botón según checkbox
    acceptTermsCheckbox.addEventListener('change', function() {
        confirmTermsButton.disabled = !this.checked;
    });

    // Manejar la confirmación de términos
    confirmTermsButton.addEventListener('click', function() {
        if (acceptTermsCheckbox.checked) {
            // Guardar en localStorage que el usuario aceptó los términos
            localStorage.setItem('termsAccepted', 'true');
            // Cerrar el modal
            bootstrap.Modal.getInstance(termsModal).hide();
            // Habilitar el formulario de registro
            document.querySelector('#registerForm button[type="submit"]').disabled = false;
        }
    });

    // Verificar si los términos ya fueron aceptados
    if (!localStorage.getItem('termsAccepted')) {
        document.querySelector('#registerForm button[type="submit"]').disabled = true;
    }

    if (domElements.loginForm) {
        domElements.loginForm.addEventListener('submit', handleSubmit, { passive: false });
    }
    
    if (domElements.registerForm) {
        domElements.registerForm.addEventListener('submit', handleSubmit, { passive: false });
    }

    // Verificar si ya está logueado
    if (localStorage.getItem('isLoggedIn') === 'true' && 
        !window.location.href.includes('dashboard.html')) {
        window.location.href = 'dashboard.html';
    }
});

// Función para autenticación con Google
function authenticateWithGoogle() {
    // Implementar autenticación con Google
    console.log('Autenticando con Google...');
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const userData = {
                name: document.getElementById('registerName').value,
                email: document.getElementById('registerEmail').value,
                password: document.getElementById('registerPassword').value
            };
            
            // Guardar datos del usuario
            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('isLoggedIn', 'true');
            
            // Redirigir al dashboard
            window.location.href = 'dashboard.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aceptar cualquier credencial o verificar las guardadas
            const savedUser = JSON.parse(localStorage.getItem('userData')) || {};
            
            if (savedUser.email === document.getElementById('loginEmail').value &&
                savedUser.password === document.getElementById('loginPassword').value) {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'dashboard.html';
            } else {
                // Si no coincide con el registro, permitir cualquier entrada
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'dashboard.html';
            }
        });
    }

    // Verificar si ya está logueado
    if (localStorage.getItem('isLoggedIn') === 'true' && 
        !window.location.href.includes('dashboard.html')) {
        window.location.href = 'dashboard.html';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Validar credenciales específicas
        if (email === 'jhonatan.feliz18@gmail.com' && password === 'jhonatan09') {
            // Guardar estado de login
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', 'Jhonatan');
            
            // Redirigir al dashboard
            window.location.href = 'dashboard.html';
        } else {
            alert('Correo o contraseña incorrectos. Por favor intente nuevamente.');
        }
    });

    // Verificar si ya está logueado
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'dashboard.html';
    }

    // Manejar el cierre de sesión
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', function() {
            localStorage.clear();
            window.location.href = 'index.html';
        });
    }
});
