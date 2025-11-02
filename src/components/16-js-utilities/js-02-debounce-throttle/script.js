/**
 * =========================================================
 * JS 02 - SCRIPT.JS (DEMO LOCAL)
 * Este script SÓLO usa las utilidades ya definidas globalmente
 * en JS/modules/_performance.js para demostrar su efecto.
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    // Asegurarse de que las utilidades globales estén disponibles
    if (!window.UI_KIT_PERFORMANCE) {
        console.error(
            "Error: UI_KIT_PERFORMANCE no está cargado. Verifique JS/main.js"
        );
        return;
    }

    const { debounce, throttle } = window.UI_KIT_PERFORMANCE;
    const debounceOutput = document.getElementById("debounce-output");
    const throttleOutput = document.getElementById("throttle-output");
    const debounceInput = document.getElementById("debounce-input");
    const throttleArea = document.getElementById("throttle-area");

    // ============================================
    // 1. FUNCIÓN DE DEBOUNCE
    // ============================================

    // Función que queremos ejecutar
    const performSearch = (text) => {
        const now = new Date().toLocaleTimeString();
        debounceOutput.textContent = `Buscando "${text}"... (Ejecutado a las ${now})`;
        // Simular una pequeña respuesta visual
        debounceInput.classList.add("is-active");
        setTimeout(() => debounceInput.classList.remove("is-active"), 100);
    };

    // Aplicar Debounce a la función performSearch (espera 300ms)
    const debouncedSearch = debounce((e) => {
        performSearch(e.target.value);
    }, 300);

    // Asignar el listener al input
    if (debounceInput) {
        debounceInput.addEventListener("keyup", debouncedSearch);
    }

    // ============================================
    // 2. FUNCIÓN DE THROTTLE
    // ============================================

    let scrollCount = 0;

    // Función que queremos ejecutar
    const updateScrollCount = () => {
        scrollCount++;
        throttleOutput.textContent = scrollCount;
        // Simular una pequeña respuesta visual
        throttleArea.classList.add("is-active");
        setTimeout(() => throttleArea.classList.remove("is-active"), 50);
    };

    // Aplicar Throttle a la función updateScrollCount (ejecuta cada 200ms)
    const throttledScroll = throttle(updateScrollCount, 200);

    // Asignar el listener al área de scroll
    if (throttleArea) {
        throttleArea.addEventListener("scroll", throttledScroll);
    }
});
