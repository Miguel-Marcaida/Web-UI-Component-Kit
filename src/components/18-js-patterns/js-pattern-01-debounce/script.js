/*
 * script.js
 * Subcomponente 18.01 Debounce
 * Contiene la función pura del patrón y la lógica de inicialización.
 */

/**
 * 1. La Función Pura del Patrón Debounce
 *
 * Devuelve una nueva función que, cuando se llama repetidamente, solo
 * ejecuta la función original después de que haya pasado 'delay' milisegundos
 * sin más llamadas.
 *
 * @param {function} func La función a debouncar.
 * @param {number} delay El tiempo de espera en milisegundos.
 * @returns {function} La función debouncada.
 */
function debounce(func, delay = 500) {
    let timeoutId;
    
    // Retorna una función que será la que realmente manejará el evento
    return function(...args) {
        // 'this' se refiere al contexto del evento (ej: el input)
        const context = this; 

        // Limpia el temporizador anterior para reiniciar la cuenta regresiva
        clearTimeout(timeoutId);

        // Establece un nuevo temporizador
        timeoutId = setTimeout(() => {
            // Ejecuta la función original solo si el tiempo de espera se cumplió
            func.apply(context, args);
        }, delay);
    };
}


/**
 * 2. Lógica de Inicialización para la Demo
 * Aplica el patrón Debounce al input de la demostración.
 */
document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.getElementById('debounce-input');
    const outputElement = document.getElementById('search-output');

    if (!inputElement || !outputElement) {
        console.error('Elementos de la demo (input o output) no encontrados.');
        return;
    }

    // Función que simula la costosa llamada a una API o base de datos
    const performSearch = (searchTerm) => {
        outputElement.innerHTML = `Buscando **"${searchTerm}"**...`;
        
        // Simulación de latencia de red (200ms)
        setTimeout(() => {
            if (searchTerm.length === 0) {
                outputElement.innerHTML = 'Esperando entrada...';
            } else {
                outputElement.innerHTML = `✅ Búsqueda finalizada para: <strong>${searchTerm}</strong>`;
            }
        }, 200);
    };

    // Aplicación del Debounce: Solo se llama a 'performSearch' si el usuario se detiene por 500ms
    const debouncedSearch = debounce(performSearch, 500);

    // Adjuntar el manejador de eventos debounced
    inputElement.addEventListener('keyup', (e) => {
        // Extraemos el valor del input
        const searchTerm = e.target.value.trim();
        debouncedSearch(searchTerm);
    });

    // Inicializar el estado al cargar la página
    outputElement.innerHTML = 'Esperando entrada...';
});