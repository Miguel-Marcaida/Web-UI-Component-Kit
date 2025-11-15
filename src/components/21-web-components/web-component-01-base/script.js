/**
 * script.js
 * Subcomponente 21.01 Custom Element Base
 * Definición de la clase base del Custom Element (Light DOM).
 */

class CustomBaseElement extends HTMLElement {
    constructor() {
        super();
        console.log('CustomBaseElement: constructor ejecutado.');
        
        // Nota: NO usamos attachShadow() en esta demo, se usa el Light DOM.
    }

    // Ciclo de Vida: Se ejecuta cuando el elemento es adjuntado al DOM.
    connectedCallback() {
        console.log('CustomBaseElement: Elemento adjuntado al DOM.');

        // 1. Lectura de atributos declarativos
        const title = this.getAttribute('title') || 'Título por Defecto';
        const subtitle = this.getAttribute('subtitle') || 'Subtítulo no definido';
        
        // 2. Creación de la estructura HTML (Light DOM)
        // El contenido inyectado será estilizado por el styles.css
        this.innerHTML = `
            <div class="wc-base-wrapper">
                <h3>${title}</h3>
                <p class="wc-subtitle">${subtitle}</p>
                <div class="wc-content-slot">
                    <slot></slot> 
                </div>
                <small>Ciclo de vida: connectedCallback ejecutado.</small>
            </div>
        `;
    }
}

// 3. Definición del Custom Element en el Registro del Navegador
// La etiqueta DEBE contener un guión (-).
if (!customElements.get('custom-base-element')) {
    customElements.define('custom-base-element', CustomBaseElement);
}