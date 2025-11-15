/**
 * script.js
 * Subcomponente 20.02 Skeleton Screen
 * Gestión de la simulación de carga.
 */

document.addEventListener('DOMContentLoaded', () => {
    const skeletonCard = document.getElementById('skeleton-card');
    const contentCard = document.getElementById('content-card');
    const toggleButton = document.getElementById('toggle-state');
    
    // Estado inicial: El Skeleton está visible.
    let isSkeletonVisible = true;

    toggleButton.addEventListener('click', () => {
        isSkeletonVisible = !isSkeletonVisible;

        // Alternar la visibilidad y el texto del botón.
        if (isSkeletonVisible) {
            // Mostrar Skeleton (simular estado de carga)
            skeletonCard.classList.remove('hidden');
            contentCard.classList.add('hidden');
            toggleButton.textContent = 'Simular Carga Finalizada';
            toggleButton.classList.add('btn-secondary');
            toggleButton.classList.remove('btn-primary');
        } else {
            // Ocultar Skeleton y mostrar Contenido (simular fin de carga)
            // Se puede añadir un pequeño 'timeout' para simular la transición.
            setTimeout(() => {
                skeletonCard.classList.add('hidden');
                contentCard.classList.remove('hidden');
                toggleButton.textContent = 'Mostrar Skeleton de Nuevo';
                toggleButton.classList.remove('btn-secondary');
                toggleButton.classList.add('btn-primary');
            }, 100); 
        }
    });
});