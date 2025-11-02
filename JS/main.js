// =================================================================
// WEB UI KIT - MAIN.JS (AGREGADOR/LOADER MODERNO)
// Este archivo carga todos los módulos del JS Kit en orden.
// =================================================================

(function () {
    // 1. DEFINICIÓN DE MÓDULOS EN ORDEN
    // Nota: El orden es crucial para asegurar que _core.js y _toggle.js estén disponibles.
    const MODULES = [
        "./modules/_core.js", // 1. Esqueleto de delegación y API global (DEBE SER EL PRIMERO)
        "./modules/_toggle.js", // 2. Lógica de alternancia (requiere _core)
        "./modules/_autoinit.js", // 3. NUEVO: Módulo de Inicialización Automática
        "./modules/_performance.js",
        "./modules/_events.js",
        // Aquí se pueden añadir otros módulos de componentes (ej. carousels.js)
        // NUEVO: Módulos de componentes
        "./modules/carousel.js", // <--- AÑADIR ESTA LÍNEA
    ];

    /**
     * Carga un script dinámicamente usando DOM Manipulation.
     * Esto evita el uso de document.write().
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
    // Usa 'reduce' para encadenar las promesas y garantizar el orden.
    function loadAllModules() {
        // La promesa inicial se resuelve inmediatamente.
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
                    window.UI_KIT_CORE.init();
                    console.log("[MAIN.JS] UI Kit inicializado con éxito.");
                } else {
                    console.error(
                        "[MAIN.JS] Error al inicializar UI_KIT_CORE. Verifique la carga de _core.js"
                    );
                }
            })
            .catch((error) => {
                console.error(
                    "[MAIN.JS] Error al cargar uno o más módulos:",
                    error
                );
            });
    });
})();
