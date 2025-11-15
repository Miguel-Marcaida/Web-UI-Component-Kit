/* *********************************************************************************
 * 14.02: DROPDOWN / POPOVER - JAVASCRIPT AUTÓNOMO
 * NOTA: Este script gestiona el estado de apertura/cierre y el cierre automático al
 * hacer clic fuera, sin depender de main.js ni de librerías.
 * *********************************************************************************/

document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los botones que inician un dropdown o popover
    const popupToggles = document.querySelectorAll('.dropdown-toggle, .popover-toggle');

    // Función para cerrar un popup específico
    const closePopup = (toggle, content) => {
        content.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
    };

    // Función para abrir un popup específico
    const openPopup = (toggle, content) => {
        content.classList.add('is-active');
        toggle.setAttribute('aria-expanded', 'true');
    };

    // 1. Añadir el evento click a cada botón (Toggle)
    popupToggles.forEach(toggle => {
        toggle.addEventListener('click', (event) => {
            // Evitar que el clic se propague al documento inmediatamente
            event.stopPropagation(); 
            
            const contentId = toggle.getAttribute('data-target');
            const content = document.querySelector(contentId);

            // Cerrar todos los popups abiertos, excepto el actual si ya está activo
            popupToggles.forEach(otherToggle => {
                const otherContentId = otherToggle.getAttribute('data-target');
                const otherContent = document.querySelector(otherContentId);

                if (otherContent.classList.contains('is-active') && otherContent !== content) {
                    closePopup(otherToggle, otherContent);
                }
            });

            // Abrir o cerrar el popup actual
            if (content.classList.contains('is-active')) {
                closePopup(toggle, content);
            } else {
                openPopup(toggle, content);
            }
        });
    });

    // 2. Evento de cierre global (Cerrar si se hace clic fuera de cualquier popup)
    document.addEventListener('click', (event) => {
        // Buscar el popup activo
        const activeContent = document.querySelector('.dropdown-menu.is-active, .popover-content.is-active');

        if (activeContent) {
            const toggle = document.querySelector(`[data-target="#${activeContent.id}"]`);
            const parentGroup = activeContent.closest('.dropdown-group, .popover-group');
            
            // Si el clic no fue dentro del grupo (botón o contenido), entonces cerrar
            if (parentGroup && !parentGroup.contains(event.target)) {
                closePopup(toggle, activeContent);
            }
        }
    });
});