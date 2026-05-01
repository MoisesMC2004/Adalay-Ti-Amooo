// Efecto Typewriter con múltiples mensajes
const typewriter = document.getElementById('typewriter');

// Los 3 mensajes que se mostrarán con sus iconos
const mensajes = [
    'Este detalle es para ti ✩',
    'Espero te guste ❀',
    'Lo hice con todo mi amor para ti ♡'
];

let mensajeActual = 0;
let caracterActual = 0;
let escribiendo = true;
let pausado = false;

// Velocidades optimizadas (en milisegundos) - Más rápidas y fluidas
const velocidadEscritura = 50;  // Velocidad al escribir (más rápida)
const velocidadBorrado = 30;    // Velocidad al borrar (más rápida)
const pausaEntreMensajes = 1500; // Pausa al terminar de escribir (reducida)
const pausaAntesBorrar = 1000;   // Pausa antes de empezar a borrar (reducida)

function escribirTexto() {
    // Si está en pausa, no hacer nada
    if (pausado) return;

    const mensaje = mensajes[mensajeActual];

    if (escribiendo) {
        // Modo escritura
        if (caracterActual <= mensaje.length) {
            typewriter.textContent = mensaje.substring(0, caracterActual);
            caracterActual++;
            setTimeout(escribirTexto, velocidadEscritura);
        } else {
            // Terminó de escribir, hacer pausa
            pausado = true;
            setTimeout(() => {
                pausado = false;
                escribiendo = false;
                escribirTexto();
            }, pausaAntesBorrar);
        }
    } else {
        // Modo borrado
        if (caracterActual > 0) {
            caracterActual--;
            typewriter.textContent = mensaje.substring(0, caracterActual);
            setTimeout(escribirTexto, velocidadBorrado);
        } else {
            // Terminó de borrar, cambiar al siguiente mensaje
            escribiendo = true;
            mensajeActual = (mensajeActual + 1) % mensajes.length;
            
            // Pequeña pausa antes de escribir el siguiente mensaje
            pausado = true;
            setTimeout(() => {
                pausado = false;
                escribirTexto();
            }, 300);
        }
    }
}

// Iniciar el efecto cuando la página cargue
window.addEventListener('DOMContentLoaded', () => {
    // Esperar un poco antes de empezar
    setTimeout(() => {
        escribirTexto();
    }, 800);
});

