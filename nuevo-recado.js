document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('recadoEnCurso')) {
        window.location.href = 'dashboard.html';
        return;
    }
    
    const recadoForm = document.getElementById('recadoForm');
    
    recadoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        localStorage.setItem('recadoEnCurso', 'true');
        window.location.href = 'buscar-recador.html';
    });

    const tipo = new URLSearchParams(window.location.search).get('tipo');
    const tipoRecadoElement = document.getElementById('tipoRecado');
    const camposEspecificos = document.getElementById('camposEspecificos');

    // Configurar campos específicos según el tipo de recado
    const camposPorTipo = {
        fila: `
            <div class="mb-3">
                <label class="form-label">Lugar en la Fila</label>
                <input type="text" class="form-control" placeholder="Nombre del establecimiento">
            </div>
            <div class="mb-3">
                <label class="form-label">Tiempo Estimado</label>
                <input type="number" class="form-control" placeholder="Tiempo en minutos">
            </div>
        `,
        paquete: `
            <div class="mb-3">
                <label class="form-label">Número de Seguimiento</label>
                <input type="text" class="form-control" placeholder="Número de tracking">
            </div>
            <div class="mb-3">
                <label class="form-label">Empresa de Envío</label>
                <input type="text" class="form-control" placeholder="Nombre de la empresa">
            </div>
        `,
        compras: `
            <div class="mb-3">
                <label class="form-label">Lista de Productos</label>
                <textarea class="form-control" rows="4" placeholder="Lista detallada de productos"></textarea>
            </div>
            <div class="mb-3">
                <label class="form-label">Establecimiento</label>
                <input type="text" class="form-control" placeholder="Nombre del establecimiento">
            </div>
        `,
        tramites: `
            <div class="mb-3">
                <label class="form-label">Tipo de Trámite</label>
                <input type="text" class="form-control" placeholder="Descripción del trámite">
            </div>
            <div class="mb-3">
                <label class="form-label">Documentos Necesarios</label>
                <textarea class="form-control" rows="3" placeholder="Lista de documentos requeridos"></textarea>
            </div>
        `
    };

    // Actualizar título y campos según el tipo
    if (tipo && camposPorTipo[tipo]) {
        tipoRecadoElement.textContent = `Nuevo Recado - ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`;
        camposEspecificos.innerHTML = camposPorTipo[tipo];
    }

    // Manejar envío del formulario
    document.getElementById('recadoForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Aquí iría la lógica para procesar el recado
        alert('Recado creado exitosamente');
        window.location.href = 'dashboard.html';
    });

    // Actualizar resumen en tiempo real
    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', actualizarResumen);
    });

    function actualizarResumen() {
        const ubicacion = document.getElementById('ubicacion').value;
        const fechaHora = document.getElementById('fechaHora').value;
        const presupuesto = document.getElementById('presupuesto').value;
        const detalles = document.querySelector('textarea').value;

        // Actualizar elementos del resumen
        document.getElementById('resumen-ubicacion').textContent = ubicacion || 'Sin especificar';
        document.getElementById('resumen-fecha').textContent = fechaHora ? new Date(fechaHora).toLocaleString() : 'Sin especificar';
        document.getElementById('resumen-presupuesto').textContent = presupuesto ? `$${presupuesto}` : '$0.00';
        document.getElementById('resumen-detalles').textContent = detalles || 'Sin especificar';
        
        // Actualizar total (aquí puedes agregar lógica para costos adicionales)
        const total = parseFloat(presupuesto || 0);
        document.getElementById('resumen-total').textContent = `$${total.toFixed(2)}`;

        // Actualizar método de pago en el resumen
        const metodoPago = document.querySelector('input[name="metodoPago"]:checked').value;
        const metodoPagoTexto = {
            'efectivo': 'Efectivo',
            'tarjeta': 'Tarjeta',
            'neki': 'Neki'
        };
        document.getElementById('resumen-pago').textContent = metodoPagoTexto[metodoPago];
    }

    // Agregar listener para cambios en método de pago
    document.querySelectorAll('input[name="metodoPago"]').forEach(input => {
        input.addEventListener('change', actualizarResumen);
    });

    // Manejar cambios en método de pago
    document.querySelectorAll('input[name="metodoPago"]').forEach(input => {
        input.addEventListener('change', (e) => {
            document.getElementById('tarjetaDetalles').style.display = 'none';
            document.getElementById('nequiDetalles').style.display = 'none';
            
            if (e.target.value === 'tarjeta') {
                document.getElementById('tarjetaDetalles').style.display = 'block';
            } else if (e.target.value === 'nequi') {
                document.getElementById('nequiDetalles').style.display = 'block';
            }
            actualizarResumen();
        });
    });

    // Formatear número de tarjeta
    document.getElementById('cardNumber').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
        document.getElementById('cardNumberPreview').textContent = formattedValue || '**** **** **** ****';
    });

    document.getElementById('cardHolder').addEventListener('input', function(e) {
        document.getElementById('cardHolderPreview').textContent = 
            e.target.value.toUpperCase() || 'NOMBRE DEL TITULAR';
    });

    document.getElementById('cardExpiry').addEventListener('input', function(e) {
        document.getElementById('cardExpiryPreview').textContent = 
            e.target.value || 'MM/YY';
    });

    // Formatear fecha de expiración
    document.getElementById('cardExpiry').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0,2) + '/' + value.slice(2);
        }
        e.target.value = value;
    });

    // Inicializar resumen
    actualizarResumen();
});
