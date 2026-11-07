/**
 * ==========================================================================
 * SISTEMA DE POPUPS / RECADOS (ADALAY V3)
 * Controla la secuencia de 4 mensajes interactivos y responsivos
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Definición de los 4 recados solicitados
    const messages = [
        {
            badge: 'Recado 1 de 4',
            text: 'Vaya... Esto esta tardando mas de lo normal, pero creeme, se que te gustara.',
            buttonText: 'Siguiente ♡',
            isSpecial: false
        },
        {
            badge: 'Recado 2 de 4',
            text: 'Sabes que me gusta hacer que las cosas se vean bien, y estoy haciendo mi maximo esfuerzo para que esto nuevo te encante!',
            buttonText: 'Siguiente ♡',
            isSpecial: false
        },
        {
            badge: 'Recado 3 de 4',
            text: 'Una nueva experiencia se viene y seras la primera en saberlo...',
            buttonText: 'Siguiente ♡',
            isSpecial: false
        },
        {
            badge: 'Recado 4 de 4',
            text: 'Con amor, Moises <3',
            buttonText: 'Cerrar ♡',
            isSpecial: true
        }
    ];

    // Elementos del DOM
    const openBtn = document.getElementById('btn-click');
    const overlay = document.getElementById('popup-overlay');
    const closeBtn = document.getElementById('popup-close');
    const nextBtn = document.getElementById('popup-btn-next');
    const prevBtn = document.getElementById('popup-btn-prev');
    const badgeEl = document.getElementById('popup-badge');
    const messageContainer = document.getElementById('popup-message-container');
    const dotsContainer = document.getElementById('popup-dots');

    if (!overlay || !openBtn) return;

    let currentIndex = 0;
    let isTransitioning = false;

    // Generar indicadores de puntos dinámicamente
    dotsContainer.innerHTML = '';
    messages.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.className = `popup-dot ${idx === 0 ? 'active' : ''}`;
        dot.dataset.index = idx;
        dotsContainer.appendChild(dot);
    });
    const dots = dotsContainer.querySelectorAll('.popup-dot');

    /**
     * Renderiza el contenido del mensaje según el índice actual
     */
    function renderStep(index, animate = true) {
        const item = messages[index];
        if (!item) return;

        const updateContent = () => {
            badgeEl.textContent = item.badge;
            nextBtn.textContent = item.buttonText;

            // Control de botón "Anterior"
            if (index > 0) {
                prevBtn.classList.remove('hidden');
            } else {
                prevBtn.classList.add('hidden');
            }

            // Actualizar puntos
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            // Actualizar texto
            if (item.isSpecial) {
                messageContainer.className = 'popup-message special-sign';
                messageContainer.innerHTML = `
                    <span class="sign-intro">Con amor,</span>
                    <span class="sign-name">Moises <span class="heart-text">&lt;3</span></span>
                `;
            } else {
                messageContainer.className = 'popup-message';
                messageContainer.textContent = item.text;
            }

            if (animate) {
                messageContainer.classList.add('fade-in');
                requestAnimationFrame(() => {
                    messageContainer.classList.remove('fade-in');
                });
            }
        };

        if (animate) {
            isTransitioning = true;
            messageContainer.classList.add('fade-out');
            setTimeout(() => {
                messageContainer.classList.remove('fade-out');
                updateContent();
                isTransitioning = false;
            }, 250);
        } else {
            updateContent();
        }
    }

    /**
     * Abre el modal
     */
    function openModal() {
        currentIndex = 0;
        renderStep(currentIndex, false);
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Cierra el modal
     */
    function closeModal() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            currentIndex = 0;
            renderStep(0, false);
        }, 350);
    }

    /**
     * Avanza al siguiente recado o cierra si es el último
     */
    function handleNext() {
        if (isTransitioning) return;
        if (currentIndex < messages.length - 1) {
            currentIndex++;
            renderStep(currentIndex, true);
        } else {
            closeModal();
        }
    }

    /**
     * Regresa al recado anterior
     */
    function handlePrev() {
        if (isTransitioning) return;
        if (currentIndex > 0) {
            currentIndex--;
            renderStep(currentIndex, true);
        }
    }

    // Event Listeners
    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });

    closeBtn.addEventListener('click', closeModal);
    nextBtn.addEventListener('click', handleNext);
    prevBtn.addEventListener('click', handlePrev);

    // Cerrar al hacer clic en el backdrop fuera de la tarjeta
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });

    // Soporte para teclado (Escape, Enter, Flechas)
    document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
            handleNext();
        } else if (e.key === 'ArrowLeft') {
            handlePrev();
        }
    });
});
