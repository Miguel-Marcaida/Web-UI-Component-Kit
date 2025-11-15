/* ==================================================== */
/* MÓDULO AUTÓNOMO: 17.03 (Estados y Propiedades ARIA)    */
/* Lógica para manejar aria-expanded y aria-controls      */
/* ==================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // Obtener todos los botones que actúan como encabezados de acordeón
    const accordionControls = document.querySelectorAll('.accordion-header');

    const toggleAccordion = (event) => {
        const button = event.currentTarget;
        
        // 1. Obtener el estado actual de expansión (true o false como string)
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        // 2. Obtener el ID del panel de contenido que debe controlar
        const targetId = button.getAttribute('aria-controls');
        const targetPanel = document.getElementById(targetId);

        if (!targetPanel) return;

        // 3. Cambiar el estado de ARIA
        button.setAttribute('aria-expanded', String(!isExpanded));
        
        // 4. Cambiar el estado visual y de accesibilidad del contenido
        if (isExpanded) {
            // Si estaba expandido, ahora se oculta (colapsa)
            targetPanel.setAttribute('hidden', ''); 
            targetPanel.style.height = '0'; // Cierra con transición CSS
        } else {
            // Si estaba colapsado, ahora se muestra (expande)
            targetPanel.removeAttribute('hidden');
            // Ajuste de altura para forzar la transición CSS (ajustar scrollHeight)
            targetPanel.style.height = `${targetPanel.scrollHeight}px`; 
        }
    };

    // Asignar el listener a todos los controles
    accordionControls.forEach(control => {
        control.addEventListener('click', toggleAccordion);
    });

    // Nota: El botón aria-disabled="true" (#disabled-button) no requiere JS 
    // en este módulo, ya que el estado es estático para la demostración.
});