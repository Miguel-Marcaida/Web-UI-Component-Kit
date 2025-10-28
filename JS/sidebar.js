// ===========================================
// SIDEBAR.JS: INYECTA Y ACTIVA LA BARRA LATERAL CONTEXTUAL
// ===========================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. ESTRUCTURA COMPLETA DEL CATÁLOGO
    // Usamos rutas ABSOLUTAS para la inyección.
    const componentCatalog = {
        "01-navigation": {
            title: "Módulo 01: Navegación",
            components: [
                {
                    name: "01. Barra Simple (Flex)",
                    path: "/src/components/01-navigation/nav-01/index.html",
                },
                {
                    name: "02. Menú Hamburguesa",
                    path: "/src/components/01-navigation/nav-02/index.html",
                },
                {
                    name: "03. Menú de Pestañas (Tabs)",
                    path: "/src/components/01-navigation/nav-03/index.html",
                },
                {
                    name: "04. Menú con Dropdown",
                    path: "/src/components/01-navigation/nav-04/index.html",
                },
                {
                    name: "05. Menú Píldora",
                    path: "/src/components/01-navigation/nav-05/index.html",
                },
            ],
        },
        "02-forms": {
            title: "Módulo 02: Formularios",
            components: [
                {
                    name: "01. Text Inputs",
                    path: "/src/components/02-forms/form-01-input-text/index.html",
                },
                {
                    name: "02. Textarea",
                    path: "/src/components/02-forms/form-02-textarea/index.html",
                },
                {
                    name: "03. Select/Dropdown",
                    path: "/src/components/02-forms/form-03-select/index.html",
                },
                {
                    name: "04. Checkboxes & Radios",
                    path: "/src/components/02-forms/form-04-checkbox-radio/index.html",
                },
            ],
        },
        // CÓDIGO A INSERTAR EN SIDEBAR.JS
        "03-buttons": {
            title: "Módulo 03: Botones",
            components: [
                {
                    name: "01. Botón Base",
                    path: "/src/components/03-buttons/btn-01-base/index.html",
                },
                {
                    name: "02. Botones de Icono",
                    path: "/src/components/03-buttons/btn-02-icon/index.html",
                },
                {
                    name: "03. Grupos y Toggle",
                    path: "/src/components/03-buttons/btn-03-group-toggle/index.html",
                },
                {
                    name: "04. Botones Flotantes (FAB)",
                    path: "/src/components/03-buttons/btn-04-fab/index.html",
                },
            ],
        },

        "04-alerts": {
            title: "Módulo 04: Alertas",
            components: [
                {
                    name: "01. Alertas Base",
                    path: "/src/components/04-alerts/alert-01-base/index.html",
                },
                {
                    name: "02. Alertas con Cierre",
                    path: "/src/components/04-alerts/alert-02-dismissible/index.html",
                },
            ],
        },
        "05-cards": {
            title: "Módulo 05: Tarjetas",
            components: [
                {
                    name: "01. Tarjeta Base",
                    path: "/src/components/05-cards/card-01-base/index.html",
                },
                {
                    name: "02. Tarjeta con Media",
                    path: "/src/components/05-cards/card-02-media/index.html",
                },
            ],
        },
        "06-modals": {
            title: "Módulo 06: Modales",
            components: [
                {
                    name: "01. Modal Base",
                    path: "/src/components/06-modals/modal-01-base/index.html",
                },
                {
                    name: "02. Popover/Tooltip",
                    path: "/src/components/06-modals/modal-02-popover/index.html",
                },
            ],
        },
        "07-indicators": {
            title: "Módulo 07: Indicadores",
            components: [
                {
                    name: "01. Badge (Etiqueta de Estado)",
                    path: "/src/components/07-indicators/indicator-01-badge/index.html",
                },
                {
                    name: "02. Barra de Progreso",
                    path: "/src/components/07-indicators/indicator-02-progress-bar/index.html",
                },
            ],
        },
        "08-tables": {
            title: "Módulo 08: Tablas",
            components: [
                {
                    name: "01. Tabla Base",
                    path: "/src/components/08-tables/table-01-base/index.html",
                },
                {
                    name: "02. Tabla Avanzada (Zebra)",
                    path: "/src/components/08-tables/table-02-advanced/index.html",
                },
            ],
        },
        "09-tabs": {
            title: "Módulo 09: Pestañas",
            components: [
                {
                    name: "01. Pestañas Básicas",
                    path: "/src/components/09-tabs/tabs-01-basic/index.html",
                },
                {
                    name: "02. Pestañas Estilo Píldora",
                    path: "/src/components/09-tabs/tabs-02-pills/index.html",
                },
            ],
        },
        "10-navigation-page": {
            title: "Módulo 10: Navegación de Página",
            components: [
                {
                    name: "01. Paginación",
                    path: "/src/components/10-navigation-page/navPage-01-pagination/index.html",
                },
                {
                    name: "02. Migas de Pan (Breadcrumb)",
                    path: "/src/components/10-navigation-page/navPage-02-breadcrumb/index.html",
                },
            ],
        },
        "11-multimedia": {
            title: "Módulo 11: Elementos Multimedia",
            components: [
                {
                    name: "01. Carrusel (Carousel)",
                    path: "/src/components/11-multimedia/media-01-carousel/index.html",
                },
                {
                    name: "02. Objeto Multimedia (Media Object)",
                    path: "/src/components/11-multimedia/media-02-object/index.html",
                },
            ],
        },
        "12-utilities": {
            title: "Módulo 12: Utilidades y Helpers",
            components: [
                {
                    name: "01. Espaciado (Margin & Padding)",
                    path: "/src/components/12-utilities/util-01-spacing/index.html",
                },
                {
                    name: "02. Visualización y Display",
                    path: "/src/components/12-utilities/util-02-visibility/index.html",
                },
            ],
        },
        "13-typography": {
            title: "Módulo 13: Tipografía",
            components: [
                {
                    name: "01. Base y Jerarquía",
                    path: "/src/components/13-typography/type-01-base/index.html",
                },
                {
                    name: "02. Utilidades de Texto",
                    path: "/src/components/13-typography/type-02-utils/index.html",
                },
            ],
        },
        "14-widgets": {
            title: "Módulo 14: Widgets Avanzados",
            components: [
                {
                    name: "01. Acordeón (Accordion)",
                    path: "/src/components/14-widgets/widget-01-accordion/index.html",
                },
                {
                    name: "02. Colapsable (Collapse)",
                    path: "/src/components/14-widgets/widget-02-collapse/index.html",
                },
                {
                    // <-- ¡NUEVO COMPONENTE: CARRUSEL!
                    name: "03. Carrusel (Carousel)",
                    path: "/src/components/14-widgets/widget-03-carousel/index.html",
                },
            ],
        },
        "15-layouts": {
            title: "Módulo 15: Layouts",
            components: [
                {
                    name: "01. Flexbox y Grid Helpers",
                    path: "/src/components/15-layouts/layout-01-flex-grid/index.html",
                },
                {
                    name: "02. Stack y Box Models",
                    path: "/src/components/15-layouts/layout-02-stack-box/index.html",
                },
                {
                    name: "03. Objeto Media (Media Object)",
                    path: "/src/components/15-layouts/layout-03-media-object/index.html",
                },
                {
                    name: "04. Centrado (Center Utility)",
                    path: "/src/components/15-layouts/layout-04-center/index.html",
                },
            ],
        },
    };

    const docsContainer = document.querySelector(".docs-container");
    const currentPathname = window.location.pathname;

    if (!docsContainer) {
        // No inyectar si no estamos en una página de documentación (como el index principal)
        return;
    }

    // --- LÓGICA DE DETECCIÓN DEL MÓDULO ACTUAL ---

    // Intentar encontrar qué módulo estamos viendo (ej. '01-navigation' o '02-forms')
    let currentModuleKey = Object.keys(componentCatalog).find((key) =>
        currentPathname.includes(`/components/${key}/`)
    );

    // Si no estamos dentro de una carpeta de módulo, o si es un índice (ej. /02-forms/index.html), salir.
    // El sidebar SOLO se inyecta en las páginas de COMPONENTE (ej. /input-01/index.html)
    if (!currentModuleKey) {
        return;
    }

    // Seleccionamos la lista de componentes para el módulo actual
    const moduleData = componentCatalog[currentModuleKey];

    // --- CONSTRUCCIÓN DEL HTML DEL SIDEBAR CONTEXTUAL ---

    let componentListHTML = "";
    moduleData.components.forEach((component) => {
        // Determina si el enlace debe tener la clase 'is-active'
        const isActive = currentPathname.includes(component.path);
        const activeClass = isActive ? "is-active" : "";

        componentListHTML += `
            <li><a href="${component.path}" class="${activeClass}">${component.name}</a></li>
        `;
    });

    // HTML de otros módulos para enlaces rápidos
    let otherModulesHTML = "";
    Object.keys(componentCatalog).forEach((key) => {
        if (key !== currentModuleKey) {
            otherModulesHTML += `
                <li><a href="/src/components/${key}/index.html">${componentCatalog[key].title}</a></li>
            `;
        }
    });

    // HTML Final
    const sidebarHTML = `
        <aside id="docs-sidebar" class="docs-sidebar">
            <h3>${moduleData.title}</h3>
            <ul class="component-list">
                ${componentListHTML}
            </ul>
            
            <h3 style="margin-top: 2rem;">Otros Módulos</h3>
            <ul class="component-list">
                ${otherModulesHTML}
            </ul>
        </aside>
    `;

    // 2. INSERCIÓN: Insertamos la barra lateral antes del main content.
    docsContainer.insertAdjacentHTML("afterbegin", sidebarHTML);

    // console.log(`Sidebar inyectado para: ${moduleData.title}`);
});
