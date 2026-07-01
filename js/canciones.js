// JavaScript para el contador y cambio de canciones mensuales
// Sincronizado con Ciudad de México (UTC-6 Permanente, horario de verano abolido oficialmente)

// Base de datos de canciones (Año, Mes, Título, Imagen y Descripción)
// Nota: month es base 0 (0 = Enero, 11 = Diciembre)
const CANCIONES_DB = [
    {
        year: 2025,
        month: 9, // Octubre
        monthName: "Octubre",
        titulo: "Just The Way You Are.",
        imagen: "../img/SVG/cancion-mes1.svg",
        descripcion: "Primer mes, primera canción, y qué mejor que \"Just the way you are\" para recordarte que eres increíblemente hermosa justo como tú eres!<br><br>No necesitas cambiar absolutamente nada en ti, eres preciosa!<br>Te amo mi niña ♡"
    },
    {
        year: 2025,
        month: 10, // Noviembre
        monthName: "Noviembre",
        titulo: "Bemaste.",
        imagen: "../img/SVG/cancion-mes2.svg",
        descripcion: "Poco más de 4 meses de conocerte, es increíble lo rápido que pasa el tiempo! <br><br>Te dejo esta cancioncita para que recuerdes el cambio que le diste a mi vida, te amo! <3"
    },
    {
        year: 2025,
        month: 11, // Diciembre
        monthName: "Diciembre",
        titulo: "Beautiful Things.",
        imagen: "../img/SVG/cancion-mes3.svg",
        descripcion: "Llegamos a diciembre, y qué mejor que esta canción, ya que como la misma lo dice \"Por un tiempo fue duro, pero últimamente me ha ido mejor, que los últimos cuatro fríos diciembres\", y ¿por qué me ha ido mejor? Porque ahora estás tú! <br><br>Te amo princesa."
    },
    {
        year: 2026,
        month: 0, // Enero
        monthName: "Enero",
        titulo: "Thinking Out Loud.",
        imagen: "../img/SVG/cancion-mes4.svg",
        descripcion: "Comenzamos un nuevo año juntos y si, adivinaste! Hay una nueva canción para ti. <br><br>Vamos por buen camino, y cada vez somos mejores juntos!<br>Te amo caliño ♡"
    },
    {
        year: 2026,
        month: 1, // Febrero
        monthName: "Febrero",
        titulo: "Those Eyes.",
        imagen: "../img/SVG/cancion-mes5.svg",
        descripcion: "El mes del amor merece una canción especial, y qué mejor que esta! <br><br>Para que nunca olvides que cada cosa pequeña, cada sonrisa, cada mirada, cada momento, son las cosas que me hacen recordar el amor tan inmenso que siento por ti. <br> Te amo mi amor."
    },
    {
        year: 2026,
        month: 2, // Marzo
        monthName: "Marzo",
        titulo: "M.A.I",
        imagen: "../img/SVG/cancion-mes6.svg",
        descripcion: "Casi medio año de conocernos, medio año de momentos inolvidables.<br><br>Eres la mejor, hermosa, te adolo y te amo mucho!"
    },
    {
        year: 2026,
        month: 3, // Abril
        monthName: "Abril",
        titulo: "Yellow.",
        imagen: "../img/SVG/cancion-mes7.svg",
        descripcion: "Wow! Llegamos a abril ya, todo a avanzado super bonito, y estamos en camino a nuestro primer añito juntos! <br><br>Gracias por ser mi amore, te amo mucho!"
    },
    {
        year: 2026,
        month: 4, // Mayo
        monthName: "Mayo",
        titulo: "Contigo.",
        imagen: "../img/SVG/cancion-mes8.svg",
        descripcion: "Mayo... ¡Cada vez falta menos para celebrar nuestro primer aniversario!<br><br>Hemos pasado muchas cosas juntos, malos acuerdos, algunas pequeñas discusiones, pero también momentos hermosos y que siempre tendré en mi mente y en mi corazón.<br>Espero que tú también... Quería decirte cuánto te amo, y creo que la canción de este mes explica bastante bien muchas de las cosas que siento por ti, mi princesita ♡<br><br>PD: Hay partes de la cancion que se pueden interpretar de manera \"de despedida\" sin embargo no quiero que lo veas asi porque para nada que lo es... Trata de entender la cancion completa y veras que tiene un significado grandisimo, que lo que se podia interpretar mal, realmente transmite un mensaje super lindo... Escuchala detalladamente ♡"
    },
    {
        year: 2026,
        month: 5, // Junio
        monthName: "Junio",
        titulo: "Donde nadie pueda ir.",
        imagen: "../img/SVG/cancion-mes9.svg",
        descripcion: "Wow! Nos vamos poco a poco acercando a nuestro primer aniversario! <br><br>Es increíble lo rápido que ha pasado el tiempo, pero al mismo tiempo siento que cada día contigo es más especial que el anterior. Todos los días son un regalo a tu lado! <br>Sé que hemos tenido muchos momentos muy lindos, especiales y únicos juntos, pero no todo ha sido felicidad, ha habido momentos difíciles pero siempre los hemos superado juntos. No ha habido nada que nos haya podido separar y eso es algo que siempre debe mantenerse. <br><br>Eres todo lo que quiero y más. Te amo mucho princesita!"
    },
    {
        year: 2026,
        month: 6, // Julio
        monthName: "Julio",
        titulo: "Ojitos Lindos.",
        imagen: "../img/SVG/cancion-mes10.svg",
        descripcion: "Julio... El mes de tu cumpleaños y que mejor que con una cancion que me empezo a gustar mucho despues de que te conoci! <br><br> Te quiero dar las gracias por seguir aqui, por no rendirte, ha habido grandes momentos, pero tambien momentos dificiles juntos, aun asi, han sido unos meses increibles, cada vez nos vamos acercando a nuestro primer aniversario y me siento muy feliz de que estemos un mes mas aqui, juntos, y que mejor que en el mes de tu cumpleaños!<br><br>Te amo mucho mi amor, feliz cumpleaños adelantado y feliz primer cumpleaños tuyo juntos!<br><br>PD: Regresa el dia de tu cumpleaños... Habra una sorpresita para ti. Pero OJO, no sera tan facil jeje... ♡"
    },
    {
        year: 2026,
        month: 7, // Agosto
        monthName: "Agosto",
        titulo: "Mes 11",
        imagen: "../img/SVG/cancion-mes11.svg",
        descripcion: "Casi un año juntos, y cada día es mejor."
    },
    {
        year: 2026,
        month: 8, // Septiembre
        monthName: "Septiembre",
        titulo: "Mes 12",
        imagen: "../img/SVG/cancion-mes12.svg",
        descripcion: "Un año completo de amor. Gracias por cada momento."
    }
];


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
    const cdmxYear = cdmxDate.getUTCFullYear();
    const cdmxMonth = cdmxDate.getUTCMonth(); // Usar getUTCMonth ya que cdmxDate está adaptada en UTC

    const contenedor = document.getElementById('contenedor-canciones');
    if (!contenedor) return;

    // Buscar la canción correspondiente al año y mes actual en Ciudad de México
    const cancionActual = CANCIONES_DB.find(c => c.year === cdmxYear && c.month === cdmxMonth);

    // Renderizar canción activa o el estado vacío (próximamente)
    if (!cancionActual) {
        contenedor.innerHTML = `
            <div class="cancion-mes activo empty-state">
                <div class="cancion-imagen-placeholder">
                    <div class="glow-heart-placeholder">❤️</div>
                </div>
                <div class="cancion-contenido">
                    <h2 class="mes-titulo">Próximamente... ♡</h2>
                    <p class="mes-descripcion">Estamos preparando algo muy especial para ti. ¡Vuelve pronto para descubrir la canción de este mes! 🥰</p>
                </div>
            </div>
            <div class="cancion-footer" style="border-top: none; padding-top: 0; margin-top: 20px;">
                <button class="btn-historial" id="open-historial">HISTORIAL</button>
            </div>
        `;
    } else {
        contenedor.innerHTML = `
            <div class="cancion-mes activo">
                <div class="cancion-body">
                    <div class="cancion-imagen">
                        <img src="${cancionActual.imagen}" alt="${cancionActual.titulo}">
                    </div>
                    <div class="cancion-contenido">
                        <h2 class="mes-titulo">${cancionActual.titulo}</h2>
                        <p class="mes-descripcion">${cancionActual.descripcion}</p>
                    </div>
                </div>
                <div class="cancion-footer">
                    <button class="btn-historial" id="open-historial">HISTORIAL</button>
                </div>
            </div>
        `;
    }

    // Configurar listener para abrir el historial
    const openBtn = document.getElementById('open-historial');
    if (openBtn) {
        openBtn.addEventListener('click', abrirModalHistorial);
    }
}

