const botonesEliminar = document.querySelectorAll ('.eliminar-btn');

botonesEliminar.forEach(boton =>{
    boton.addEventListener('click', function() {
        const fila = boton.closest('tr');
        fila.remove();
    });
});