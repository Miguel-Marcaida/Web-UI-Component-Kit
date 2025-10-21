// ===========================================
// ALERTA CERRABLE (DISMISSIBLE) LÓGICA
// ===========================================

document.addEventListener("DOMContentLoaded", () => {
  const closeButtons = document.querySelectorAll(".alert-close-btn");

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Busca el elemento padre más cercano con la clase 'alert'
      const alertElement = button.closest(".alert");

      if (alertElement) {
        // Remueve la alerta al hacer clic
        alertElement.remove();
      }
    });
  });
});
