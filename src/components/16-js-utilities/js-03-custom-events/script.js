/**
 * =========================================================
 * JS 03 - SCRIPT.JS (DEMO LOCAL)
 * Este script demuestra cómo un módulo EMITE y otro ESCUCHA
 * un Custom Event de forma desacoplada.
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Asegurarse de que la utilidad global esté disponible
    if (!window.UI_KIT_EVENTS) {
        console.error(
            "Error: UI_KIT_EVENTS no está cargado. Verifique JS/main.js"
        );
        return;
    }

    const { emit, on } = window.UI_KIT_EVENTS;
    const emitterBtn = document.getElementById("emitter-btn");
    const listenerOutput = document.getElementById("listener-output");
    const listenerBox = document.getElementById("listener-box");

    const CUSTOM_EVENT_NAME = "custom:order-placed";

    // ============================================
    // 1. MÓDULO EMISOR (El Botón)
    // ============================================

    if (emitterBtn) {
        emitterBtn.addEventListener("click", (e) => {
            e.preventDefault();

            // 1. Prepara la data que se va a enviar
            const orderData = {
                orderId: Math.floor(Math.random() * 100000),
                timestamp: new Date().toLocaleTimeString(),
                message: "¡Gracias por su compra!",
            };

            // 2. EMITIR el evento globalmente
            emit(CUSTOM_EVENT_NAME, orderData);

            // Feedback visual del emisor
            emitterBtn.textContent = `Evento Disparado (${orderData.timestamp})`;
            emitterBtn.disabled = true;
            setTimeout(() => {
                emitterBtn.textContent = `Disparar Evento Global (${CUSTOM_EVENT_NAME})`;
                emitterBtn.disabled = false;
            }, 2000);
        });
    }

    // ============================================
    // 2. MÓDULO RECEPTOR (La Caja de Estatus)
    // ============================================

    // Función que se ejecuta cuando se recibe el evento
    const handleOrderPlaced = (event) => {
        const { orderId, timestamp, message } = event.detail; // Los datos viajan en event.detail

        // 1. Actualiza el contenido del receptor
        listenerOutput.innerHTML = `
            <strong>Recibido:</strong> Orden #${orderId}
            <br> ${message} (a las ${timestamp})
        `;

        // 2. Feedback visual
        listenerBox.classList.add("is-active");
        setTimeout(() => {
            listenerBox.classList.remove("is-active");
        }, 1000);
    };

    // 3. ESCUCHAR el evento globalmente
    if (listenerBox) {
        on(CUSTOM_EVENT_NAME, handleOrderPlaced);
        listenerOutput.textContent = `Esperando el evento '${CUSTOM_EVENT_NAME}'...`;
    }
});
