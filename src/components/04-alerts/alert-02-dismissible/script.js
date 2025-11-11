/**
 * MÓDULO AUTÓNOMO: Alerta 02 - Con Cierre (Dismissible)
 *
 * Funcionalidad:
 * 1. Asegura que la alerta sea visible al cargar el DOM (añadiendo .is-active).
 * 2. Gestiona el evento de clic en el botón .alert__close para ocultar la alerta.
 * * Nota: El CSS gestiona la transición de opacidad.
 */

document.addEventListener("DOMContentLoaded", () => {
    const alerts = document.querySelectorAll(".alert--dismissible");
    const closeButtons = document.querySelectorAll(".alert__close");

    // 1. Mostrar todas las alertas al cargar (ya que el CSS las oculta por defecto)
    alerts.forEach((alert) => {
        // Hacemos que sea visible
        alert.classList.add("is-active");

        // Escucha el fin de la transición. Si se ha cerrado (opacity: 0), la remueve del DOM.
        alert.addEventListener("transitionend", (e) => {
            if (e.propertyName === "opacity" && !alert.classList.contains("is-active")) {
                alert.remove();
            }
        });
    });

    // 2. Gestionar el cierre
    closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // Encuentra el componente padre más cercano con la clase .alert
            const alertToClose = button.closest(".alert");

            if (alertToClose) {
                // Remueve la clase .is-active para iniciar la transición CSS (ocultar)
                alertToClose.classList.remove("is-active");
            }
        });
    });
});
