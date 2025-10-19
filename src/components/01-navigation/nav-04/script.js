/**
 * Lógica para la gestión del menú Dropdown (Nav 04).
 * Se encarga de abrir/cerrar el menú, gestionar el estado ARIA y el cierre al hacer clic fuera.
 */
function initNav04Dropdown() {
  // 1. Selecciona todos los botones que activan un dropdown.
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  // Función auxiliar para cerrar un menú desplegable específico
  function closeDropdown(toggleElement) {
    // Encuentra el <li> padre, que es el que tiene la clase de estado 'is-open'
    const parentItem = toggleElement.closest(".dropdown-item");

    // Actualiza el estado visual y ARIA
    toggleElement.setAttribute("aria-expanded", "false");
    parentItem.classList.remove("is-open");
  }

  // Función auxiliar para abrir un menú desplegable específico
  function openDropdown(toggleElement) {
    const parentItem = toggleElement.closest(".dropdown-item");

    // Actualiza el estado visual y ARIA
    toggleElement.setAttribute("aria-expanded", "true");
    parentItem.classList.add("is-open");
  }

  // Función para cerrar todos los dropdowns activos, excluyendo opcionalmente uno
  function closeAllDropdowns(excludeToggle = null) {
    // Busca todos los botones de dropdown que están marcados como abiertos
    document
      .querySelectorAll(".dropdown-item.is-open .dropdown-toggle")
      .forEach((toggle) => {
        if (toggle !== excludeToggle) {
          closeDropdown(toggle);
        }
      });
  }

  // 2. Asigna el evento de clic a cada botón de dropdown
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      // Detiene la propagación para evitar que el evento se propague al 'document'
      // y lo cierre inmediatamente (ver punto 3)
      event.stopPropagation();

      const isExpanded = toggle.getAttribute("aria-expanded") === "true";

      // Cierra todos los otros dropdowns antes de operar sobre el actual.
      // Si el actual está abierto, lo excluimos de este cierre para que el toggle de abajo lo cierre.
      closeAllDropdowns(isExpanded ? null : toggle);

      // Alterna el estado del dropdown actual
      if (isExpanded) {
        closeDropdown(toggle);
      } else {
        openDropdown(toggle);
      }
    });
  });

  // 3. Cierre al hacer clic fuera: Asigna un evento de clic a todo el documento
  document.addEventListener("click", () => {
    closeAllDropdowns();
  });

  // 4. Cierre con la tecla Escape (Accesibilidad)
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllDropdowns();
    }
  });
}

// Inicializa la funcionalidad al cargar el script
initNav04Dropdown();
