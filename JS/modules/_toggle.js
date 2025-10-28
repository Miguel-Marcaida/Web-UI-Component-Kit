/**
 * =========================================================
 * MÓDULO: _TOGGLE.JS
 * Contiene la lógica para alternar la clase 'is-active' y
 * actualizar los atributos ARIA.
 * =========================================================
 */

(function () {
    /**
     * Alterna la clase 'is-active' en un elemento objetivo y en el disparador.
     * @param {HTMLElement} trigger - El elemento que fue clicado.
     */
    function toggleState(trigger) {
        // 1. OBTENER TARGET
        const targetId = trigger.dataset.toggleTarget;
        const targetElement = targetId
            ? document.getElementById(targetId)
            : null;

        // 2. DETERMINAR EL ESTADO ACTUAL
        // Usamos la clase en el trigger si no hay un target explícito.
        const targetToToggle = targetElement || trigger;
        const willBeActive = !targetToToggle.classList.contains("is-active");

        // 3. TOGGLE DE CLASE
        targetToToggle.classList.toggle("is-active", willBeActive);
        // Togglenar también la clase en el trigger para feedback visual
        trigger.classList.toggle("is-active", willBeActive);

        // 4. LÓGICA ARIA
        trigger.setAttribute("aria-expanded", willBeActive);
        if (targetElement) {
            targetElement.setAttribute("aria-hidden", !willBeActive);
        }

        // 5. LÓGICA ESPECÍFICA PARA EL SIDEBAR (el cambio de icono y el contenedor principal)
        if (trigger.id === "sidebar-toggle") {
            const icon = trigger.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars", !willBeActive);
                icon.classList.toggle("fa-times", willBeActive);
            }
            // Esto es crucial para el CSS del Sidebar
            const docsContainer = document.querySelector(".docs-container");
            if (docsContainer) {
                docsContainer.classList.toggle("is-sidebar-open", willBeActive);
            }
        }
    }

    // Exportar la función para que el CORE la pueda usar en la Delegación de Eventos.
    if (window.UI_KIT_CORE) {
        window.UI_KIT_CORE.setModule("toggle", toggleState);
    }
})();
