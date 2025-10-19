document.addEventListener("DOMContentLoaded", () => {
  // Contenedores
  const htmlSnippetContainer = document.querySelector(".html-snippet");
  const cssSnippetContainer = document.querySelector(".css-snippet");
  const jsSnippetContainer = document.querySelector(".js-snippet");

  // Función de resaltado
  const highlightElement = (element) => {
    if (window.Prism) {
      // porque solo procesa un elemento
      Prism.highlightElement(element);
    }
  };

  // --- 1. Cargar el HTML ---
  fetch("snippet-html.txt")
    .then((response) => response.text())
    .then((htmlText) => {
      htmlSnippetContainer.textContent = htmlText.trim();
      // ¡NUEVO! Resaltar SÓLO después de que el texto ha sido insertado
      highlightElement(htmlSnippetContainer);
    })
    .catch(
      (err) =>
        (htmlSnippetContainer.textContent = "Error al cargar el HTML: " + err)
    );

  // --- 2. Cargar el CSS del componente ---
  fetch("styles.css")
    .then((response) => response.text())
    .then((cssText) => {
      cssSnippetContainer.textContent = cssText;
      // ¡NUEVO! Resaltar SÓLO después de que el texto ha sido insertado
      highlightElement(cssSnippetContainer);
    })
    .catch(
      (err) => (cssSnippetContainer.textContent = "Error al cargar el CSS.")
    );

  // --- 3. Cargar el JS del componente (No requiere fetch, es sincrónico) ---
  jsSnippetContainer.textContent =
    "// Este componente no requiere lógica interactiva JS (solo CSS).\n" +
    "// El script actual solo carga los snippets en pantalla.";

  highlightElement(jsSnippetContainer);
});
