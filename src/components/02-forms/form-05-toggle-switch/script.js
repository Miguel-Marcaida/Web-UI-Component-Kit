// src/components/02-forms/form-05-toggle-switch/script.js

document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los inputs de tipo checkbox dentro del componente de control
    // NOTA: Se usa el selector '.toggle-control input' para apuntar al checkbox.
    const toggleSwitches = document.querySelectorAll('.toggle-control input[type="checkbox"]');

    toggleSwitches.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // Esta función es el punto de extensión autónomo para lógica JS adicional
            console.log(`Switch ID: ${checkbox.id || 'N/A'} - Estado: ${checkbox.checked ? 'Activado' : 'Desactivado'}`);
        });
    });
});