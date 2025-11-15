/*
 * Archivo: script.js
 * Ubicación: /src/components/14-widgets/widget-02-collapse/
 * Descripción: Funcionalidad de Colapsable (múltiples paneles abiertos a la vez).
 */

function collapseLogic() {
  // Función central para abrir o cerrar un panel con transición suave
  function togglePanel(button, collapse) {
    // Verifica si el panel está actualmente abierto
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
      // ==================
      // CIERRA el panel
      // ==================

      // 1. Establece la altura explícita (desde scrollHeight)
      collapse.style.height = collapse.scrollHeight + "px";

      // 2. Fuerza un reflow (Crucial para el cierre)
      void collapse.offsetWidth;

      // 3. Establece la altura final a 0 para iniciar la animación CSS
      collapse.style.height = "0px";

      // 4. Actualiza atributos ARIA
      button.setAttribute("aria-expanded", "false");
      button.classList.add("collapsed");
    } else {
      // ==================
      // ABRE el panel
      // ==================

      // 1. Establece la altura a scrollHeight
      collapse.style.height = collapse.scrollHeight + "px";

      // 2. Espera 1000ms antes de añadir el listener transitionend
      // Esto asegura que la transición inicie antes de que se adjunte el listener.
      setTimeout(() => {
        collapse.addEventListener(
          "transitionend",
          function removeHeightStyle() {
            // Solo elimina el height si todavía está abierto
            if (button.getAttribute("aria-expanded") === "true") {
              collapse.style.height = null;
            }
            collapse.removeEventListener("transitionend", removeHeightStyle);
          },
          { once: true }
        );
      }, 1000); // <-- VALOR AJUSTADO (1s)

      // 3. Actualiza atributos ARIA
      button.setAttribute("aria-expanded", "true");
      button.classList.remove("collapsed");
    }
  }

  // Inicializa todos los botones de colapsable (Manejo del CLIC)
  const collapseButtons = document.querySelectorAll(".collapse-button");

  collapseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-collapse-target");
      const targetCollapse = document.querySelector(targetId);

      // Alterna el panel actual (NO hay lógica para cerrar otros paneles)
      togglePanel(button, targetCollapse);
    });
  });

  // ===================================
  // MANEJO DEL ESTADO INICIAL
  // ===================================
  document
    .querySelectorAll(".collapse-content.is-expanded")
    .forEach((collapse) => {
      const button =
        collapse.previousElementSibling.querySelector(".collapse-button");

      // 1. Deshabilitar temporalmente la transición para asegurar que la altura se aplique
      collapse.style.transition = "none";

      // 2. Establecer la altura correcta (scroll-height) de inmediato
      collapse.style.height = collapse.scrollHeight + "px";

      // 3. Forzar el reflow
      void collapse.offsetWidth;

      // 4. Limpiar la clase de estado inicial
      collapse.classList.remove("is-expanded");

      // 5. Restablecer la transición DESPUÉS de un pequeño retraso
      setTimeout(() => {
        collapse.style.transition = "";
      }, 10);

      // 6. Sincroniza ARIA y clases de botón
      button.setAttribute("aria-expanded", "true");
      button.classList.remove("collapsed");
    });
}

// Ejecuta la lógica al cargar el DOM
document.addEventListener("DOMContentLoaded", collapseLogic);
