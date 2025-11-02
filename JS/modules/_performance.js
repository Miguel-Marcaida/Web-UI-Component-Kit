/**
 * =========================================================
 * MÓDULO: _PERFORMANCE.JS
 * Contiene funciones para limitar la frecuencia de ejecución de otras funciones.
 * =========================================================
 */

(function () {
    /**
     * Retrasa la ejecución de una función hasta que ha transcurrido un tiempo
     * específico (delay) sin que se haya vuelto a llamar.
     * Útil para eventos de 'keyup' (búsqueda) o 'resize' (redimensionamiento).
     * @param {Function} func - La función a ejecutar.
     * @param {number} delay - El tiempo de espera en milisegundos.
     * @returns {Function} La función con debounce aplicado.
     */
    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    /**
     * Limita la ejecución de una función a una vez cada cierto período de tiempo (limit).
     * Útil para eventos de 'scroll' o 'mousemove'.
     * @param {Function} func - La función a ejecutar.
     * @param {number} limit - El tiempo de espera mínimo entre ejecuciones en milisegundos.
     * @returns {Function} La función con throttle aplicado.
     */
    function throttle(func, limit) {
        let lastRan;
        let lastArgs;
        let lastThis;
        return function (...args) {
            if (!lastRan) {
                // Ejecutar inmediatamente la primera vez
                func.apply(this, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastRan);
                lastThis = this;
                lastArgs = args;
                // Programar la ejecución para el final del límite
                lastRan = setTimeout(() => {
                    if (Date.now() - lastRan >= limit) {
                        func.apply(lastThis, lastArgs);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    }

    // Exportar las funciones para que puedan ser usadas por otros módulos o inicializadas.
    window.UI_KIT_PERFORMANCE = {
        debounce: debounce,
        throttle: throttle,
    };
})();
