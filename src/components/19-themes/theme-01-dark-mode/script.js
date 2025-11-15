// script.js
// Subcomponente 19.01 Modo Oscuro (Dark Mode)
// Lógica de alternancia y persistencia del tema local.
(() => {
    // La función se envuelve en un IIFE para evitar la polución del ámbito global.
    document.addEventListener('DOMContentLoaded', () => {
        // 1. DOM Setup
        const container = document.querySelector('.dark-mode-example-container');
        const toggleButton = document.getElementById('local-theme-toggle');
        
        if (!container || !toggleButton) {
            // Este script solo opera si encuentra su contenedor y botón específicos.
            return;
        }

        const themeKey = 'componentThemePreference_1901'; // Clave única para localStorage
        const statusText = toggleButton.querySelector('.theme-status');
        const icon = toggleButton.querySelector('.fas');

        // 2. State Management: Función para aplicar el tema
        const applyTheme = (theme) => {
            // Limpiar clases de tema existentes
            container.classList.remove('theme-light', 'theme-dark');
            
            if (theme === 'dark') {
                container.classList.add('theme-dark');
                if (statusText) statusText.textContent = 'Modo Actual: Oscuro';
                if (icon) {
                    icon.classList.remove('fa-toggle-on');
                    icon.classList.add('fa-toggle-off'); // Toggle a la izquierda
                }
            } else {
                container.classList.add('theme-light');
                if (statusText) statusText.textContent = 'Modo Actual: Claro';
                if (icon) {
                    icon.classList.remove('fa-toggle-off');
                    icon.classList.add('fa-toggle-on'); // Toggle a la derecha
                }
            }

            // 3. Persistence: Guardar la elección
            localStorage.setItem(themeKey, theme);
        };

        // 4. Initial Theme Loading
        const savedTheme = localStorage.getItem(themeKey);

        if (savedTheme) {
            // Si hay una preferencia guardada, úsala inmediatamente
            applyTheme(savedTheme);
        } else {
            // 5. System Preference: Si no hay preferencia guardada, usa la del sistema
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDark ? 'dark' : 'light');
        }

        // 6. Toggle Logic: Alternar al hacer clic
        toggleButton.addEventListener('click', () => {
            const currentTheme = container.classList.contains('theme-dark') ? 'dark' : 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            applyTheme(newTheme);
        });

        // Opcional: Escuchar cambios en la preferencia del sistema para actualizar dinámicamente
        // Esto solo es relevante si el usuario no ha forzado un tema localmente.
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            const currentSavedTheme = localStorage.getItem(themeKey);
            if (!currentSavedTheme) { // Si el usuario no ha forzado un tema, sigue al sistema
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    });
})();