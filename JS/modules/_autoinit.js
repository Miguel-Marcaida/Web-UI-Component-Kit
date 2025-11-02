/**
 * =========================================================
 * MÓDULO: _autoinit.js
 * Componentes que requieren inicialización única al cargar el DOM.
 * =========================================================
 */
(function () {
    // Mapa de selectores CSS a funciones de inicialización.
    // { selector: initializeFunction }
    const componentInitializers = {};

    /**
     * Registra una función de inicialización para un selector CSS.
     * @param {string} selector - Selector CSS del componente raíz.
     * @param {function} initFn - Función a ejecutar para inicializar el componente.
     */
    function register(selector, initFn) {
        if (typeof initFn !== "function") {
            console.error(
                `[AutoInit] La función para el selector "${selector}" no es válida.`
            );
            return;
        }
        componentInitializers[selector] = initFn;
    }

    /**
     * Itera sobre el mapa y ejecuta la función de inicialización
     * para cada instancia del componente encontrado en el DOM.
     */
    function initializeAll() {
        // Obtenemos todos los selectores registrados.
        const selectors = Object.keys(componentInitializers);

        selectors.forEach((selector) => {
            const initFn = componentInitializers[selector];

            // Buscar todas las instancias del componente en el DOM
            const components = document.querySelectorAll(selector);

            if (components.length > 0) {
                // Inicializar cada instancia encontrada
                components.forEach((component) => {
                    try {
                        initFn(component); // Pasar el elemento DOM a la función de inicialización
                    } catch (e) {
                        console.error(
                            `[AutoInit] Error al inicializar componente con selector: ${selector}`,
                            e
                        );
                    }
                });
            }
        });

        console.log("[AutoInit] Componentes inicializados.");
    }

    // Exportar la API del módulo al Core.
    window.UI_KIT_CORE.setModule("autoInit", {
        register: register,
        initializeAll: initializeAll,
    });
})();
