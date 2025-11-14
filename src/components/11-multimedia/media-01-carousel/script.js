// * ----------------------------------------------------------------------------
// * COMPONENTE: Multimedia 01 - Carrusel Base (Slider)
// * AUTONOMÍA ESTRICTA: Lógica de navegación del carrusel.
// * ----------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('[data-carousel]');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('[data-track]');
        const slides = Array.from(carousel.querySelectorAll('[data-slide]'));
        const controls = carousel.querySelectorAll('[data-control]');
        const indicators = carousel.querySelectorAll('[data-indicator]');
        
        if (!track || slides.length === 0) return;

        // 1. Inicialización
        const totalSlides = slides.length;
        // En un carrusel que usa flexbox, el ancho de cada slide ya es 100% del contenedor.
        // El desplazamiento total será un múltiplo de ese 100%.
        let currentIndex = slides.findIndex(slide => slide.classList.contains('is-active'));
        if (currentIndex === -1) currentIndex = 0;

        // 2. Funciones de Ayuda
        
        /**
         * Mueve el track a la diapositiva especificada.
         * @param {number} targetIndex - El índice de la diapositiva a mostrar.
         */
        const moveToSlide = (targetIndex) => {
            // CÁLCULO MEJORADO: Calcula el desplazamiento necesario para mostrar la diapositiva.
            // Ejemplo (3 slides): Index 0 -> 0% | Index 1 -> -100% | Index 2 -> -200%
            const offsetPercentage = targetIndex * 100; // Multiplicamos por 100, no por (100 / totalSlides)

            // Aplicar el desplazamiento
            // Esto asume que el contenedor del track es lo suficientemente grande
            track.style.transform = `translateX(-${offsetPercentage}%)`;
            
            // Actualizar la clase activa
            updateClasses(targetIndex);
            
            currentIndex = targetIndex;
        };
        
        // ... (La función updateClasses permanece igual) ...
        const updateClasses = (targetIndex) => {
            slides.forEach((slide, index) => {
                slide.classList.toggle('is-active', index === targetIndex);
            });
            
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('is-active', index === targetIndex);
                indicator.setAttribute('aria-label', `Ver Diapositiva ${index + 1}`);
            });
        };

        // 3. Listeners de Control (Prev/Next)
        controls.forEach(control => {
            control.addEventListener('click', () => {
                const isNext = control.dataset.control === 'next';
                let newIndex;

                if (isNext) {
                    newIndex = (currentIndex + 1) % totalSlides;
                } else {
                    newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                }
                
                moveToSlide(newIndex);
            });
        });

        // 4. Listeners de Indicadores (Dots)
        indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                const targetSlideNumber = parseInt(indicator.dataset.indicator);
                const targetIndex = targetSlideNumber - 1; 
                
                if (targetIndex !== currentIndex) {
                    moveToSlide(targetIndex);
                }
            });
        });
        
        // Inicializar la posición
        moveToSlide(currentIndex);
    });
});