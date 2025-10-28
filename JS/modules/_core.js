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
        // Lógica de TOGGLE (Para todos los elementos [data-toggle-target] o #sidebar-toggle)
        // ------------------------------------------
        // Si el elemento clicado o alguno de sus padres coincide con el selector de Toggle.
        const toggleTrigger = target.closest(
            "[data-toggle-target], #sidebar-toggle"
        );

        if (toggleTrigger && ModuleFunctions.toggle) {
            event.preventDefault();
            // Llama a la función toggleState, que será importada de otro módulo.
            ModuleFunctions.toggle(toggleTrigger);
            return;
        }

        // * Otros manejadores de eventos (Modals, Tabs, etc.) irán aquí.
    }

    // =================================================
    // 2. INITIALIZATION
    // =================================================

    /**
     * Función que se ejecuta cuando el DOM está listo.
     */
    function initialize() {
        // Carga y configura los módulos

        // Asignar el Listener ÚNICO al cuerpo
        document.body.addEventListener("click", handleDocumentClick);

        // * Otras inicializaciones de componentes (ej. Carruseles) irán aquí.
    }

    // Exportar la función principal del core para que main.js la pueda llamar.
    window.UI_KIT_CORE = {
        init: initialize,
        setModule: (name, func) => {
            ModuleFunctions[name] = func;
        },
    };
})(); // Fin del IIFE