// Función para abrir el modal del historial
function abrirModalHistorial() {
    const modal = document.getElementById('modal-historial');
    if (modal) {
        renderizarHistorial();
        modal.classList.add('open');
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden'; // Evitar scroll del fondo
    }
}

// Función para cerrar el modal del historial
function cerrarModalHistorial() {
    const modal = document.getElementById('modal-historial');
    if (modal) {
        modal.classList.remove('open');
        document.body.classList.remove('modal-open');
        document.body.style.overflow = ''; // Restaurar scroll del fondo

        // Contraer cualquier acordeón abierto
        document.querySelectorAll('.historial-item.open').forEach(openItem => {
            openItem.classList.remove('open');
            const body = openItem.querySelector('.historial-body');
            if (body) body.style.maxHeight = null;
        });
    }
}

// Función para renderizar e inicializar la lista del historial
function renderizarHistorial() {
    const cdmxDate = getFechaCiudadMexico();
    const cdmxYear = cdmxDate.getUTCFullYear();
    const cdmxMonth = cdmxDate.getUTCMonth();

    // Filtrar canciones anteriores a la actual (de más reciente a más antigua)
    const cancionesPasadas = CANCIONES_DB.filter(c => {
        return c.year < cdmxYear || (c.year === cdmxYear && c.month < cdmxMonth);
    }).reverse();

    const listaContenedor = document.getElementById('historial-lista');
    if (!listaContenedor) return;

    listaContenedor.innerHTML = '';

    if (cancionesPasadas.length === 0) {
        listaContenedor.innerHTML = `
            <p style="text-align: center; color: #ffb8de; font-family: 'Montserrat', sans-serif; padding: 20px 0;">
                Aún no hay canciones en el historial. ♡
            </p>
        `;
        return;
    }

    // Renderizar cada canción pasada
    cancionesPasadas.forEach(cancion => {
        const item = document.createElement('div');
        item.className = 'historial-item';

        item.innerHTML = `
            <div class="historial-header">
                <div class="historial-thumbnail">
                    <img src="${cancion.imagen}" alt="${cancion.titulo}">
                </div>
                <div class="historial-info">
                    <span class="historial-mes">${cancion.monthName} ${cancion.year}</span>
                    <div class="historial-titulo">${cancion.titulo}</div>
                </div>
                <div class="historial-icon">
                    <svg viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5H7z"/>
                    </svg>
                </div>
            </div>
            <div class="historial-body">
                <div class="historial-body-content">
                    ${cancion.descripcion}
                </div>
            </div>
        `;

        listaContenedor.appendChild(item);

        // Interactividad del acordeón
        const header = item.querySelector('.historial-header');
        const body = item.querySelector('.historial-body');

        header.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Cerrar otros acordeones abiertos
            document.querySelectorAll('.historial-item.open').forEach(openItem => {
                if (openItem !== item) {
                    openItem.classList.remove('open');
                    const openBody = openItem.querySelector('.historial-body');
                    if (openBody) openBody.style.maxHeight = null;
                }
            });

            if (isOpen) {
                item.classList.remove('open');
                body.style.maxHeight = null;
            } else {
                item.classList.add('open');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });
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

    // Event listener para cerrar el modal desde el botón de cerrar
    const closeBtn = document.getElementById('close-historial');
    if (closeBtn) {
        closeBtn.addEventListener('click', cerrarModalHistorial);
    }

    // Cerrar modal al hacer clic en el fondo difuminado
    const modal = document.getElementById('modal-historial');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                cerrarModalHistorial();
            }
        });
    }

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

