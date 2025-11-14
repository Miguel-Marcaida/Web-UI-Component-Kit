// * ----------------------------------------------------------------------------
// * COMPONENTE: Paginación 02 - Compacta (Dots/Carousel Style)
// * AUTONOMÍA ESTRICTA: Lógica de demostración de estados y navegación.
// * ----------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const paginationContainer = document.querySelector('.pagination-container');
    if (!paginationContainer) return;

    const paginationList = paginationContainer.querySelector('.pagination-list');
    
    // Obtener los botones de control (Anterior y Siguiente)
    const prevButton = paginationList.querySelector('.pagination-item:first-child .pagination-link');
    const nextButton = paginationList.querySelector('.pagination-item:last-child .pagination-link');
    
    // Obtener SOLO los elementos numéricos (Puntos)
    const pageItems = Array.from(paginationList.querySelectorAll('.pagination-item:not(:first-child):not(:last-child)'));

    // --- Función para gestionar el estado de los botones Anterior/Siguiente ---
    const updateControlStates = (activeLink) => {
        const activeText = activeLink.textContent.trim();
        
        // El límite de la demo son las páginas 1 y 3.
        
        // Lógica del botón Anterior
        if (activeText === '1') {
            prevButton.classList.add('is-disabled');
            prevButton.setAttribute('aria-disabled', 'true');
        } else {
            prevButton.classList.remove('is-disabled');
            prevButton.removeAttribute('aria-disabled');
        }

        // Lógica del botón Siguiente
        if (activeText === '3') {
            nextButton.classList.add('is-disabled');
            nextButton.setAttribute('aria-disabled', 'true');
        } else {
            nextButton.classList.remove('is-disabled');
            nextButton.removeAttribute('aria-disabled');
        }
    }

    // --- Función para activar un enlace (visual y ARIA) ---
    const activateLink = (newActiveLink) => {
        const oldActiveLink = paginationContainer.querySelector('.pagination-link.is-active');
        if (oldActiveLink) {
            oldActiveLink.classList.remove('is-active');
            oldActiveLink.removeAttribute('aria-current');
        }

        newActiveLink.classList.add('is-active');
        newActiveLink.setAttribute('aria-current', 'page');
        
        // Actualizar estados de control después de cada activación
        updateControlStates(newActiveLink);
    };

    // --- Función para obtener el índice del ítem de PÁGINA actualmente activo ---
    const getActivePageIndex = () => {
        const currentActiveLink = paginationContainer.querySelector('.pagination-link.is-active');
        if (!currentActiveLink) return -1;
        
        const currentActiveItem = currentActiveLink.closest('.pagination-item');
        return pageItems.indexOf(currentActiveItem); 
    }
    
    // --- Lógica de navegación de Anterior/Siguiente ---
    const navigatePage = (direction) => {
        let currentIndex = getActivePageIndex();
        
        let newPageIndex = currentIndex;

        if (direction === 'next') {
            // Navegación secuencial, no circular para esta demo compacta (se bloquea con is-disabled)
            newPageIndex = Math.min(currentIndex + 1, pageItems.length - 1); 
        } else if (direction === 'prev') {
            // Navegación secuencial
            newPageIndex = Math.max(currentIndex - 1, 0);
        }
        
        const nextItem = pageItems[newPageIndex];
        const nextLink = nextItem ? nextItem.querySelector('.pagination-link') : null;

        if (nextLink) {
            activateLink(nextLink);
            nextLink.focus();
        }
    }
    
    // Delegación de eventos de clic
    paginationList.addEventListener('click', (event) => {
        const clickedLink = event.target.closest('.pagination-link'); 
        if (!clickedLink || clickedLink.classList.contains('is-disabled')) return;

        event.preventDefault();

        if (clickedLink.classList.contains('is-active')) return;

        const label = clickedLink.getAttribute('aria-label');
        if (label === 'Anterior') {
            navigatePage('prev');
        } else if (label === 'Siguiente') {
            navigatePage('next');
        } else {
            // Es un número de página
            activateLink(clickedLink);
        }
    });

    // Soporte de navegación por teclado (flechas)
    paginationList.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            const currentActiveLink = paginationContainer.querySelector('.pagination-link.is-active');
            if (!currentActiveLink) return;
            
            event.preventDefault();
            const direction = event.key === 'ArrowRight' ? 'next' : 'prev';
            
            const activeText = currentActiveLink.textContent.trim();
            
            if (direction === 'prev' && activeText === '1') return; // Bloquear 'Anterior' en pág 1
            if (direction === 'next' && activeText === '3') return; // Bloquear 'Siguiente' en pág 3
            
            navigatePage(direction);
        }
    });
    
    // Inicializar el estado de los botones al cargar la página (basado en '1' activo)
    const initialActiveLink = paginationContainer.querySelector('.pagination-link.is-active');
    if (initialActiveLink) {
        updateControlStates(initialActiveLink);
    }
});