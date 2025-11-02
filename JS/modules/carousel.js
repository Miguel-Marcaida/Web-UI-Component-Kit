/**
 * =========================================================
 * MÓDULO: carousel.js
 * Componente que se inicializa automáticamente al cargar.
 * =========================================================
 */
(function () {
    const COMPONENT_SELECTOR = ".carousel";
    const SLIDE_SELECTOR = ".carousel-slide";
    const NEXT_BTN_SELECTOR = '[data-slide="next"]';
    const PREV_BTN_SELECTOR = '[data-slide="prev"]';

    /**
     * Lógica principal para inicializar un solo carrusel.
     * @param {HTMLElement} carouselElement - El elemento DOM del carrusel.
     */
    function initializeCarousel(carouselElement) {
        const slidesContainer =
            carouselElement.querySelector(".carousel-slides");
        const slides = carouselElement.querySelectorAll(SLIDE_SELECTOR);

        if (!slidesContainer || slides.length === 0) return;

        let currentSlideIndex = 0;
        const totalSlides = slides.length;

        // Asume que todas las diapositivas tienen el mismo ancho del contenedor.
        const slideWidth = slidesContainer.clientWidth;

        // 1. FUNCIONALIDAD DE NAVEGACIÓN
        function goToSlide(index) {
            currentSlideIndex = (index + totalSlides) % totalSlides; // Loop
            const offset = -currentSlideIndex * slideWidth;

            // Mover el contenedor
            slidesContainer.style.transform = `translateX(${offset}px)`;

            // Actualizar indicadores (si existen)
            // ... (Lógica de indicadores aquí)
        }

        // 2. LISTENERS ESPECÍFICOS DEL CARRUSEL
        // Usamos delegación de eventos SOLO dentro de este componente.
        carouselElement.addEventListener("click", (event) => {
            const target = event.target.closest("button");
            if (!target) return;

            if (target.matches(NEXT_BTN_SELECTOR)) {
                goToSlide(currentSlideIndex + 1);
            } else if (target.matches(PREV_BTN_SELECTOR)) {
                goToSlide(currentSlideIndex - 1);
            }
        });

        console.log(
            `[Carousel] Inicializado: ${totalSlides} diapositivas. Ancho: ${slideWidth}px`
        );
    }

    // 3. REGISTRAR EN EL SISTEMA AUTO-INIT
    // Esto hace que la función se ejecute por cada elemento '.carousel' al cargar el DOM.
    if (window.UI_KIT_CORE && window.UI_KIT_CORE.getModule("autoInit")) {
        window.UI_KIT_CORE.getModule("autoInit").register(
            COMPONENT_SELECTOR,
            initializeCarousel
        );
    }
})();
