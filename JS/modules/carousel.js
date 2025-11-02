/*
 * Módulo: Carousel
 * Descripción: Implementa la lógica para un carrusel de diapositivas cíclico.
 * Dependencias: _events.js (para la delegación de eventos)
 */

(function () {
    ("use strict");

    const SELECTOR_CAROUSEL = ".carousel";
    const SELECTOR_SLIDES_CONTAINER = ".carousel-slides";
    const SELECTOR_SLIDE = ".carousel-slide";
    const SELECTOR_CONTROL = ".carousel-control";

    // Obtener el módulo de eventos del core
    const Events = window.UI_KIT_CORE
        ? window.UI_KIT_CORE.getModule("events")
        : null;

    /**
     * Objeto que representa una instancia individual del Carrusel.
     * @param {HTMLElement} element - El elemento DOM principal del carrusel.
     */
    function Carousel(element) {
        if (!Events) {
            console.error(
                "[Carousel] Dependencia Events no cargada. No se puede inicializar."
            );
            return;
        }

        this.element = element;
        this.slidesContainer = element.querySelector(SELECTOR_SLIDES_CONTAINER);
        this.slides = Array.from(element.querySelectorAll(SELECTOR_SLIDE));
        this.totalSlides = this.slides.length;
        this.currentIndex = 0;

        // Si el contenedor de slides no existe o no hay slides, cancela la inicialización.
        if (!this.slidesContainer || this.totalSlides === 0) {
            console.warn("[Carousel] Contenedor o slides no encontrados.");
            return;
        }

        // Determinar el índice inicial basado en la clase 'active' en el HTML
        const activeSlide = this.element.querySelector(
            SELECTOR_SLIDE + ".active"
        );
        if (activeSlide) {
            this.currentIndex = this.slides.indexOf(activeSlide);
        }

        this.attachEvents();
        this.updatePosition();
        console.log(
            `[Carousel] Inicializado: ${this.totalSlides} slides. Índice inicial: ${this.currentIndex}`
        );
    }

    /**
     * Adjunta los listeners de eventos a los controles, usando el sistema de Delegación de Eventos.
     */
    Carousel.prototype.attachEvents = function () {
        // CORRECCIÓN: Usamos la variable local Events obtenida del Core
        Events.delegate(
            this.element,
            "click",
            SELECTOR_CONTROL,
            this.handleControlClick.bind(this)
        );
    };

    /**
     * Maneja los clics en los botones de control (prev/next).
     */
    Carousel.prototype.handleControlClick = function (e) {
        // Asegura que el target sea el botón (prev/next) y no un icono interno
        const controlButton = e.target.closest(SELECTOR_CONTROL);
        if (!controlButton) return;

        const action = controlButton.getAttribute("data-slide");

        if (action === "next") {
            this.next();
        } else if (action === "prev") {
            this.prev();
        }
    };

    /**
     * Mueve el carrusel a la diapositiva siguiente.
     */
    Carousel.prototype.next = function () {
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.updatePosition();
    };

    /**
     * Mueve el carrusel a la diapositiva anterior.
     */
    Carousel.prototype.prev = function () {
        this.currentIndex =
            (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.updatePosition();
    };

    /**
     * Aplica la transformación CSS para mover la pista de slides.
     */
    Carousel.prototype.updatePosition = function () {
        const offset = -100 * this.currentIndex; // -100% para cada slide

        // CORRECCIÓN: Usamos un fallback si slidesContainer no existe (por si falla la inicialización)
        if (this.slidesContainer) {
            this.slidesContainer.style.transform = `translateX(${offset}%)`;
        }

        // Actualizar el estado activo
        this.slides.forEach((slide, index) => {
            slide.classList.toggle("active", index === this.currentIndex);
        });
    };

    /**
     * Método estático para la inicialización automática (usado por _autoinit.js).
     */
    Carousel.init = function (element) {
        if (!element.carouselInstance) {
            element.carouselInstance = new Carousel(element);
        }
    };

    // -----------------------------------------------------------------
    // PASO FINAL: REGISTRO EN EL SISTEMA AUTOINIT
    // -----------------------------------------------------------------

    // 1. Obtener el módulo de AutoInit
    const AutoInit = window.UI_KIT_CORE
        ? window.UI_KIT_CORE.getModule("autoInit")
        : null;

    // 2. Si AutoInit existe, registrar el carrusel para que sea inicializado automáticamente
    if (AutoInit) {
        // Le decimos a AutoInit que busque el selector '[data-component="carousel"]'
        // y que use la función Carousel.init cuando lo encuentre.
        AutoInit.register('[data-component="carousel"]', Carousel.init);
    }

    // Exportar el módulo al objeto global UI
    window.UI = window.UI || {};
    window.UI.Carousel = Carousel;
})();
