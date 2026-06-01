// JavaScript para el contador y cambio de canciones mensuales
// Sincronizado con Ciudad de México (UTC-6 Permanente, horario de verano abolido oficialmente)

// Variable global para desfase de tiempo en milisegundos con el servidor
let timeOffset = 0;

// Función para sincronizar la hora con un servidor seguro y evitar hackeos del reloj local
async function sincronizarHora() {
    try {
        let serverDateStr;
        // Si estamos en un entorno web, usar HEAD request al propio servidor (rápido, sin CORS, 100% fiable)
        if (window.location.protocol.startsWith('http')) {
            const response = await fetch(window.location.href, { method: 'HEAD' });
            serverDateStr = response.headers.get('Date');
        }
        
        // Fallback a API de hora mundial pública si falla la cabecera o estamos localmente en file://
        if (!serverDateStr) {
            // Ponemos un timeout de 3 segundos para evitar bloqueos prolongados en conexiones lentas
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);
            
            const response = await fetch('https://worldtimeapi.org/api/timezone/America/Mexico_City', { signal: controller.signal });
            const data = await response.json();
            clearTimeout(timeoutId);
            serverDateStr = data.utc_datetime;
        }
        
        if (serverDateStr) {
            const serverTime = new Date(serverDateStr);
            const localTime = new Date();
            timeOffset = serverTime.getTime() - localTime.getTime();
            console.log(`[Sincronización] Hora sincronizada con servidor. Desfase local detectado: ${timeOffset}ms`);
        }
    } catch (error) {
        console.warn("[Sincronización] No se pudo obtener la hora del servidor (offline o bloqueado). Usando reloj local.", error);
    }
}

// Función para obtener la fecha actual en Ciudad de México (GMT-6 Permanente)
// Retorna un Date object cuyos componentes UTC representan de forma exacta la hora de Ciudad de México
function getFechaCiudadMexico() {
    // Obtener la hora actual aplicando el desfase del servidor seguro
    const ahora = new Date(Date.now() + timeOffset);
    
    // Desplazar a Ciudad de México con el offset permanente de UTC-6
    const cdmxTimeMs = ahora.getTime() - (6 * 3600 * 1000);
    return new Date(cdmxTimeMs);
}

// Función para formatear números con ceros a la izquierda
function formatearNumero(numero) {
    return numero < 10 ? `0${numero}` : numero;
}

// Referencias de elementos DOM del contador en caché para optimizar rendimiento
let domDias, domHoras, domMinutos, domSegundos;

// Función para actualizar el contador
function actualizarContador() {
    const cdmxDate = getFechaCiudadMexico();
    
    // Obtener los datos temporales del objeto cdmxDate en UTC para evitar desfases locales
    const cdmxYear = cdmxDate.getUTCFullYear();
    const cdmxMonth = cdmxDate.getUTCMonth();
    
    // Siguiente mes en la línea temporal de Ciudad de México
    let proximoAño = cdmxYear;
    let proximoMes = cdmxMonth + 1;
    if (proximoMes > 11) {
        proximoMes = 0;
        proximoAño++;
    }
    
    // Timestamp UTC para el día 1 del próximo mes a las 00:00:00 en CDMX
    const targetTimeCDMX = Date.UTC(proximoAño, proximoMes, 1, 0, 0, 0, 0);
    
    // Calcular la diferencia exacta
    const diferencia = targetTimeCDMX - cdmxDate.getTime();
    
    // Si el contador llega a cero, actualizar el contenedor
    if (diferencia <= 0) {
        mostrarCancionDelMes();
        if (domDias) domDias.textContent = "00";
        if (domHoras) domHoras.textContent = "00";
        if (domMinutos) domMinutos.textContent = "00";
        if (domSegundos) domSegundos.textContent = "00";
        return;
    }
    
    // Calcular días, horas, minutos y segundos
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
    
    // Actualizar el DOM usando referencias en caché
    if (domDias) domDias.textContent = formatearNumero(dias);
    if (domHoras) domHoras.textContent = formatearNumero(horas);
    if (domMinutos) domMinutos.textContent = formatearNumero(minutos);
    if (domSegundos) domSegundos.textContent = formatearNumero(segundos);
}

// Función para mostrar la canción del mes actual
function mostrarCancionDelMes() {
    const cdmxDate = getFechaCiudadMexico();
    const mesActual = cdmxDate.getUTCMonth(); // Usar getUTCMonth ya que cdmxDate está adaptada en UTC
    
    // Ocultar todos los contenedores
    const todosContenedores = document.querySelectorAll('.cancion-mes');
    todosContenedores.forEach(contenedor => {
        contenedor.classList.remove('activo');
    });
    
    // Mostrar el contenedor del mes actual
    const contenedorActual = document.querySelector(`.cancion-mes[data-mes="${mesActual}"]`);
    if (contenedorActual) {
        contenedorActual.classList.add('activo');
    }
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    // Registrar profundidad de navegación para esta página
    sessionStorage.setItem('navDepth', '3');

    // Inicializar caché de elementos DOM
    domDias = document.getElementById('dias');
    domHoras = document.getElementById('horas');
    domMinutos = document.getElementById('minutos');
    domSegundos = document.getElementById('segundos');

    // Sincronizar la hora de forma segura antes de iniciar el reloj
    await sincronizarHora();

    // Mostrar la canción del mes actual
    mostrarCancionDelMes();
    
    // Actualizar el contador inmediatamente
    actualizarContador();
    
    // Actualizar el contador cada segundo
    setInterval(actualizarContador, 1000);

    // Interceptar el botón "INICIO" para limpiar el stack de navegación
    const inicioBtn = document.querySelector('a[href="../index.html"]');
    if (inicioBtn) {
        inicioBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const depth = parseInt(sessionStorage.getItem('navDepth') || '3', 10);
            
            // Si el historial del navegador contiene el camino completo, ir hacia atrás exacto para vaciar el stack
            if (depth > 0 && window.history.length > depth) {
                window.history.go(-depth);
            } else {
                // Fallback seguro usando replace para limpiar la entrada actual del stack
                window.location.replace('../index.html');
            }
        });
    }

    // Interceptar el botón "ATRÁS!" para retroceder en el historial de forma limpia
    const atrasBtn = document.querySelector('a[href="flores.html"]');
    if (atrasBtn) {
        atrasBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.replace('flores.html');
            }
        });
    }
});

