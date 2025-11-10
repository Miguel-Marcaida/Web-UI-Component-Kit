// =================================================================
// MÓDULO: _theme.js (GESTIÓN GLOBAL DEL MODO CLARO/OSCURO)
// Carga las preferencias inmediatamente para evitar el FOUC (Flash).
// =================================================================

(function () {
    // 1. CONSTANTES CRÍTICAS
    const THEME_STORAGE_KEY = "ui-kit-theme";
    const LIGHT_THEME_CLASS = "light-theme";
    const toggleButton = document.getElementById("theme-toggle");
    const body = document.body;

    // Si el botón no existe en el DOM, detenemos la ejecución del módulo.
    if (!toggleButton) {
        console.warn("[_THEME.JS] Botón #theme-toggle no encontrado. Módulo detenido.");
        return;
    }

    /**
     * Aplica la clase 'light-theme' al body y actualiza los iconos.
     * @param {boolean} isLight - Verdadero si el tema a aplicar es claro.
     */
    function applyTheme(isLight) {
        // 1. Alternar la clase en el body
        body.classList.toggle(LIGHT_THEME_CLASS, isLight);

        // 2. Actualizar el icono visible (Sol ☀️ si es light, Luna 🌙 si es dark)
        const lightIcon = toggleButton.querySelector('[data-mode="light"]');
        const darkIcon = toggleButton.querySelector('[data-mode="dark"]');

        if (lightIcon && darkIcon) {
            // Si es claro (isLight=true), mostramos la Luna (dark) para sugerir el cambio.
            // Si es oscuro (isLight=false), mostramos el Sol (light) para sugerir el cambio.
            lightIcon.style.display = isLight ? "none" : "";
            darkIcon.style.display = isLight ? "" : "none";
        }

        // 3. Actualizar el aria-label (accesibilidad)
        toggleButton.setAttribute("aria-label", isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro");
    }

    /**
     * Maneja el evento de clic en el botón de alternancia.
     */
    function handleThemeToggle() {
        // Comprobar el estado actual (si tiene la clase 'light-theme')
        const isCurrentlyLight = body.classList.contains(LIGHT_THEME_CLASS);
        const newThemeIsLight = !isCurrentlyLight;

        // 1. Aplicar el nuevo tema
        applyTheme(newThemeIsLight);

        // 2. Guardar la nueva preferencia
        localStorage.setItem(THEME_STORAGE_KEY, newThemeIsLight ? "light" : "dark");
    }

    /**
     * Inicializa el tema al cargar la página (se ejecuta inmediatamente).
     */
    function initTheme() {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        // Verificar la preferencia del sistema operativo si no hay una guardada
        const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

        let initialThemeIsLight = false;

        if (savedTheme) {
            // PRIORIDAD 1: Usar la preferencia guardada
            initialThemeIsLight = savedTheme === "light";
        } else {
            // PRIORIDAD 2: Usar la preferencia del sistema
            initialThemeIsLight = prefersLight;
        }

        // Aplicar el tema inicial inmediatamente (evita FOUC)
        applyTheme(initialThemeIsLight);

        // Solo añadir el listener al botón después de que el DOM esté completamente cargado.
        document.addEventListener("DOMContentLoaded", () => {
            toggleButton.addEventListener("click", handleThemeToggle);
        });
    }

    // Ejecutar el módulo de tema inmediatamente
    initTheme();
})();
