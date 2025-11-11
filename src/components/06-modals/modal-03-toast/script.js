/**
 * Módulo: Modal 03: Alerta Fija (Toast)
 * Descripción: Implementa una API de JavaScript para crear, mostrar y ocultar
 * notificaciones Toast de forma dinámica.
 */

document.addEventListener("DOMContentLoaded", () => {
    const toastWrapper = document.getElementById("toast-wrapper");
    if (!toastWrapper) {
        console.error("Toast Wrapper no encontrado. Asegúrese de que el elemento #toast-wrapper existe.");
        return;
    }

    /**
     * Define las propiedades y contenido para cada tipo de Toast.
     */
    const toastTemplates = {
        success: {
            title: "¡Éxito!",
            message: "La operación se completó correctamente.",
            icon: "fas fa-check-circle",
            duration: 3000, // 3 segundos
        },
        error: {
            title: "¡Error!",
            message: "Ocurrió un problema inesperado. Intente de nuevo.",
            icon: "fas fa-exclamation-triangle",
            duration: 5000, // 5 segundos
        },
        info: {
            title: "Información",
            message: "Esta es una notificación informativa importante.",
            icon: "fas fa-info-circle",
            duration: 0, // 0 significa cierre manual
        },

        warning: {
            // Añadir este template
            title: "Advertencia",
            message: "Revise su información antes de continuar.",
            icon: "fas fa-exclamation-circle",
            duration: 4000,
        },
    };

    /**
     * Remueve el Toast del DOM después de la animación de salida.
     */
    const removeToast = (toastElement) => {
        if (!toastElement) return;

        // 1. Inicia la animación de salida
        toastElement.classList.remove("is-active");
        toastElement.classList.add("is-exiting");

        // 2. Espera la duración de la transición CSS (0.3s) y elimina el Toast
        setTimeout(() => {
            if (toastElement.parentNode) {
                toastElement.parentNode.removeChild(toastElement);
            }
        }, 300);
    };

    /**
     * Crea e inyecta un nuevo Toast en el contenedor.
     */
    const createToast = (type) => {
        const template = toastTemplates[type];
        if (!template) return;

        // 1. Crear el elemento Toast
        const toast = document.createElement("div");
        toast.classList.add("toast", `toast--${type}`);
        toast.setAttribute("role", "alert");
        toast.setAttribute("aria-live", "polite");

        // 2. Definir el HTML interno del Toast
        toast.innerHTML = `
            <div class="toast__icon"><i class="${template.icon}"></i></div>
            <div class="toast__body">
                <h5 class="toast__title">${template.title}</h5>
                <p class="toast__message">${template.message}</p>
            </div>
            ${
                template.duration !== 0
                    ? `<button class="toast__close" aria-label="Cerrar notificación" data-toast-close>
                    <i class="fas fa-times"></i>
                </button>`
                    : ""
            }
        `;

        // 3. Añadir el evento de cierre al botón
        const closeButton = toast.querySelector("[data-toast-close]");
        if (closeButton) {
            closeButton.addEventListener("click", () => removeToast(toast));
        }

        // 4. Inyectar en el wrapper (Se inserta al inicio para que se vea abajo, gracias a flex-direction: column-reverse en el CSS)
        toastWrapper.insertBefore(toast, toastWrapper.firstChild);

        // 5. Esperar un breve momento (necesario para que la transición CSS funcione)
        setTimeout(() => {
            toast.classList.add("is-active");
        }, 10);

        // 6. Configurar la auto-eliminación si la duración es > 0
        if (template.duration > 0) {
            setTimeout(() => {
                removeToast(toast);
            }, template.duration);
        }
    };

    // ===================================
    // API expuesta (para uso fuera del módulo, si fuera necesario)
    // window.ToastAPI = { createToast };
    // ===================================

    // ===================================
    // Activación por botones de documentación (data-toast-trigger)
    // ===================================
    document.querySelectorAll("[data-toast-trigger]").forEach((button) => {
        button.addEventListener("click", () => {
            const type = button.getAttribute("data-toast-trigger");
            createToast(type);
        });
    });

    // Delegación de eventos para el botón de cierre (solo necesario si el toast se cierra manualmente)
    toastWrapper.addEventListener("click", (event) => {
        const target = event.target.closest("[data-toast-close]");
        if (target) {
            const toastElement = target.closest(".toast");
            removeToast(toastElement);
        }
    });
});
