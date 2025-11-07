// ===========================================
// SCRIPT.JS: Form-06 File Input
// Lógica para mostrar el nombre del archivo seleccionado.
// ===========================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Selecciona todos los inputs de tipo 'file' con la clase específica.
    const fileInputs = document.querySelectorAll(".input-file-control__input");

    fileInputs.forEach((input) => {
        // 2. Asocia un listener al evento 'change' (cuando se selecciona un archivo).
        input.addEventListener("change", (event) => {
            const inputElement = event.target;

            // 3. Busca el elemento hermano (label) y luego el span que mostrará la ruta.
            // Usamos .closest('.input-file-control') para subir al contenedor principal
            // y luego buscamos el label dentro de él, que es el hermano del input.
            const controlContainer = inputElement.closest(
                ".input-file-control"
            );
            if (!controlContainer) return;

            // El label es el elemento que contiene el span.file-path
            const labelElement = controlContainer.querySelector(
                ".input-file-control__label"
            );
            if (!labelElement) return;

            const filePathSpan = labelElement.querySelector(".file-path");
            if (!filePathSpan) return;

            // 4. Obtiene el nombre del archivo.
            let fileName = "";
            if (inputElement.files.length > 0) {
                // Si hay un archivo, usa su nombre.
                fileName = inputElement.files[0].name;
            } else {
                // Si el usuario canceló la selección, usamos el texto original del label
                // (esto requiere que el label no se modifique en el HTML base).
                // Como alternativa simple, podemos usar un placeholder genérico:
                fileName = "Ningún archivo seleccionado.";
            }

            // 5. Actualiza el contenido del span.
            filePathSpan.textContent = fileName;

            // Opcional: Si desea cambiar el color del texto a var(--local-text)
            // esto requeriría acceder al color desde el JS, o manejarlo con una clase CSS.
        });
    });
});
