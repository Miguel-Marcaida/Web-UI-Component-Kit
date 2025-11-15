/**
 * script.js
 * Subcomponente 21.03 Slots (Composición)
 * Implementación de la clase Custom Element con Shadow DOM y Slots.
 */

class CustomSlotCard extends HTMLElement {
    constructor() {
        super();
        
        // 1. Creación del Shadow Root
        this.shadowRootRef = this.attachShadow({ mode: 'open' });
        
        console.log('CustomSlotCard: Shadow Root Creado.');
    }

    connectedCallback() {
        console.log('CustomSlotCard: Elemento adjuntado. Renderizando contenido con Slots...');

        const title = this.getAttribute('title') || 'Título de Componente';

        // 1. Estilos Encapsulados (DEFINICIÓN INTERNA DEL CSS)
        const componentStyle = `
            .card-wrapper {
                max-width: 450px;
                margin: 20px auto;
                padding: 10px;
                border: 1px solid var(--card-border-color, #ccc);
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                background-color: var(--card-bg-color, #fff);
            }
            h3 {
                color: var(--card-title-color, #005691);
                margin: 0 0 5px 0;
            }
            .slot-header, .slot-footer {
                padding: 8px 10px;
                margin-bottom: 10px;
            }
            .slot-header {
                border-bottom: 1px solid var(--card-border-color, #ccc);
                font-weight: bold;
                color: var(--card-text-secondary, #666);
            }
            .slot-content {
                padding: 15px 10px;
                background-color: var(--card-content-bg, #f9f9f9);
            }
            .slot-footer {
                border-top: 1px solid var(--card-border-color, #ccc);
                display: flex;
                justify-content: flex-end;
                gap: 10px;
            }
            
            /* Dark Mode a través del Host Selector */
            :host([data-theme="dark"]) .card-wrapper {
                --card-bg-color: #333;
                --card-border-color: #555;
                --card-title-color: #90e0ef;
                --card-content-bg: #444;
                --card-text-secondary: #ccc;
                color: #f0f0f0;
            }
        `;
        
        // 2. Definición del template HTML con Slots
        const componentTemplate = `
            <style>${componentStyle}</style>
            <div class="card-wrapper">
                
                <div class="slot-header">
                    <slot name="header"></slot>
                </div>

                <h3>${title}</h3>

                <div class="slot-content">
                    <slot></slot> 
                </div>

                <div class="slot-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        `;

        // 3. Inyección del template COMPLETO (HTML + CSS) en el Shadow Root
        this.shadowRootRef.innerHTML = componentTemplate;
    }
}

// 4. Definición del Custom Element
if (!customElements.get('custom-slot-card')) {
    customElements.define('custom-slot-card', CustomSlotCard);
}