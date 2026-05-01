// Efecto typewriter para carta.html
document.addEventListener('DOMContentLoaded', () => {
    const mensajes = [
        'Dale click al sobre para abrir la carta!',
        'No soy bueno para escribir, pero espero te guste ♥'
    ];
    
    const elementoTypewriter = document.getElementById('typewriter-carta');
    const velocidadEscritura = 30;
    const velocidadBorrado = 30;
    const pausaEntreMensajes = 1000; // Pausa al terminar de escribir
    const pausaAntesBorrar = 300;   // Pausa antes de empezar a borrar
    
    let indiceMensaje = 0;
    let indiceCaracter = 0;
    let estaEscribiendo = true;
    
    function escribir() {
        const mensajeActual = mensajes[indiceMensaje];
        
        if (estaEscribiendo) {
            if (indiceCaracter < mensajeActual.length) {
                elementoTypewriter.textContent += mensajeActual.charAt(indiceCaracter);
                indiceCaracter++;
                setTimeout(escribir, velocidadEscritura);
            } else {
                // Terminó de escribir, esperar antes de borrar
                estaEscribiendo = false;
                setTimeout(escribir, pausaEntreMensajes + pausaAntesBorrar);
            }
        } else {
            if (indiceCaracter > 0) {
                elementoTypewriter.textContent = mensajeActual.substring(0, indiceCaracter - 1);
                indiceCaracter--;
                setTimeout(escribir, velocidadBorrado);
            } else {
                // Terminó de borrar, cambiar al siguiente mensaje
                estaEscribiendo = true;
                indiceMensaje = (indiceMensaje + 1) % mensajes.length;
                setTimeout(escribir, pausaEntreMensajes);
            }
        }
    }
    
    // Iniciar después de que termine la animación de la carta (3.1s + 1.2s de fadeIn = 4.3s)
    setTimeout(escribir, 4300);
});
