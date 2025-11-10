// MÓDULO AUTÓNOMO: Toggle Button Group
document.addEventListener("DOMContentLoaded", () => {
    // Selecciona todos los contenedores de grupos de toggle
    const toggleGroups = document.querySelectorAll(".toggle-group");

    toggleGroups.forEach((group) => {
        // Selecciona todos los botones toggle dentro de este grupo
        const buttons = group.querySelectorAll(".btn--toggle");

        buttons.forEach((button) => {
            button.addEventListener("click", (event) => {
                // 1. Desactivar todos los botones en el grupo
                buttons.forEach((btn) => btn.classList.remove("is-active"));

                // 2. Activar solo el botón clickeado
                event.currentTarget.classList.add("is-active");
            });
        });
    });
});
