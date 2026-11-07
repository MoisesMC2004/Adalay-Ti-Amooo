// Script de inicialización del efecto Typewriter en la página de inicio (v3)
document.addEventListener('DOMContentLoaded', () => {
    // Instanciar la clase Typewriter global con el mensaje de reconstrucción solicitado
    const inicioTypewriter = new Typewriter('typewriter', [
        'Reconstruyendo la experiencia de tu pagina! ♡'
    ], {
        writeSpeed: 50,
        deleteSpeed: 25,
        pauseBeforeDelete: 3500,
        pauseBeforeWrite: 400
    });
    
    // Iniciar con un pequeño retraso de 800ms para esperar que carguen las transiciones
    inicioTypewriter.start(800);
});
