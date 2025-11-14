// * ----------------------------------------------------------------------------
// * COMPONENTE: Pestañas 04 - Con Icono (Icon Tabs)
// * AUTONOMÍA ESTRICTA: Reutiliza la lógica funcional del componente Base.
// * Se modificó el ID del contenedor (tabComponentIcon) para asegurar la autonomía.
// * ----------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener el contenedor autónomo del componente de pestañas (ID específico del snippet)
    const tabContainer = document.getElementById('tabComponentIcon');
    
    // Salir si el contenedor no existe (mantiene la robustez del script)
    if (!tabContainer) return;

    // 2. Obtener la lista de pestañas
    const tabList = tabContainer.querySelector('.tab-list');

    // 3. Función principal que maneja el cambio de pestaña
    const switchTab = (newActiveTab) => {
        // --- A. Desactivar la pestaña y panel antiguos ---
        const oldActiveTab = tabList.querySelector('.tab-item.is-active');
        if (oldActiveTab) {
            // 1. Remover el estado activo visual
            oldActiveTab.classList.remove('is-active');
            // 2. Actualizar el estado ARIA
            oldActiveTab.setAttribute('aria-selected', 'false');
            
            // 3. Ocultar el panel antiguo
            const oldPanelId = oldActiveTab.getAttribute('aria-controls');
            const oldPanel = tabContainer.querySelector(`#${oldPanelId}`);
            if (oldPanel) {
                oldPanel.classList.remove('is-active');
                oldPanel.setAttribute('hidden', '');
            }
        }

        // --- B. Activar la nueva pestaña y panel ---
        
        // 1. Añadir el estado activo visual
        newActiveTab.classList.add('is-active');
        // 2. Actualizar el estado ARIA
        newActiveTab.setAttribute('aria-selected', 'true');
        
        // 3. Mostrar el nuevo panel
        const newPanelId = newActiveTab.getAttribute('aria-controls');
        const newPanel = tabContainer.querySelector(`#${newPanelId}`);
        if (newPanel) {
            newPanel.classList.add('is-active');
            newPanel.removeAttribute('hidden');
        }
        
        // 4. Mover el foco al contenido del panel para mejorar la accesibilidad
        newPanel.focus();
    };

    // 4. Delegación de eventos en la lista de pestañas (más eficiente)
    tabList.addEventListener('click', (event) => {
        // Asegurarse de que el target es el botón .tab-item, incluso si el clic fue en el icono <i>
        const clickedItem = event.target.closest('.tab-item'); 
        
        // Si el clic fue en un elemento .tab-item y no está ya activo
        if (clickedItem && !clickedItem.classList.contains('is-active')) {
            switchTab(clickedItem);
        }
    });
    
    // 5. Soporte de navegación por teclado (flechas)
    tabList.addEventListener('keydown', (event) => {
        let currentActiveTab = tabList.querySelector('.tab-item.is-active');
        let nextTab = null;
        
        switch (event.key) {
            case 'ArrowRight':
                nextTab = currentActiveTab.nextElementSibling || tabList.firstElementChild;
                break;
            case 'ArrowLeft':
                nextTab = currentActiveTab.previousElementSibling || tabList.lastElementChild;
                break;
            case 'Home':
                nextTab = tabList.firstElementChild;
                break;
            case 'End':
                nextTab = tabList.lastElementChild;
                break;
            default:
                return; // Ignorar otras teclas
        }

        if (nextTab) {
            event.preventDefault(); // Prevenir el desplazamiento de la página
            switchTab(nextTab);
            nextTab.focus(); // Mover el foco a la nueva pestaña activa
        }
    });

});