/**
 * =========================================================
 * MÓDULO: _TOGGLE.JS
 * Contiene la lógica para alternar la clase 'is-active' y
 * actualizar los atributos ARIA.
 * =========================================================
 */

(function () {
    function toggleState(trigger) {
        // 1. OBTENER TARGET
        const targetId = trigger.dataset.toggleTarget;
        const targetElement = targetId
            ? document.getElementById(targetId)
            : null;

        // El elemento al que se le aplicará el is-active
        const targetToToggle = targetElement || trigger;
        const willBeActive = !targetToToggle.classList.contains("is-active");

        // 2. TOGGLE DE CLASE
        targetToToggle.classList.toggle("is-active", willBeActive);
        // Togglenar también la clase en el trigger (para feedback visual)
        trigger.classList.toggle("is-active", willBeActive);

        // 3. LÓGICA ARIA
        trigger.setAttribute("aria-expanded", willBeActive);
        if (targetElement) {
            targetElement.setAttribute("aria-hidden", !willBeActive);
        }

        // 4. LÓGICA ESPECÍFICA PARA EL SIDEBAR (cambio de icono y contenedor principal)
        if (trigger.id === "sidebar-toggle") {
            const icon = trigger.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars", !willBeActive);
                icon.classList.toggle("fa-times", willBeActive);
            }
            const docsContainer = document.querySelector(".docs-container");
            if (docsContainer) {
                docsContainer.classList.toggle("is-sidebar-open", willBeActive);
            }
        }

        // ------------------------------------------
        // 5. LÓGICA DE ELIMINACIÓN DEL DOM (SOLUCIÓN PARA ALERTAS)
        // ------------------------------------------
        // Si el elemento no va a estar activo (se está cerrando)
        if (!willBeActive) {
            // Verificamos si el TARGET tiene la bandera para ser ELIMINADO
            const shouldRemove =
                targetToToggle.dataset.removeOnClose === "true";

            if (shouldRemove) {
                // Asumimos una transición de 300ms (0.3s) para la alerta.
                setTimeout(() => {
                    // Eliminamos el elemento después de que la transición haya terminado.
                    targetToToggle.remove();
                }, 300);
            }
        }
    }

    // Exportar la función...
    if (window.UI_KIT_CORE) {
        window.UI_KIT_CORE.setModule("toggle", toggleState);
    }
})();
