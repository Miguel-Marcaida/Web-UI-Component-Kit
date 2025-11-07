// ===========================================
// SCRIPT.JS: Form-07 Range Slider
// Lógica para mostrar el valor del slider en tiempo real Y calcular el llenado.
// ===========================================

document.addEventListener("DOMContentLoaded", () => {
    const rangeInputs = document.querySelectorAll(".range-control__input");

    rangeInputs.forEach((input) => {
        // Obtenemos los atributos necesarios
        const outputId = input.getAttribute("aria-controls");
        const outputSpan = outputId ? document.getElementById(outputId) : null;

        // Obtenemos los límites y el valor actual (convertidos a números)
        const min = parseFloat(input.min) || 0;
        const max = parseFloat(input.max) || 100;

        // Definir la función de actualización (ahora incluye el cálculo de llenado).
        const updateRangeValue = () => {
            const currentValue = parseFloat(input.value);

            // 1. CÁLCULO DEL LLENADO
            // Fórmula: (Valor actual - Mínimo) / (Máximo - Mínimo) * 100
            const percentage = ((currentValue - min) / (max - min)) * 100;

            // 2. INYECCIÓN CSS: Actualiza la variable --range-fill
            input.style.setProperty("--range-fill", `${percentage}%`);

            // 3. ACTUALIZACIÓN DE VALOR (Visual y Accesibilidad)
            if (outputSpan) {
                outputSpan.textContent = currentValue;
            }
            input.setAttribute("aria-valuenow", currentValue);
        };

        // Inicializar el valor y el llenado al cargar (vital para el CSS)
        updateRangeValue();

        // Asocia listeners al 'input' para cambios en tiempo real.
        input.addEventListener("input", updateRangeValue);
    });
});
