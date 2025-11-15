/**
 * script.js
 * Subcomponente 21.02 Shadow DOM (Encapsulación CSS)
 * Implementación de la clase Custom Element.
 * COHERENCIA DEL SNIPPET: El CSS interno se define en JS para encapsulación.
 */

class CustomShadowElement extends HTMLElement {
    constructor() {
        super();
        
        // 1. Creación del Shadow Root (Mecanismo de encapsulación)
        this.shadowRootRef = this.attachShadow({ mode: 'open' });
        
        console.log('CustomShadowElement: Shadow Root Creado.');
    }

    connectedCallback() {
        console.log('CustomShadowElement: Elemento adjuntado. Renderizando contenido...');

        const message = this.getAttribute('message') || 'Mensaje de Contenido Encapsulado.';

        // 1. Estilos Encapsulados (DEFINICIÓN INTERNA DEL CSS)
        // Este CSS solo afectará a los elementos dentro del Shadow Root.
        const componentStyle = `
            .shadow-wrapper {
                display: flex;
                flex-direction: column;
                padding: 15px;
                background-color: #f0f0f0; 
                border: 2px solid #0077b6; /* Borde Azul (Color Encapsulado) */
                border-radius: 6px;
                color: #111;
                transition: all 0.3s ease;
                max-width: 300px;
            }
            .encapsulated-text {
                color: #005691; /* Color interno: azul oscuro. DEBE IGNORAR el estilo global. */
                font-size: 14px;
                font-style: normal;
                margin-bottom: 5px;
            }
            .light-dom-slot {
                padding: 5px;
                border: 1px dashed #6c757d;
                background-color: #e9ecef;
                margin-top: 10px;
            }
            /* Dark Mode a través del Host Selector (Afecta el HOST, permitiendo temas) */
            :host([data-theme="dark"]) .shadow-wrapper {
                background-color: #3d3d3d;
                border-color: #0096c7;
                color: #f0f0f0;
            }
            :host([data-theme="dark"]) .encapsulated-text {
                color: #90e0ef; 
            }
            :host([data-theme="dark"]) .light-dom-slot {
                background-color: #555;
            }
        `;
        
        // 2. Definición del template HTML (incluye el tag <style>)
        const componentTemplate = `
            <style>${componentStyle}</style>
            <div class="shadow-wrapper">
                <h4>Componente Encapsulado</h4>
                <p class="encapsulated-text">
                    ${message}
                </p>
                <div class="light-dom-slot">
                    <slot></slot> 
                </div>
                <small>Renderizado dentro del Shadow DOM.</small>
            </div>
        `;

        // 3. Inyección del template COMPLETO (HTML + CSS) en el Shadow Root
        this.shadowRootRef.innerHTML = componentTemplate;
    }
}

// 4. Definición del Custom Element
if (!customElements.get('custom-shadow-element')) {
    customElements.define('custom-shadow-element', CustomShadowElement);
}