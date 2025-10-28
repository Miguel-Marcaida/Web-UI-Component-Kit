// ===========================================
// DOCS.JS: SCRIPT GLOBAL DE DOCUMENTACIÓN
// Este script maneja la carga de snippets y la funcionalidad del sidebar.
// ===========================================

document.addEventListener("DOMContentLoaded", () => {
    // --- LÓGICA DE CARGA DE SNIPPETS (EXISTENTE) ---
    const htmlSnippetContainer = document.querySelector(".html-snippet"); //    (Excluye el contenedor que usará el snippet-css.txt)
    const cssSnippetContainer = document.querySelector(
        ".css-snippet:not([data-snippet='snippet-css.txt'])"
    );
    const jsSnippetContainer = document.querySelector(".js-snippet"); // NUEVA CONST: Busca el elemento <code> con la clase css-snippet que tiene el atributo data-snippet
    const utilityCssSnippetContainer = document.querySelector(
        ".css-snippet[data-snippet='snippet-css.txt']"
    );

    const highlightElement = (element) => {
        if (window.Prism && element) {
            Prism.highlightElement(element);
        }
    };

    const loadSnippet = (fileName, container) => {
        if (!container) return;

        fetch(fileName)
            .then((response) => {
                if (!response.ok) {
                    // Para HTML y CSS, mostramos un error si no existen
                    if (
                        fileName.includes("html.txt") ||
                        fileName.includes("styles.css")
                    ) {
                        throw new Error(`Archivo no encontrado: ${fileName}`);
                    } // Para script.js, lo consideramos opcional, así que solo devolvemos una promesa vacía si no existe
                    return Promise.resolve("");
                }
                return response.text();
            })
            .then((codeText) => {
                container.textContent = codeText.trim();
                highlightElement(container);
            })
            .catch((err) => {
                console.error(err);
                container.textContent = `// ERROR: No se pudo cargar ${fileName}.`;
                highlightElement(container);
            });
    };

    loadSnippet("snippet-html.txt", htmlSnippetContainer);
    loadSnippet("styles.css", cssSnippetContainer);
    loadSnippet("script.js", jsSnippetContainer); // Nota: Ahora maneja opcionalidad de script.js // NUEVA LLAMADA: Carga el snippet de utilidades CSS en su propio contenedor
    if (utilityCssSnippetContainer) {
        loadSnippet("snippet-css.txt", utilityCssSnippetContainer);
    } // --- LÓGICA DE SIDEBAR TOGGLE (UNIFICADA) ---
    /*
  const toggleButton = document.getElementById("sidebar-toggle");
  const docsContainer = document.querySelector(".docs-container"); // docsSidebar ya no es estrictamente necesario aquí, solo el docsContainer
  if (toggleButton && docsContainer) {
    toggleButton.addEventListener("click", function () {
      const isExpanded = toggleButton.getAttribute("aria-expanded") === "true"; // 1. Toggle de la clase en el contenedor (Activa el CSS)

      docsContainer.classList.toggle("is-sidebar-open"); // 2. Toggle de atributos de accesibilidad

      toggleButton.setAttribute("aria-expanded", !isExpanded); // 3. Cambiar el icono

      const icon = toggleButton.querySelector("i");
      if (icon) {
        if (!isExpanded) {
          // Si se está abriendo
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-times");
        } else {
          // Si se está cerrando
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }
    });
  }*/
});
