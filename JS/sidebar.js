// ===========================================
// SIDEBAR.JS: INYECTA Y ACTIVA LA BARRA LATERAL (DEBUG)
// ===========================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Estructura de componentes (Usamos rutas ABSOLUTAS)
  const components = [
    {
      name: "Nav 01: Barra Simple (Flex)",
      path: "/src/components/01-navigation/nav-01/index.html",
    },
    {
      name: "Nav 02: Menú Hamburguesa",
      path: "/src/components/01-navigation/nav-02/index.html",
    },
    {
      name: "Nav 03: Menú de Pestañas (Tabs)",
      path: "/src/components/01-navigation/nav-03/index.html",
    },
    {
      name: "Nav 04: Menú con Dropdown (Desplegable)",
      path: "/src/components/01-navigation/nav-04/index.html",
    },
  ];

  const docsContainer = document.querySelector(".docs-container");

  // Si no se encuentra el contenedor principal, salimos.
  if (!docsContainer) {
    console
      .error
      //"Contenedor .docs-container no encontrado. El sidebar no puede inyectarse."
      ();
    return;
  }

  // --- CÓDIGO DE INYECCIÓN Y CONSTRUCCIÓN ---

  let sidebarHTML = `
        <aside class="docs-sidebar">
            <h3 >Componentes de Navegación</h3>
            <ul class="component-list">
    `;

  const currentPathname = window.location.pathname;

  components.forEach((component) => {
    const componentFolder = component.path.split("/").slice(-2)[0];
    const isActive = currentPathname.includes(componentFolder);

    const activeClass = isActive ? "is-active" : "";

    sidebarHTML += `
            <li><a href="${component.path}" class="${activeClass}">${component.name}</a></li>
        `;
  });

  sidebarHTML += `
            </ul>
        </aside>
    `;

  // 2. INSERCIÓN: Usamos beforebegin si el contenedor docs-container no tiene main dentro.
  // Usamos afterbegin si docs-container solo contiene el main.

  // Asumiremos la estructura: <div><aside><main>
  docsContainer.insertAdjacentHTML("afterbegin", sidebarHTML);

  // console.log("Sidebar inyectado con éxito en .docs-container");
});
