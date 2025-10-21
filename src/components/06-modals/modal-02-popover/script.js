// ===========================================
// MODAL-02-POPOVER: FUNCIONALIDAD Y POSICIONAMIENTO
// ===========================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Selecciona todos los botones que activan un popover
  const popoverButtons = document.querySelectorAll("[data-popover-target]");

  // 2. Función para calcular y aplicar la posición
  function positionPopover(button, popover) {
    // Obtiene las dimensiones y posición del botón activador
    const btnRect = button.getBoundingClientRect();
    // Obtiene las dimensiones del popover
    const popoverRect = popover.getBoundingClientRect();

    // Inicializa las coordenadas (se calcularán según la dirección)
    let top = 0;
    let left = 0;

    // Determina la posición base (definida por la clase CSS)
    const positionClass = Array.from(popover.classList).find((cls) =>
      cls.startsWith("popover--")
    );

    switch (positionClass) {
      case "popover--bottom":
        // Centrado horizontalmente + 10px de margen debajo
        top = btnRect.bottom + 10;
        left = btnRect.left + btnRect.width / 2 - popoverRect.width / 2;
        break;
      case "popover--top":
        // Centrado horizontalmente + 10px de margen arriba
        top = btnRect.top - popoverRect.height - 10;
        left = btnRect.left + btnRect.width / 2 - popoverRect.width / 2;
        break;
      case "popover--right":
        // Centrado verticalmente + 10px de margen a la derecha
        top = btnRect.top + btnRect.height / 2 - popoverRect.height / 2;
        left = btnRect.right + 10;
        break;
      case "popover--left":
        // Centrado verticalmente + 10px de margen a la izquierda
        top = btnRect.top + btnRect.height / 2 - popoverRect.height / 2;
        left = btnRect.left - popoverRect.width - 10;
        break;
      default:
        // Fallback (ej: centrado arriba)
        top = btnRect.bottom + 10;
        left = btnRect.left;
    }

    // Aplica las coordenadas (usamos position: fixed para simplificar el cálculo)
    popover.style.top = `${top + window.scrollY}px`; // Ajuste por scroll vertical
    popover.style.left = `${left + window.scrollX}px`; // Ajuste por scroll horizontal
    popover.style.position = "absolute"; // Usamos absolute para anclar al documento
  }

  // 3. Función de Toggle (Abrir/Cerrar)
  function togglePopover(button, popover) {
    const isHidden =
      popover.style.display === "none" || popover.style.display === "";

    // Cierra todos los demás popovers abiertos
    document.querySelectorAll(".popover").forEach((p) => {
      if (p !== popover) {
        p.style.display = "none";
        p.setAttribute("aria-hidden", "true");
      }
    });

    if (isHidden) {
      positionPopover(button, popover);
      popover.style.display = "block";
      popover.setAttribute("aria-hidden", "false");
    } else {
      popover.style.display = "none";
      popover.setAttribute("aria-hidden", "true");
    }
  }

  // 4. LISTENERS DE ACTIVACIÓN

  popoverButtons.forEach((button) => {
    const targetId = button.getAttribute("data-popover-target");
    const popover = document.getElementById(targetId);

    if (!popover) return;

    // Listener para Click (Típico de Popovers con contenido interactivo)
    button.addEventListener("click", (e) => {
      e.preventDefault();
      togglePopover(button, popover);
    });

    // Listeners para Hover (Típico de Tooltips) - Solo para el ejemplo 2
    if (button.id === "popover-btn-2") {
      button.addEventListener("mouseenter", () =>
        togglePopover(button, popover)
      );
      button.addEventListener("mouseleave", () =>
        togglePopover(button, popover)
      );
    }
  });

  // 5. LISTENER DE CIERRE GLOBAL (Al hacer clic en cualquier parte fuera del popover)
  document.addEventListener("click", (e) => {
    const openPopovers = document.querySelectorAll(
      '.popover:not([style*="display: none"])'
    );

    openPopovers.forEach((popover) => {
      // Verifica si el clic fue dentro del popover o en su botón activador
      const button = document.querySelector(
        `[data-popover-target="${popover.id}"]`
      );

      if (
        !popover.contains(e.target) &&
        (!button || !button.contains(e.target))
      ) {
        popover.style.display = "none";
        popover.setAttribute("aria-hidden", "true");
      }
    });
  });
});
