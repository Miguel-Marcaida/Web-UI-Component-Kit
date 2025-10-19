// ===========================================
// DOCS.JS: SCRIPT GLOBAL DE DOCUMENTACIÓN
// Este script maneja la carga y el resaltado de los snippets en TODAS las páginas de componentes.
// ===========================================

document.addEventListener("DOMContentLoaded", () => {
  // Obtenemos los contenedores de código si existen en la página
  const htmlSnippetContainer = document.querySelector(".html-snippet");
  const cssSnippetContainer = document.querySelector(".css-snippet");
  const jsSnippetContainer = document.querySelector(".js-snippet");

  // Función auxiliar para forzar el resaltado de un elemento específico (Prism.js)
  const highlightElement = (element) => {
    if (window.Prism && element) {
      Prism.highlightElement(element);
    }
  };

  // Función que carga un archivo de código y lo inserta en el contenedor
  const loadSnippet = (fileName, container) => {
    if (!container) return; // Salir si el contenedor no existe en esta página

    fetch(fileName)
      .then((response) => {
        // Si la respuesta no es OK (ej. 404), mostramos un mensaje de error
        if (!response.ok) {
          throw new Error(`Archivo no encontrado: ${fileName}`);
        }
        return response.text();
      })
      .then((codeText) => {
        container.textContent = codeText.trim();
        // Importante: Resaltar SÓLO después de que el contenido ha sido cargado
        highlightElement(container);
      })
      .catch((err) => {
        console.error(err);
        container.textContent = `// ERROR: No se pudo cargar ${fileName}. Asegúrate de que el archivo exista.`;
        highlightElement(container);
      });
  };

  // Lógica de carga para los tres tipos de snippets
  loadSnippet("snippet-html.txt", htmlSnippetContainer);
  loadSnippet("styles.css", cssSnippetContainer);
  loadSnippet("script.js", jsSnippetContainer);
  // Nota: El archivo JS ahora se carga, no solo se marca con un texto.
});
