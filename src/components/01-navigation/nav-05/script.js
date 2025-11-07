/**
 * Lógica para la gestión del Menú Píldora (Nav 05).
 * Se encarga de:
 * 1. Alternar la clase 'is-active' y el atributo 'aria-current'.
 * 2. Aplicar auto-scroll horizontal para centrar el elemento activo.
 */
function initNav05PillMenu() {
    // 1. Selecciona el contenedor principal y la lista de enlaces
    const navContainer = document.querySelector(".nav-05");
    const navList = document.querySelector(".nav-05__list");

    // Solo inicializa si el contenedor existe
    if (!navContainer || !navList) {
        return;
    }

    // Función auxiliar para centrar el elemento activo en la vista del scroll
    const scrollToCenter = (activeElement) => {
        // Obtenemos las dimensiones del elemento y el contenedor
        const itemRect = activeElement.getBoundingClientRect();
        const containerRect = navContainer.getBoundingClientRect();

        // Calculamos la posición de scroll necesaria
        // Es la posición actual del scroll + (posición del ítem - mitad del contenedor + mitad del ítem)
        const scrollPosition =
            navContainer.scrollLeft +
            itemRect.left -
            containerRect.width / 2 +
            itemRect.width / 2;

        navContainer.scrollTo({
            left: scrollPosition,
            behavior: "smooth", // Desplazamiento suave para mejor UX
        });
    };

    // Listener principal en la lista para delegación de eventos
    navList.addEventListener("click", (event) => {
        // Aseguramos que el elemento clickeado sea un enlace <a>
        const clickedLink = event.target.closest("a");

        if (clickedLink) {
            // Prevenimos la navegación si es solo un filtro (opcional, basado en el diseño)
            // Si el componente se usa para navegación de página, esto debe removerse.
            // Para el propósito de filtros interactivos, lo mantenemos.
            event.preventDefault();

            // Si ya está activo, no hacemos nada
            if (clickedLink.classList.contains("is-active")) {
                return;
            }

            // 1. DESACTIVAR: Enlace previamente activo
            const currentActive = navList.querySelector("a.is-active");
            if (currentActive) {
                currentActive.classList.remove("is-active");
                currentActive.removeAttribute("aria-current");
            }

            // 2. ACTIVAR: Nuevo enlace
            clickedLink.classList.add("is-active");
            clickedLink.setAttribute("aria-current", "page");

            // 3. USABILIDAD: Centrar el elemento activo en la vista
            scrollToCenter(clickedLink);
        }
    });
}

// Inicializa la funcionalidad al cargar el script
document.addEventListener("DOMContentLoaded", initNav05PillMenu);
