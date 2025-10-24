document.addEventListener("DOMContentLoaded", () => {
  // Escucha clics en todos los botones de navegación con la clase 'nav-link'
  const navLinks = document.querySelectorAll(".nav-link");
  // Selecciona todos los paneles de contenido de las pestañas
  const tabPanes = document.querySelectorAll(".tab-pane");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // 1. Desactivar todos los links y paneles
      navLinks.forEach((l) => {
        l.classList.remove("active");
        l.setAttribute("aria-selected", "false");
      });
      tabPanes.forEach((p) => p.classList.remove("active"));

      // 2. Activar el link clickeado
      link.classList.add("active");
      link.setAttribute("aria-selected", "true");

      // 3. Mostrar el panel asociado
      const targetId = link.getAttribute("data-target");
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add("active");
      }
    });
  });
});
