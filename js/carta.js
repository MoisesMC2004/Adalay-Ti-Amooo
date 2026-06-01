// Interacción de la carta

const envelope = document.querySelector('.envelope-wrapper');
const letter = document.querySelector('.letter');

// Manejo de clicks en la carta
document.addEventListener('click', (e) => {
    // Si se hace click en el sobre o corazón
    if (
        e.target.matches(".envelope") || 
        e.target.matches(".tap-right") || 
        e.target.matches(".tap-left") || 
        e.target.matches(".heart")
    ) {
        envelope.classList.toggle('flap');
    } 
    // Si se hace click en el contenido de la carta
    else if (e.target.matches(".envelope *")) {
        if (!letter.classList.contains('opened')) {
            // Abrir carta
            letter.classList.add("letter-opening");

            setTimeout(() => {
                letter.classList.remove('letter-opening');
                letter.classList.add('opened');
            }, 500);
            
            envelope.classList.add("disable-envelope");
        } else {
            // Cerrar carta
            letter.classList.add('closing-letter');
            envelope.classList.remove("disable-envelope");
            letter.classList.remove('opened');
            
            setTimeout(() => {
                letter.classList.remove('closing-letter');
                letter.classList.remove('opened');
                
                // Cerrar el sobre automáticamente después de guardar la carta
                setTimeout(() => {
                    envelope.classList.remove('flap');
                }, 300);
            }, 500);
        }
    }
});

// Manejo de historial inteligente para dispositivos móviles
document.addEventListener('DOMContentLoaded', () => {
    // Registrar profundidad de navegación para esta página
    sessionStorage.setItem('navDepth', '1');

    // Inicializar el typewriter caligráfico usando la clase global POO
    const cartaTypewriter = new Typewriter('typewriter-carta', [
        'Dale click al sobre para abrir la carta!',
        'No soy bueno para escribir, pero espero te guste ♥'
    ], {
        writeSpeed: 30,
        deleteSpeed: 30,
        pauseBeforeDelete: 1300,
        pauseBeforeWrite: 1000
    });
    
    // Iniciar con un retraso correspondiente a las animaciones de entrada de la carta (4.3s)
    cartaTypewriter.start(4300);

    // Interceptar el botón "ATRÁS!" para retroceder en el historial nativo
    const atrasBtn = document.querySelector('a[href="../index.html"]');
    if (atrasBtn) {
        atrasBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Si el historial del navegador tiene páginas anteriores, ir hacia atrás
            if (window.history.length > 1) {
                window.history.back();
            } else {
                // Fallback seguro usando replace para no acumular basura en el stack
                window.location.replace('../index.html');
            }
        });
    }
});

