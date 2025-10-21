// ===========================================
// MODAL-01-BASE: FUNCIONALIDAD
// ===========================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Elementos clave
  const modal = document.getElementById("base-modal");
  const openBtn = document.getElementById("open-modal-btn");

  // 2. Elementos de cierre
  const closeButtons = document.querySelectorAll(
    ".modal__close, .modal__close-btn"
  );
  const backdrop = modal ? modal.querySelector(".modal__backdrop") : null;

  // Función para abrir el modal
  function openModal() {
    if (!modal) return;

    // Muestra el modal (sobrescribe display:none en el HTML)
    modal.style.display = "flex";

    // Accesibilidad: Asegura que el foco esté dentro del modal
    modal.setAttribute("aria-hidden", "false");

    // Opcional: enfocar el primer elemento interactivo para accesibilidad
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    // Previene el scroll del body principal
    document.body.style.overflow = "hidden";
  }

  // Función para cerrar el modal
  function closeModal() {
    if (!modal) return;

    // Oculta el modal
    modal.style.display = "none";

    // Accesibilidad
    modal.setAttribute("aria-hidden", "true");

    // Restaura el scroll del body
    document.body.style.overflow = "";

    // Devuelve el foco al botón que lo abrió
    openBtn.focus();
  }

  // 3. LISTENERS

  // Botón de Abrir
  if (openBtn) {
    openBtn.addEventListener("click", openModal);
  }

  // Botones de Cerrar (X, Cancelar)
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  // Clic en el Backdrop
  if (backdrop) {
    backdrop.addEventListener("click", closeModal);
  }

  // Tecla ESC para cerrar (Accesibilidad)
  document.addEventListener("keydown", (e) => {
    // Solo si el modal está visible
    if (modal && modal.style.display === "flex" && e.key === "Escape") {
      closeModal();
    }
  });
});
