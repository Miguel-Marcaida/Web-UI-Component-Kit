/* ==================================================== */
/* MÓDULO AUTÓNOMO: 17.02 (Focus Management)             */
/* Lógica para implementar la Trampa de Foco (Focus Trap) */
/* ==================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const panel = document.getElementById('focus-panel');
    const openBtn = document.getElementById('open-panel-btn');
    const closeBtn = document.getElementById('close-panel-btn');

    // 1. SELECTORES CANÓNICOS: Elementos enfocables estándar
    const FOCUSABLE_ELEMENTS = [
        'button:not([disabled])',
        'a[href]',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"]):not([disabled])'
    ];

    let focusableElements = [];
    let firstFocusableElement = null;
    let lastFocusableElement = null;
    let previouslyFocusedElement = null;

    // --- Funciones de Utilidad ---

    // Función para obtener todos los elementos enfocables dentro del panel
    const getFocusableElements = () => {
        return Array.from(panel.querySelectorAll(FOCUSABLE_ELEMENTS.join(',')));
    };

    // Función principal para atrapar el foco
    const trapFocus = (e) => {
        // Solo ejecuta si el panel está activo
        if (panel.style.display !== 'flex') return;

        // Si se presiona TAB
        if (e.key === 'Tab' || e.keyCode === 9) {
            e.preventDefault(); // Detener el comportamiento de TAB por defecto

            const isShiftPressed = e.shiftKey;
            
            // Si SHIFT + TAB (navegación hacia atrás)
            if (isShiftPressed) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                } else {
                    // Navegación normal hacia atrás
                    const index = focusableElements.indexOf(document.activeElement);
                    const previousElement = focusableElements[index - 1];
                    if (previousElement) {
                        previousElement.focus();
                    }
                }
            } 
            // Si solo TAB (navegación hacia adelante)
            else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                } else {
                    // Navegación normal hacia adelante
                    const index = focusableElements.indexOf(document.activeElement);
                    const nextElement = focusableElements[index + 1];
                    if (nextElement) {
                        nextElement.focus();
                    }
                }
            }
        }
        // Si ESC, cerrar el panel
        else if (e.key === 'Escape' || e.keyCode === 27) {
            closePanel();
        }
    };

    // --- Lógica de Apertura/Cierre ---

    const openPanel = () => {
        // Guardar el elemento que tenía el foco antes de abrir el panel
        previouslyFocusedElement = document.activeElement;

        // 1. Mostrar el panel
        panel.classList.add('is-active');
        panel.style.display = 'flex'; // Usar la clase CSS para el display
        panel.setAttribute('aria-hidden', 'false');

        // 2. Inicializar elementos enfocables
        focusableElements = getFocusableElements();
        firstFocusableElement = focusableElements[0];
        lastFocusableElement = focusableElements[focusableElements.length - 1];

        // 3. Mover el foco al panel o al primer elemento enfocable
        if (firstFocusableElement) {
            firstFocusableElement.focus();
        } else {
             // Si no hay elementos enfocables, enfocar el panel mismo
            panel.focus(); 
        }

        // 4. Activar la trampa de foco al escuchar eventos de teclado
        document.addEventListener('keydown', trapFocus);
    };

    const closePanel = () => {
        // 1. Ocultar el panel
        panel.classList.remove('is-active');
        panel.style.display = 'none';
        panel.setAttribute('aria-hidden', 'true');

        // 2. Remover la trampa de foco
        document.removeEventListener('keydown', trapFocus);

        // 3. Devolver el foco al elemento que lo tenía antes de abrir el panel
        if (previouslyFocusedElement) {
            previouslyFocusedElement.focus();
        }
    };

    // --- Inicialización de Event Listeners ---
    if (openBtn && closeBtn && panel) {
        openBtn.addEventListener('click', openPanel);
        closeBtn.addEventListener('click', closePanel);
        
        // Configuración inicial del panel
        panel.style.display = 'none';
        panel.setAttribute('aria-hidden', 'true');
    }
});