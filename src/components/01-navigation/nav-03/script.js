document.addEventListener("DOMContentLoaded", () => {
  // Seleccionamos los elementos clave
  const tabList = document.querySelector(".tab-list");

  // Solo ejecutamos la lógica si la lista de pestañas existe
  if (tabList) {
    // Función principal que maneja el cambio de pestaña
    const switchTab = (newTab) => {
      // 1. Obtener la pestaña y el panel activos actualmente
      const currentActiveTab = tabList.querySelector(
        ".tab-list__item.is-active"
      );

      // Si la pestaña clickeada ya está activa, no hacemos nada
      if (currentActiveTab === newTab) {
        return;
      }

      const currentActivePanelId =
        currentActiveTab.getAttribute("aria-controls");
      const currentActivePanel = document.getElementById(currentActivePanelId);

      // 2. DESACTIVAR: Remover estados activos de la pestaña anterior
      currentActiveTab.classList.remove("is-active");
      currentActiveTab.setAttribute("aria-selected", "false");
      currentActiveTab.setAttribute("tabindex", "-1");

      // 3. DESACTIVAR: Ocultar el panel anterior (A11Y)
      if (currentActivePanel) {
        currentActivePanel.setAttribute("hidden", "true");
      }

      // 4. ACTIVAR: Aplicar estados activos a la nueva pestaña
      newTab.classList.add("is-active");
      newTab.setAttribute("aria-selected", "true");
      newTab.setAttribute("tabindex", "0"); // Hacemos que sea focusable

      // 5. ACTIVAR: Mostrar el nuevo panel (A11Y)
      const newPanelId = newTab.getAttribute("aria-controls");
      const newPanel = document.getElementById(newPanelId);

      if (newPanel) {
        newPanel.removeAttribute("hidden");
      }

      // 6. Opcional: Dar foco a la nueva pestaña (Mejora la UX/A11Y)
      newTab.focus();
    };

    // 7. Listener principal en el contenedor de pestañas
    tabList.addEventListener("click", (event) => {
      const clickedElement = event.target.closest(".tab-list__item");

      // Si el elemento clickeado es una pestaña, cambiamos
      if (clickedElement) {
        switchTab(clickedElement);
      }
    });
  }
});
