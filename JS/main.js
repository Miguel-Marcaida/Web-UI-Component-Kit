// =================================================================
// WEB UI KIT - MAIN.JS (AGREGADOR/LOADER MODERNO)
// Este archivo carga todos los módulos del JS Kit en orden.
// =================================================================

(function () {
    // 1. DEFINICIÓN DE MÓDULOS EN ORDEN
    const MODULES = [
        "./modules/_theme.js",
        // "./modules/_core.js", // 1. Esqueleto de delegación y API global (DEBE SER EL PRIMERO)
        // "./modules/_theme.js",
        // "./modules/_toggle.js", // 2. Lógica de alternancia (requiere _core)
        // "./modules/_autoinit.js", // 3. NUEVO: Módulo de Inicialización Automática
        // "./modules/_performance.js",
        // "./modules/_events.js",
        // // NUEVO: Módulos de componentes
        // "./modules/carousel.js", // <--- AÑADIDA LÍNEA DEL CARRUSEL
    ];

    /**
     * Carga un script dinámicamente usando DOM Manipulation.
     */
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "/JS/" + src;
            script.async = false; // Se cargan en orden síncrono para respetar las dependencias

            script.onload = resolve;
            script.onerror = reject;

            document.head.appendChild(script);
        });
    }

    // 2. CARGA SECUENCIAL Y ASÍNCRONA DE MÓDULOS
    function loadAllModules() {
        let chain = Promise.resolve();

        MODULES.forEach((modulePath) => {
            chain = chain.then(() => loadScript(modulePath));
        });

        return chain;
    }

    // 3. INICIALIZAR EL KIT
    document.addEventListener("DOMContentLoaded", () => {
        loadAllModules()
            .then(() => {
                // Verificar e inicializar el Core después de que todos los módulos hayan cargado
                if (window.UI_KIT_CORE && window.UI_KIT_CORE.init) {
                    const autoInit = window.UI_KIT_CORE.getModule("autoInit");

                    if (autoInit) {
                        // === REGISTRO MANUAL DE COMPONENTES ===
                        // Los componentes que no tienen 'init' propio deben registrarse aquí.

                        // 1. Registro del Toggle
                        if (window.UI && window.UI.Toggle) {
                            autoInit.register("[data-toggle]", window.UI.Toggle.init);
                            console.log("[MAIN.JS] Componente Toggle registrado.");
                        }

                        // 2. Registro del Carrusel
                        if (window.UI && window.UI.Carousel) {
                            autoInit.register(".carousel", window.UI.Carousel.init);
                            console.log("[MAIN.JS] Componente Carrusel registrado.");
                        }

                        // === FIN DEL REGISTRO ===

                        // Ejecutar la inicialización global
                        autoInit.initializeAll();
                    }

                    window.UI_KIT_CORE.init();
                    console.log("[MAIN.JS] UI Kit inicializado con éxito.");
                } else {
                    console.error("[MAIN.JS] Error al inicializar UI_KIT_CORE. Verifique la carga de _core.js");
                }
            })
            .catch((error) => {
                console.error("[MAIN.JS] Error al cargar uno o más módulos:", error);
            });
    });
})();
