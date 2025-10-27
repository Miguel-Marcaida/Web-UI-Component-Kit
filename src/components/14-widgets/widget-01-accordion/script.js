/*
 * Archivo: script.js
 * Ubicación: /src/components/14-widgets/widget-01-accordion/
 * Descripción: Funcionalidad de Acordeón exclusivo (solo un panel abierto a la vez).
 */

function accordionLogic() {
  
function togglePanel(button, collapse) {
  const isExpanded = button.getAttribute("aria-expanded") === "true";

  if (isExpanded) {
    // ==================
    // CIERRA el panel (Item 1 cuando haces clic en Item 2)
    // ==================

    // 1. Establece la altura explícita (desde scrollHeight)
    collapse.style.height = collapse.scrollHeight + "px";

    // 2. Fuerza un reflow
    void collapse.offsetWidth;

    // 3. Establece la altura final a 0 para iniciar la animación CSS
    // 🔑 SINTAXIS CRUCIAL: Debe ser '0px' para el cierre.
    collapse.style.height = "0px";

    // 4. Actualiza atributos ARIA
    button.setAttribute("aria-expanded", "false");
    button.classList.add("collapsed");
  } else {
    // ==================
    // ABRE el panel (Item 2)
    // ==================

    // 1. Establece la altura a scrollHeight
    collapse.style.height = collapse.scrollHeight + "px";

    // 2. Espera 10ms antes de añadir el listener transitionend
    // Esto evita el cierre instantáneo al abrir.
    setTimeout(() => {
      collapse.addEventListener(
        "transitionend",
        function removeHeightStyle() {
          // Solo elimina el height si todavía está abierto
          if (button.getAttribute("aria-expanded") === "true") {
            collapse.style.height = null; // Borra el style en línea (deja 'style' vacío)
          }
          collapse.removeEventListener("transitionend", removeHeightStyle);
        },
        { once: true }
      );
    }, 1000); // 10ms es el tiempo mínimo de seguridad.

    // 3. Actualiza atributos ARIA
    button.setAttribute("aria-expanded", "true");
    button.classList.remove("collapsed");
  }
}


  // Inicializa todos los botones de acordeón (Manejo del CLIC)
  const accordionButtons = document.querySelectorAll(".accordion-button");

  accordionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-accordion-target");
      const targetCollapse = document.querySelector(targetId);
      const parentAccordion = button.closest(".accordion");

      // 1. Manejo Exclusivo: Cierra otros paneles abiertos en el mismo contenedor
      if (button.getAttribute("aria-expanded") === "false" && parentAccordion) {
        const openSiblings = parentAccordion.querySelectorAll(
          '.accordion-button[aria-expanded="true"]'
        );

        openSiblings.forEach((siblingButton) => {
          const siblingTargetId = siblingButton.getAttribute(
            "data-accordion-target"
          );
          const siblingCollapse = document.querySelector(siblingTargetId);

          if (siblingButton !== button) {
            togglePanel(siblingButton, siblingCollapse);
          }
        });
      }

      // 2. Alterna el panel actual
      togglePanel(button, targetCollapse);
    });
  });

  // ===================================
  // MANEJO DEL ESTADO INICIAL (Nuevo Bloque)
  // ===================================
  document
    .querySelectorAll(".accordion-collapse.is-expanded")
    .forEach((collapse) => {
      const button =
        collapse.previousElementSibling.querySelector(".accordion-button");

      // 1. Deshabilitar temporalmente la transición para asegurar que la altura se aplique
      collapse.style.transition = "none";

      // 2. Establecer la altura correcta (scroll-height) de inmediato
      // 🔑 CLAVE: Dejamos la altura fijada para que el panel se mantenga abierto.
      collapse.style.height = collapse.scrollHeight + "px";

      // 3. Forzar el reflow para aplicar la altura
      void collapse.offsetWidth;

      // 4. Limpiar la clase de estado inicial
      collapse.classList.remove("is-expanded");

      // 5. Restablecer la transición DESPUÉS de un pequeño retraso
      // Usamos un retraso mínimo solo para que el navegador "olvide" el 'transition: none'
      setTimeout(() => {
        collapse.style.transition = "";
      }, 10); // 10ms es suficiente para que se registre el cambio

      // 6. Sincroniza ARIA y clases de botón
      button.setAttribute("aria-expanded", "true");
      button.classList.remove("collapsed");
    });
}

// Ejecuta la lógica al cargar el DOM
document.addEventListener("DOMContentLoaded", accordionLogic);
