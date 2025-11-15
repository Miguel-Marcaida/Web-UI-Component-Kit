/*
 * script.js
 * Subcomponente 18.02 Throttle
 * Contiene la función pura del patrón y la lógica de inicialización.
 */

/**
 * 1. La Función Pura del Patrón Throttle
 *
 * Limita la ejecución de una función 'func' a un máximo de una vez
 * cada 'limit' milisegundos.
 *
 * @param {function} func La función a limitar.
 * @param {number} limit El intervalo de tiempo en milisegundos (ej: 100ms).
 * @returns {function} La función limitada (throttled).
 */
function throttle(func, limit = 100) {
    let lastFunc; // Referencia al último temporizador
    let lastRan;  // Marca de tiempo de la última vez que se ejecutó

    // Retorna una función que será la que realmente manejará el evento
    return function(...args) {
        const context = this;

        if (!lastRan) {
            // Si es la primera vez, ejecutar inmediatamente
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            // Limpiar cualquier temporizador pendiente
            clearTimeout(lastFunc);

            // Calcular el tiempo restante hasta la próxima ejecución permitida
            const timeSinceLastRun = Date.now() - lastRan;
            const timeToWait = limit - timeSinceLastRun;

            // Si el tiempo de espera ha pasado o es 0, ejecutar inmediatamente
            if (timeToWait <= 0) {
                lastRan = Date.now();
                func.apply(context, args);
            } else {
                // Si aún no ha pasado el límite, programar la ejecución al final del límite
                lastFunc = setTimeout(() => {
                    lastRan = Date.now();
                    func.apply(context, args);
                }, timeToWait);
            }
        }
    };
}


/**
 * 2. Lógica de Inicialización para la Demo
 * Aplica el patrón Throttle al evento 'scroll' de la ventana.
 */
document.addEventListener('DOMContentLoaded', () => {
    const rawCountElement = document.getElementById('raw-count');
    const throttledCountElement = document.getElementById('throttled-count');

    if (!rawCountElement || !throttledCountElement) {
        console.error('Elementos de la demo (contadores) no encontrados.');
        return;
    }

    let rawCount = 0;
    let throttledCount = 0;

    // Función que se dispara con cada evento de scroll (alta frecuencia)
    const handleRawScroll = () => {
        rawCount++;
        rawCountElement.textContent = rawCount;
        // Esta función se llama miles de veces por segundo.
    };

    // Función que se ejecuta con el límite de Throttle
    const handleThrottledUpdate = () => {
        throttledCount++;
        throttledCountElement.textContent = throttledCount;
        // Esta función se llama como máximo una vez cada 100ms.
    };

    // Crear la función limitada (throttled)
    const throttledScrollHandler = throttle(handleThrottledUpdate, 100);

    // Adjuntar los manejadores de eventos
    window.addEventListener('scroll', () => {
        handleRawScroll();          // Ejecución bruta
        throttledScrollHandler();   // Ejecución limitada
    });
});