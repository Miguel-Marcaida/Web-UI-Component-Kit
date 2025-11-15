/* *********************************************************************************
 * 14.01: TOGGLE DE CONTENIDO - JAVASCRIPT AUTÓNOMO
 * NOTA: Este script no depende de librerías ni de main.js.
 * *********************************************************************************/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleccionar todos los botones que inician el colapso/acordeón
    const toggleHeaders = document.querySelectorAll('.toggle-header');

    toggleHeaders.forEach(header => {
        // Inicializar la altura correcta al cargar si el ítem está activo
        const item = header.closest('.toggle-item');
        const contentId = header.getAttribute('data-target');
        const content = document.querySelector(contentId);
        
        if (item.classList.contains('is-active')) {
            // Establecer la altura del contenido si está abierto al inicio
            content.style.maxHeight = content.scrollHeight + 'px';
        }

        // 2. Añadir el evento click al header
        header.addEventListener('click', () => {
            const group = header.closest('.toggle-group');
            const isAccordionMode = group.getAttribute('data-mode') === 'accordion';
            const isActive = item.classList.contains('is-active');

            // 3. Determinar acción (abrir o cerrar)
            if (isActive) {
                // Cerrar el ítem
                item.classList.remove('is-active');
                header.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = '0';
            } else {
                // 4. Modo Acordeón: Cerrar todos los demás ítems activos del grupo
                if (isAccordionMode) {
                    group.querySelectorAll('.toggle-item.is-active').forEach(activeItem => {
                        if (activeItem !== item) {
                            activeItem.classList.remove('is-active');
                            const activeHeader = activeItem.querySelector('.toggle-header');
                            const activeContent = activeItem.querySelector('.toggle-content');
                            
                            activeHeader.setAttribute('aria-expanded', 'false');
                            activeContent.style.maxHeight = '0';
                        }
                    });
                }

                // 5. Abrir el ítem actual
                item.classList.add('is-active');
                header.setAttribute('aria-expanded', 'true');
                // Usamos scrollHeight para obtener la altura dinámica del contenido
                content.style.maxHeight = content.scrollHeight + 'px'; 
            }
        });
    });
});