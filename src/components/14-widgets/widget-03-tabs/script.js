/* *********************************************************************************
 * 14.03: TABULADOR (TABS) - JAVASCRIPT AUTÓNOMO
 * NOTA: Este script gestiona la activación/desactivación de pestañas y paneles dentro de un grupo.
 * *********************************************************************************/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleccionar todos los botones de pestañas
    const tabButtons = document.querySelectorAll('.tab-button');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabsHeader = button.closest('.tabs-header');
            const tabsGroup = button.closest('.tabs-group');
            
            // 2. Identificar el target (panel de contenido)
            const targetId = button.getAttribute('data-target');
            const targetPanel = tabsGroup.querySelector(targetId);

            // 3. Desactivar todos los botones y paneles dentro del grupo
            tabsHeader.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('is-active');
                btn.setAttribute('aria-selected', 'false');
            });

            tabsGroup.querySelectorAll('.tab-panel').forEach(panel => {
                panel.classList.remove('is-active');
            });

            // 4. Activar el botón y el panel target
            button.classList.add('is-active');
            button.setAttribute('aria-selected', 'true');
            
            if (targetPanel) {
                targetPanel.classList.add('is-active');
            }
        });
    });
});