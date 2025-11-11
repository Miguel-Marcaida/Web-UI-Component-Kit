/**
 * Módulo: Modal 01: Modal Base (Autónomo)
 * Descripción: Manejo de la lógica de abrir, cerrar y accesibilidad para modales.
 * Usa atributos data-modal-target y data-modal-close.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Función central para cambiar el estado del modal (abierto/cerrado)
    const toggleModal = (modalElement, isOpening) => {
        if (!modalElement) return;

        const isCurrentlyOpen = modalElement.getAttribute("aria-hidden") === "false";

        // Determinar el nuevo estado
        const newState = isOpening !== undefined ? isOpening : !isCurrentlyOpen;

        if (newState) {
            // ABRIR MODAL
            modalElement.setAttribute("aria-hidden", "false");
            // Mover el foco al modal para cumplir con la accesibilidad
            // Se puede enfocar el propio diálogo o el botón de cierre. Enfocaremos el diálogo.
            modalElement.querySelector(".modal__dialog").focus();
            // Bloquear el scroll del body
            document.body.style.overflow = "hidden";
        } else {
            // CERRAR MODAL
            modalElement.setAttribute("aria-hidden", "true");
            // Desbloquear el scroll del body
            document.body.style.overflow = "";
            // Si el modal se cierra, devolver el foco al botón que lo abrió si es posible (no implementado aquí por simplicidad, pero recomendado en producción)
        }
    };

    // ===================================
    // 1. Manejo de Apertura (Botones de activación)
    // ===================================
    document.querySelectorAll("[data-modal-target]").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const targetSelector = button.getAttribute("data-modal-target");
            const modal = document.querySelector(targetSelector);
            if (modal) {
                toggleModal(modal, true);
            }
        });
    });

    // ===================================
    // 2. Manejo de Cierre (Botones de cierre y Overlay)
    // ===================================
    document.querySelectorAll("[data-modal-close]").forEach((closer) => {
        closer.addEventListener("click", (event) => {
            event.preventDefault();

            // Buscar el modal contenedor más cercano (elemento con clase .modal)
            let modalToClose = closer.closest(".modal");

            if (modalToClose) {
                toggleModal(modalToClose, false);
            }
        });
    });

    // ===================================
    // 3. Manejo de Tecla ESCAPE
    // ===================================
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            // Buscar cualquier modal que esté abierto (aria-hidden="false")
            const openModal = document.querySelector('.modal[aria-hidden="false"]');

            if (openModal) {
                toggleModal(openModal, false);
            }
        }
    });

    // Se recomienda añadir la propiedad tabindex="-1" al modal__dialog
    // en el HTML para que pueda recibir el foco via JS.
});
