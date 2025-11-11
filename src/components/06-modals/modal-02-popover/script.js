/**
 * Módulo: Modal 02: Popover / Tooltip (Autónomo)
 * Descripción: Maneja la lógica de abrir y cerrar popovers/tooltips basados
 * en triggers 'click' o 'hover'.
 *
 * Utiliza los atributos:
 * - data-popover-target: Selector CSS del popover (e.g., "#mi-popover")
 * - data-popover-trigger: Define el tipo de interacción ('click' o 'hover')
 */

document.addEventListener("DOMContentLoaded", () => {
    // Función central para cambiar el estado (clase 'is-active')
    const togglePopover = (targetElement, show) => {
        if (!targetElement) return;

        const isVisible = targetElement.classList.contains("is-active");
        const newState = show !== undefined ? show : !isVisible;

        if (newState) {
            // Cierra cualquier otro popover abierto para evitar solapamientos
            document.querySelectorAll(".popover.is-active").forEach((openPopover) => {
                if (openPopover !== targetElement) {
                    openPopover.classList.remove("is-active");
                }
            });

            // Abrir
            targetElement.classList.add("is-active");
            targetElement.setAttribute("aria-hidden", "false");

            // Opcional: enfocar el popover si es interactivo (para accesibilidad)
            // targetElement.focus();
        } else {
            // Cerrar
            targetElement.classList.remove("is-active");
            targetElement.setAttribute("aria-hidden", "true");
        }
    };

    // ===================================
    // 1. Manejo de Eventos (Delegación)
    // ===================================

    document.querySelectorAll("[data-popover-target]").forEach((trigger) => {
        const targetSelector = trigger.getAttribute("data-popover-target");
        const targetPopover = document.querySelector(targetSelector);

        if (!targetPopover) return;

        const triggerType = trigger.getAttribute("data-popover-trigger") || "click";

        if (triggerType === "click") {
            // A. Trigger por CLICK
            trigger.addEventListener("click", (event) => {
                event.preventDefault();
                togglePopover(targetPopover);
            });
        } else if (triggerType === "hover") {
            // B. Trigger por HOVER (Tooltips)
            let hideTimeout;

            const showHandler = () => {
                clearTimeout(hideTimeout);
                togglePopover(targetPopover, true);
            };

            const hideHandler = () => {
                // Pequeño retraso para permitir movimiento del cursor entre trigger y popover
                hideTimeout = setTimeout(() => {
                    togglePopover(targetPopover, false);
                }, 100);
            };

            // Mostrar al entrar al trigger
            trigger.addEventListener("mouseenter", showHandler);
            trigger.addEventListener("focus", showHandler); // Para accesibilidad

            // Ocultar al salir del trigger
            trigger.addEventListener("mouseleave", hideHandler);
            trigger.addEventListener("blur", hideHandler); // Para accesibilidad

            // Evitar que se cierre si el mouse entra al popover
            targetPopover.addEventListener("mouseenter", () => clearTimeout(hideTimeout));
            targetPopover.addEventListener("mouseleave", hideHandler);
        }
    });

    // ===================================
    // 2. Cierre Global (Click fuera) - Solo para 'click' Popovers
    // ===================================
    document.addEventListener("click", (event) => {
        document.querySelectorAll(".popover.is-active").forEach((openPopover) => {
            const popoverId = openPopover.id;
            // Encontrar el elemento que activó este popover
            const trigger = document.querySelector(`[data-popover-target="#${popoverId}"]`);

            if (!trigger || trigger.getAttribute("data-popover-trigger") !== "click") {
                // No cerramos automáticamente los tooltips (hover)
                return;
            }

            // Si el clic no fue dentro del popover NI en el elemento que lo activó
            if (!openPopover.contains(event.target) && !trigger.contains(event.target)) {
                togglePopover(openPopover, false);
            }
        });
    });
});
