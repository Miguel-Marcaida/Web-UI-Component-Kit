// script.js
// Subcomponente 19.02 Personalización (Color de Marca)
// Lógica para capturar el color de un input y aplicarlo a una variable CSS.
(() => {
    document.addEventListener('DOMContentLoaded', () => {
        // 1. DOM Setup
        const container = document.querySelector('.branding-example-container');
        const colorPicker = document.getElementById('brand-color-picker');
        
        if (!container || !colorPicker) {
            console.warn('Faltan elementos DOM para la demostración de Personalización de Marca.');
            return;
        }

        const themeKey = 'componentBrandColor_1902'; // Clave única para localStorage
        const cssVariable = '--color-brand'; // Variable CSS a modificar

        // 2. State Management: Función para aplicar el color
        const applyBrandColor = (color) => {
            // Aplicar la variable CSS directamente al elemento contenedor
            container.style.setProperty(cssVariable, color);
            
            // Asegurar que el input refleje el color (útil si se carga desde storage)
            colorPicker.value = color;

            // 3. Persistence: Guardar la elección
            localStorage.setItem(themeKey, color);
        };

        // 4. Initial Brand Color Loading
        const savedColor = localStorage.getItem(themeKey);

        if (savedColor) {
            // Si hay una preferencia guardada, úsala
            applyBrandColor(savedColor);
        } else {
            // Si no hay preferencia guardada, usa el valor por defecto del input (HTML: #007bff)
            applyBrandColor(colorPicker.value);
        }

        // 5. Event Listener: Escuchar cambios en el selector
        colorPicker.addEventListener('input', (event) => {
            const newColor = event.target.value;
            applyBrandColor(newColor);
        });
    });
})();