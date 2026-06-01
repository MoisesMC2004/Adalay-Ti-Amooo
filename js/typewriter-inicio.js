// Script de inicialización del efecto Typewriter en la página de inicio
document.addEventListener('DOMContentLoaded', () => {
    // Instanciar la clase Typewriter global
    const inicioTypewriter = new Typewriter('typewriter', [
        'Este detalle es para ti ✩',
        'Espero te guste ❀',
        'Lo hice con todo mi amor para ti ♡'
    ], {
        writeSpeed: 50,
        deleteSpeed: 30,
        pauseBeforeDelete: 1000,
        pauseBeforeWrite: 300
    });
    
    // Iniciar con un pequeño retraso de 800ms para esperar que carguen las transiciones
    inicioTypewriter.start(800);
});
