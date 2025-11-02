/**
 * =========================================================
 * MÓDULO: _CORE.JS
 * Lógica base: IIFE, Inicialización y Delegación de Eventos.
 * =========================================================
 */

// Este IIFE encapsulará todo nuestro código y lo ejecutará al final.
(function () {
    // Aquí se importarán y se almacenarán las funciones de otros módulos (ej. toggleState)
    const ModuleFunctions = {};

    // =================================================
    // 1. EVENT DELEGATION (Manejo Centralizado de Clicks)
    // =================================================

    /**
     * Maneja el clic a nivel de documento y delega la acción a la función correcta.
     */
    function handleDocumentClick(event) {
        const target = event.target;

        // ------------------------------------------
        // Lógica de TOGGLE (1. Botones de Apertura/Cierre)
        // ------------------------------------------
        const toggleTrigger = target.closest(
            "[data-toggle-target], #sidebar-toggle"
        );

        if (toggleTrigger && ModuleFunctions.toggle) {
            event.preventDefault();
            ModuleFunctions.toggle(toggleTrigger);
            return;
        }

        // ------------------------------------------
        // Lógica de CIERRE GLOBAL (2. Fondo Oscuro de Modales/Popovers)
        // ------------------------------------------
        const activeModals = document.querySelectorAll(
            ".modal-container.is-active, .popover-container.is-active"
        );

        if (activeModals.length > 0) {
            activeModals.forEach((modal) => {
                // Selector más específico para el contenido interno
                const content = modal.querySelector(
                    ".modal-content, .popover-content"
                );

                // Verificar si el clic fue en el contenedor (el fondo) y NO dentro del contenido
                // También verificamos que 'content' exista para evitar errores
                if (
                    modal.classList.contains("is-active") &&
                    content &&
                    !content.contains(target)
                ) {
                    // Simula un trigger con el ID del modal/popover para cerrar
                    const closeTrigger = {
                        dataset: { toggleTarget: modal.id },
                    };
                    if (ModuleFunctions.toggle) {
                        ModuleFunctions.toggle(closeTrigger);
                    }
                }
            });
        }

        // * Otros manejadores de eventos (Tabs, etc.) irán aquí.
    }

    // =================================================
    // 2. MANEJO DE TECLAS (Cierre con ESC)
    // =================================================

    /**
     * Maneja eventos de teclado globales (cerrar modales con ESC).
     */
    function handleDocumentKeydown(event) {
        // Cierre con la tecla ESC
        if (event.key === "Escape") {
            const activeModals = document.querySelectorAll(
                ".modal-container.is-active, .popover-container.is-active"
            );

            activeModals.forEach((modal) => {
                // Cerramos el modal usando la utilidad toggle
                const closeTrigger = { dataset: { toggleTarget: modal.id } };
                if (ModuleFunctions.toggle) {
                    ModuleFunctions.toggle(closeTrigger);
                }
            });
        }
    }

    // =================================================
    // 3. INITIALIZATION (Actualizada)
    // =================================================

    /**
     * Función que se ejecuta cuando el DOM está listo.
     */
    function initialize() {
        // Asignar los Listeners ÚNICOS
        document.body.addEventListener("click", handleDocumentClick);
        document.addEventListener("keydown", handleDocumentKeydown); // NUEVO: Listener de Teclado

        // NUEVO: Llamar al inicializador automático si está disponible
        // El módulo _autoinit.js se registró como 'autoInit' en ModuleFunctions.
        if (ModuleFunctions.autoInit) {
            ModuleFunctions.autoInit.initializeAll();
        }
    }

    // Exportar la función principal del core para que main.js la pueda llamar.
    window.UI_KIT_CORE = {
        init: initialize,
        setModule: (name, func) => {
            ModuleFunctions[name] = func;
        },
    };
})(); // Fin del IIFE
