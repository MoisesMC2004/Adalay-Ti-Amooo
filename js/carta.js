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

