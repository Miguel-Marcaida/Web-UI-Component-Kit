// ===========================================
// CARRUSEL (CAROUSEL)
// widget-03-carousel/script.js
// ===========================================

document.addEventListener("DOMContentLoaded", () => {
    // La función principal se inicializa buscando el ID del carrusel
    const carouselElement = document.getElementById("demoCarousel");

    // Si el elemento del carrusel no existe, no hacer nada
    if (!carouselElement) {
        // console.log("No se encontró el carrusel con ID #demoCarousel. Saliendo.");
        return;
    }

    // --- VARIABLES GLOBALES DEL CARRUSEL ---
    const inner = carouselElement.querySelector(".carousel-inner");
    const items = carouselElement.querySelectorAll(".carousel-item");
    const indicators = carouselElement.querySelectorAll(".dot");
    const prevButton = carouselElement.querySelector(".carousel-control.prev");
    const nextButton = carouselElement.querySelector(".carousel-control.next");

    const totalSlides = items.length;
    let currentIndex = 0;
    let intervalId;

    // --- CONFIGURACIÓN DE TIEMPO ---
    const intervalTime = 5000; // 5 segundos para el auto-avance
    let isPaused = false;

    // --- FUNCIONES DE CONTROL ---

    /**
     * Mueve el carrusel a la diapositiva específica (index).
     * @param {number} index El índice del slide al que ir.
     */
    function goToSlide(index) {
        // Asegurar que el índice esté dentro de los límites (cíclico)
        if (index >= totalSlides) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = totalSlides - 1;
        } else {
            currentIndex = index;
        }

        // 1. Aplicar la transformación CSS para mover el track (.carousel-inner)
        // Mueve el track a la izquierda por el porcentaje del slide actual
        const offset = -currentIndex * 100;
        inner.style.transform = `translateX(${offset}%)`;

        // 2. Actualizar el estado 'active' y ARIA
        items.forEach((item, i) => {
            const isActive = i === currentIndex;

            // a) Clase 'active' en el item
            item.classList.toggle("active", isActive);

            // b) ARIA state para accesibilidad
            item.setAttribute("aria-current", isActive ? "true" : "false");
        });

        // 3. Actualizar los indicadores (puntos)
        indicators.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
            dot.setAttribute(
                "aria-current",
                i === currentIndex ? "true" : "false"
            );
        });
    }

    /**
     * Inicia el temporizador de auto-avance.
     */
    function startAutoAdvance() {
        if (isPaused) return;

        // Limpiar cualquier intervalo previo para evitar duplicados
        clearInterval(intervalId);

        // Configurar el nuevo intervalo
        intervalId = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, intervalTime);
    }

    /**
     * Pausa el auto-avance y establece la bandera.
     * Se llama cuando el usuario interactúa (flechas, puntos).
     */
    function pauseAutoAdvance() {
        clearInterval(intervalId);
        isPaused = true;

        // Opcional: Reiniciar el auto-avance después de un tiempo si no hay más interacción
        setTimeout(() => {
            isPaused = false;
            startAutoAdvance();
        }, 10000); // Reanudar después de 10 segundos de inactividad
    }

    // --- MANEJADORES DE EVENTOS ---

    // 1. Navegación con flechas (Prev/Next)
    prevButton.addEventListener("click", () => {
        pauseAutoAdvance();
        goToSlide(currentIndex - 1);
    });

    nextButton.addEventListener("click", () => {
        pauseAutoAdvance();
        goToSlide(currentIndex + 1);
    });

    // 2. Navegación con indicadores (Puntos)
    indicators.forEach((dot) => {
        dot.addEventListener("click", (e) => {
            pauseAutoAdvance();
            // Obtener el índice del atributo data-slide-to
            const index = parseInt(e.target.dataset.slideTo);
            goToSlide(index);
        });
    });

    // 3. Opcional: Pausar en hover (para escritorio)
    carouselElement.addEventListener("mouseenter", () =>
        clearInterval(intervalId)
    );
    carouselElement.addEventListener("mouseleave", () => startAutoAdvance());

    // --- INICIALIZACIÓN ---
    // Inicia el auto-avance del carrusel al cargar la página
    startAutoAdvance();
});
