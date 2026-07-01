// Script global unificado para Adalay
// Centraliza la inyección dinámica de partículas y utilidades comunes como el efecto Typewriter

/**
 * ==========================================================================
 * 1. INYECCIÓN DINÁMICA DE PARTÍCULAS DE FONDO
 * ==========================================================================
 */
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    
    // Inyectar estrellas fugaces dinámicamente si no existen
    if (!document.querySelector('.shooting-stars')) {
        const starsContainer = document.createElement('div');
        starsContainer.className = 'shooting-stars';
        
        for (let i = 0; i < 6; i++) {
            const star = document.createElement('div');
            star.className = 'shooting-star';
            starsContainer.appendChild(star);
        }
        
        body.insertBefore(starsContainer, body.firstChild);
    }
    
    // Inyectar corazones flotantes dinámicamente si no existen
    if (!document.querySelector('.floating-hearts')) {
        const heartsContainer = document.createElement('div');
        heartsContainer.className = 'floating-hearts';
        
        for (let i = 0; i < 5; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart-float';
            heart.textContent = '♥';
            heartsContainer.appendChild(heart);
        }
        
        body.insertBefore(heartsContainer, body.firstChild);
    }
});

/**
 * ==========================================================================
 * 2. CLASE TYPEWRITER REUTILIZABLE (POO)
 * ==========================================================================
 */
class Typewriter {
    /**
     * @param {string} elementId - ID del elemento DOM donde se escribirá el texto
     * @param {string[]} messages - Array de mensajes a escribir
     * @param {Object} options - Configuración opcional
     * @param {number} options.writeSpeed - Velocidad de escritura en ms (default: 50)
     * @param {number} options.deleteSpeed - Velocidad de borrado en ms (default: 30)
     * @param {number} options.pauseBeforeDelete - Pausa al terminar de escribir en ms (default: 1000)
     * @param {number} options.pauseBeforeWrite - Pausa antes de empezar a escribir en ms (default: 300)
     */
    constructor(elementId, messages, options = {}) {
        this.element = document.getElementById(elementId);
        this.messages = messages;
        this.writeSpeed = options.writeSpeed || 50;
        this.deleteSpeed = options.deleteSpeed || 30;
        this.pauseBeforeDelete = options.pauseBeforeDelete || 1000;
        this.pauseBeforeWrite = options.pauseBeforeWrite || 300;
        
        this.currentMsgIdx = 0;
        this.currentCharIdx = 0;
        this.isWriting = true;
        this.isPaused = false;
    }
    
    /**
     * Inicia el efecto de typewriter
     * @param {number} delay - Retraso inicial antes de comenzar en ms
     */
    start(delay = 0) {
        if (!this.element) {
            console.warn(`[Typewriter] Elemento con ID "${this.element.id || 'desconocido'}" no encontrado.`);
            return;
        }
        setTimeout(() => this.tick(), delay);
    }
    
    /**
     * Ciclo interno que maneja la escritura y borrado
     */
    tick() {
        if (this.isPaused) return;
        
        const message = this.messages[this.currentMsgIdx];
        
        if (this.isWriting) {
            // Modo escritura
            if (this.currentCharIdx <= message.length) {
                this.element.textContent = message.substring(0, this.currentCharIdx);
                this.currentCharIdx++;
                setTimeout(() => this.tick(), this.writeSpeed);
            } else {
                // Pausa al terminar de escribir
                this.isPaused = true;
                setTimeout(() => {
                    this.isPaused = false;
                    this.isWriting = false;
                    this.tick();
                }, this.pauseBeforeDelete);
            }
        } else {
            // Modo borrado
            if (this.currentCharIdx > 0) {
                this.currentCharIdx--;
                this.element.textContent = message.substring(0, this.currentCharIdx);
                setTimeout(() => this.tick(), this.deleteSpeed);
            } else {
                // Cambiar al siguiente mensaje
                this.isWriting = true;
                this.currentMsgIdx = (this.currentMsgIdx + 1) % this.messages.length;
                this.isPaused = true;
                setTimeout(() => {
                    this.isPaused = false;
                    this.tick();
                }, this.pauseBeforeWrite);
            }
        }
    }
}

// Hacer la clase Typewriter accesible globalmente
window.Typewriter = Typewriter;
