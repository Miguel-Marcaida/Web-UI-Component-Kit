document.addEventListener("DOMContentLoaded", () => {
    // 1. Identificadores de los elementos
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");

    // 2. Comprobación de que los elementos existen antes de añadir el listener
    if (navToggle && navLinks) {
        // 3. Función de toggle (mostrar/ocultar)
        navToggle.addEventListener("click", () => {
            // a) Toggle de la clase CSS para el efecto visual
            navLinks.classList.toggle("is-active");

            // Toggle del atributo aria-expanded para la accesibilidad (A11Y)
            const isExpanded =
                navToggle.getAttribute("aria-expanded") === "true";
            navToggle.setAttribute("aria-expanded", !isExpanded);
        });
    }
});
