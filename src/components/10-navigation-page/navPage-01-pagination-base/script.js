// * ----------------------------------------------------------------------------
// * COMPONENTE: Paginación 01 - Base
// * CORRECCIÓN FINAL: Se añade lógica de control dinámico is-disabled.
// * ----------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const paginationContainer = document.querySelector('.pagination-container');
    if (!paginationContainer) return;

    const paginationList = paginationContainer.querySelector('.pagination-list');
    
    // Obtener los botones de control (Anterior y Siguiente)
    const prevButton = paginationList.querySelector('.pagination-item:first-child .pagination-link');
    const nextButton = paginationList.querySelector('.pagination-item:last-child .pagination-link');
    
    // Obtener SOLO los elementos numéricos y la elipsis
    const pageItems = Array.from(paginationList.querySelectorAll('.pagination-item:not(:first-child):not(:last-child)'));

    // --- Función para gestionar el estado de los botones Anterior/Siguiente ---
    const updateControlStates = (activeLink) => {
        const activeText = activeLink.textContent.trim();
        
        // Asumimos que 1 y 10 son los límites de la demo para deshabilitar/habilitar

        // Lógica del botón Anterior
        if (activeText === '1') {
            prevButton.classList.add('is-disabled');
            prevButton.setAttribute('aria-disabled', 'true');
        } else {
            prevButton.classList.remove('is-disabled');
            prevButton.removeAttribute('aria-disabled');
        }

        // Lógica del botón Siguiente
        if (activeText === '10') {
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
        
        // ¡ACTUALIZAR ESTADOS DE CONTROL DESPUÉS DE CADA ACTIVACIÓN!
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
        
        // No navegar si el activo es la elipsis
        if (currentIndex === 3) return;

        // Filtrar solo los números (excluir elipsis) para el cálculo de índice
        const navigablePages = pageItems.filter(item => !item.classList.contains('pagination-ellipsis'));
        let currentPageIndex = navigablePages.indexOf(pageItems[currentIndex]);
        
        let newPageIndex = -1;

        if (direction === 'next') {
            newPageIndex = (currentPageIndex + 1) % navigablePages.length; // Navegación circular
        } else if (direction === 'prev') {
            newPageIndex = (currentPageIndex - 1 + navigablePages.length) % navigablePages.length; // Navegación circular
        }
        
        const nextItem = navigablePages[newPageIndex];
        const nextLink = nextItem ? nextItem.querySelector('.pagination-link') : null;

        if (nextLink) {
            activateLink(nextLink);
            nextLink.focus();
        }
    }
    
    // Delegación de eventos de clic
    paginationList.addEventListener('click', (event) => {
        const clickedLink = event.target.closest('.pagination-link'); // No filtramos por disabled aquí
        if (!clickedLink || clickedLink.classList.contains('is-disabled')) return; // Filtramos la ejecución aquí

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
            event.preventDefault();
            const direction = event.key === 'ArrowRight' ? 'next' : 'prev';
            
            // Permitimos la navegación por teclado incluso si los botones están deshabilitados
            // para mantener la accesibilidad, pero no si estamos en la página final/inicial
            const currentActiveLink = paginationContainer.querySelector('.pagination-link.is-active');
            if (currentActiveLink) {
                const activeText = currentActiveLink.textContent.trim();
                
                if (direction === 'prev' && activeText === '1') return; // Bloquear 'Anterior' en pág 1
                if (direction === 'next' && activeText === '10') return; // Bloquear 'Siguiente' en pág 10
            }
            
            navigatePage(direction);
        }
    });
    
    // Inicializar el estado de los botones al cargar la página (basado en '1' activo)
    const initialActiveLink = paginationContainer.querySelector('.pagination-link.is-active');
    if (initialActiveLink) {
        updateControlStates(initialActiveLink);
    }
});