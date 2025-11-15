/* ==================================================== */
/* MÓDULO AUTÓNOMO: 17.01 (ARIA Live Regions)            */
/* Lógica para actualizar el contenido de una región viva */
/* ==================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const statusMessageElement = document.getElementById('status-message');
    const updateButton = document.getElementById('update-status-btn');

    let counter = 0;

    // Función principal para incrementar y actualizar la región viva
    const updateStatus = () => {
        counter++;
        
        // 1. Actualizar el contenido visual (dentro del elemento aria-live)
        statusMessageElement.textContent = `Contador: ${counter}`;

        // NOTA: El lector de pantalla anunciará el cambio automáticamente 
        // porque el elemento #status-message tiene aria-live="polite".
        // No se requiere código ARIA adicional.

        console.log(`Contador actualizado a: ${counter}`);
    };

    // 2. Asignar el evento al botón
    if (updateButton) {
        updateButton.addEventListener('click', updateStatus);
    }
});