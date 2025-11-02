/**
 * =========================================================
 * MÓDULO: _EVENTS.JS
 * Contiene utilidades para la comunicación entre módulos
 * mediante Custom Events (Eventos Personalizados).
 * =========================================================
 */

(function () {
    /**
     * Emite (dispara) un evento personalizado en el Documento.
     * @param {string} name - Nombre del evento (ej. 'modal:closed').
     * @param {object} data - Datos a adjuntar al evento (accesibles en event.detail).
     */
    function emit(name, data = {}) {
        // Creamos un nuevo CustomEvent
        const event = new CustomEvent(name, {
            detail: data, // Adjuntamos los datos al objeto 'detail'
            bubbles: true, // Permitimos que el evento suba por el DOM
            cancelable: true,
        });

        // Disparamos el evento en el Documento (ámbito global)
        document.dispatchEvent(event);
    }

    /**
     * Añade un escuchador para un evento personalizado.
     * @param {string} name - Nombre del evento.
     * @param {Function} callback - Función a ejecutar cuando se reciba el evento.
     */
    function on(name, callback) {
        // Escuchamos el evento en el Documento
        document.addEventListener(name, callback);
    }

    /**
     * Remueve un escuchador de eventos.
     */
    function off(name, callback) {
        document.removeEventListener(name, callback);
    }

    // Exportar las funciones de Eventos
    window.UI_KIT_EVENTS = {
        emit: emit,
        on: on,
        off: off,
    };
})();
