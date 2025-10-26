document.addEventListener("DOMContentLoaded", () => {
  // 1. Inicialización y selección de elementos
  const carouselElement = document.getElementById("demoCarousel");
  if (!carouselElement) return; // Salir si el carrusel no existe

  const inner = carouselElement.querySelector(".carousel-inner");
  const items = carouselElement.querySelectorAll(".carousel-item");
  const prevButton = carouselElement.querySelector(".carousel-control.prev");
  const nextButton = carouselElement.querySelector(".carousel-control.next");
  const indicators = carouselElement.querySelectorAll(
    ".carousel-indicators .dot"
  );

  let currentIndex = 0;
  const totalItems = items.length;

  // 2. Función principal para cambiar la diapositiva
  const updateCarousel = (newIndex) => {
    // Manejar el ciclo (cíclico)
    if (newIndex >= totalItems) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = totalItems - 1;
    }

    currentIndex = newIndex;

    // Calcular el desplazamiento (translateX)
    const offset = -currentIndex * 100;
    inner.style.transform = `translateX(${offset}%)`;

    // Actualizar clases 'active'
    items.forEach((item, index) => {
      item.classList.remove("active");
      if (index === currentIndex) {
        item.classList.add("active");
      }
    });

    // Actualizar indicadores (dots)
    indicators.forEach((dot, index) => {
      dot.classList.remove("active");
      if (index === currentIndex) {
        dot.classList.add("active");
      }
    });
  };

  // 3. Event Listeners para Controles (Flechas)
  prevButton.addEventListener("click", () => {
    updateCarousel(currentIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    updateCarousel(currentIndex + 1);
  });

  // 4. Event Listeners para Indicadores (Dots)
  indicators.forEach((dot) => {
    dot.addEventListener("click", (event) => {
      const slideTo = parseInt(event.target.getAttribute("data-slide-to"));
      updateCarousel(slideTo);
    });
  });

  // 5. Autoplay (Opcional, desactivado por defecto para documentación)
  // Se puede añadir aquí una función setInterval si se desea auto-avance.

  // Inicializar el carrusel en el primer slide
  updateCarousel(0);
});
