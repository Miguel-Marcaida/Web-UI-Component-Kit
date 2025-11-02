/**
 * =========================================================
 * MÓDULO: _EVENTS.JS
 * Contiene utilidades para la delegación de eventos y la comunicación
 * entre módulos mediante Custom Events (Eventos Personalizados).
 * =========================================================
 */

(function () {
    "use strict";

    // -----------------------------------------------------------------
    // CUSTOM EVENTS (TU CÓDIGO ORIGINAL)
    // -----------------------------------------------------------------

    function emit(name, data = {}) {
        const event = new CustomEvent(name, {
            detail: data,
            bubbles: true,
            cancelable: true,
        });
        document.dispatchEvent(event);
    }

    function on(name, callback) {
        document.addEventListener(name, callback);
    }

    function off(name, callback) {
        document.removeEventListener(name, callback);
    }

    // -----------------------------------------------------------------
    // DELEGACIÓN (ADICIÓN NECESARIA PARA EL CARRUSEL)
    // -----------------------------------------------------------------

    /**
     * Implementa la delegación de eventos. Permite escuchar un evento en un padre
     * y solo ejecutar el callback si el target coincide con el selector hijo.
     */
    function delegate(container, eventType, selector, callback) {
        container.addEventListener(eventType, function (e) {
            // target.closest(selector) encuentra el control (.carousel-control)
            const target = e.target.closest(selector);

            // Verifica si el target existe Y si pertenece al contenedor
            if (target && container.contains(target)) {
                callback(e);
            }
        });
    }

    // -----------------------------------------------------------------
    // REGISTRO EN EL CORE (ADICIÓN NECESARIA PARA GETMODULE)
    // -----------------------------------------------------------------

    const EventsModule = {
        emit: emit,
        on: on,
        off: off,
        delegate: delegate, // Exportamos la función que necesita el carrusel
    };

    // Registrar el módulo 'events' en el Core para que 'carousel.js' lo pueda obtener
    if (window.UI_KIT_CORE && window.UI_KIT_CORE.setModule) {
        window.UI_KIT_CORE.setModule("events", EventsModule);
    } else {
        // Fallback: Si el Core no existe, exponemos las funciones de forma global
        window.UI_KIT_EVENTS = EventsModule;
    }
})();
