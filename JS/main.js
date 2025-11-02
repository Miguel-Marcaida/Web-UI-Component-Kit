// =================================================================
// WEB UI KIT - MAIN.JS (AGREGADOR/LOADER)
// Este archivo carga todos los módulos del JS Kit en orden.
// =================================================================

// 1. Cargar el módulo CORE (establece el esqueleto de delegación)
// Nota: Debe ser el primero.
document.write('<script src="/JS/modules/_core.js"></script>');

// 2. Cargar los módulos de funcionalidades
// Nota: Deben cargarse antes de la inicialización.
document.write('<script src="/JS/modules/_toggle.js"></script>');

document.write('<script src="/JS/modules/_performance.js"></script>');

// 3. Inicializar el Kit
document.addEventListener("DOMContentLoaded", () => {
    if (window.UI_KIT_CORE && window.UI_KIT_CORE.init) {
        window.UI_KIT_CORE.init();
    } else {
        console.error(
            "Error al inicializar UI_KIT_CORE. Verifique la carga de JS/modules/_core.js"
        );
    }
});
