/*
 * script.js
 * Subcomponente 18.03 Observadores del DOM - Intersection Observer
 * Contiene la lógica pura del patrón.
 */

document.addEventListener('DOMContentLoaded', () => {
    const lazyImage = document.getElementById('lazy-image');
    const statusMessage = document.getElementById('observer-status');

    if (!lazyImage || !statusMessage) {
        console.error('Elementos de la demo (imagen o estado) no encontrados.');
        return;
    }

    /**
     * Función que carga la imagen al ser llamada.
     * @param {HTMLElement} imgElement - El elemento <img> a cargar.
     */
    const loadLazyImage = (imgElement) => {
        // Obtenemos la URL de la fuente real desde data-src
        const src = imgElement.getAttribute('data-src');
        if (src) {
            // Asignamos la URL al atributo src, lo que inicia la carga
            imgElement.setAttribute('src', src);
            imgElement.removeAttribute('data-src'); // Opcional: limpiar el atributo data-src
            
            statusMessage.textContent = 'Estado: Imagen cargada con éxito (visible en el viewport).';
            statusMessage.classList.add('loaded');
        }
    };


    /**
     * Configuración y Creación del Intersection Observer
     *
     * threshold: 0.0 significa que la función de callback se disparará
     * tan pronto como el elemento se vuelva visible (0% de intersección).
     * rootMargin: Permite cargar la imagen antes de que llegue al viewport.
     */
    const observerOptions = {
        root: null, // El viewport es el elemento raíz
        rootMargin: '0px 0px -100px 0px', // Cargar 100px antes de que entre en el viewport
        threshold: 0.0,
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si el elemento está intersectando (es visible)
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // 1. Cargar la imagen
                loadLazyImage(target);

                // 2. Dejar de observarlo, ya que ya está cargado
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    // Iniciar la observación del elemento
    imageObserver.observe(lazyImage);
    
});