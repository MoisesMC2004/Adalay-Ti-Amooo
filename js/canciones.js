// JavaScript para el contador y cambio de canciones mensuales
// Sincronizado con Ciudad de México (UTC-6 / UTC-5 con horario de verano)

// Función para determinar si es horario de verano en Ciudad de México
function esHorarioVeranoCDMX(fecha) {
    const año = fecha.getFullYear();
    const mes = fecha.getMonth();
    const dia = fecha.getDate();
    
    // Horario de verano en México: primer domingo de abril - último domingo de octubre
    
    // Antes de abril o después de octubre: horario estándar
    if (mes < 3 || mes > 9) return false;
    
    // Mayo a septiembre: siempre horario de verano
    if (mes > 3 && mes < 9) return true;
    
    // Abril: encontrar el primer domingo
    if (mes === 3) {
        const primerDia = new Date(año, 3, 1);
        const primerDomingo = 1 + (7 - primerDia.getDay()) % 7;
        return dia >= primerDomingo;
    }
    
    // Octubre: encontrar el último domingo
    if (mes === 9) {
        const ultimoDia = new Date(año, 10, 0).getDate(); // Último día de octubre
        const ultimoDiaSemana = new Date(año, 9, ultimoDia).getDay();
        const ultimoDomingo = ultimoDia - ultimoDiaSemana;
        return dia < ultimoDomingo;
    }
    
    return false;
}

// Función para obtener la fecha actual en Ciudad de México
function getFechaCiudadMexico() {
    // Obtener la fecha UTC
    const ahora = new Date();
    const utc = ahora.getTime() + (ahora.getTimezoneOffset() * 60000);
    
    // Crear fecha temporal para verificar horario de verano
    const fechaTemp = new Date(utc + (3600000 * -6));
    
    // Determinar offset según horario de verano
    // UTC-5 durante horario de verano, UTC-6 en horario estándar
    const offsetCDMX = esHorarioVeranoCDMX(fechaTemp) ? -5 : -6;
    
    // Convertir a Ciudad de México con el offset correcto
    const fechaCDMX = new Date(utc + (3600000 * offsetCDMX));
    
    return fechaCDMX;
}

// Función para obtener el primer día del próximo mes
function getPrimerDiaProximoMes(fecha) {
    const año = fecha.getFullYear();
    const mes = fecha.getMonth();
    
    // Si es diciembre, el próximo mes es enero del siguiente año
    if (mes === 11) {
        return new Date(año + 1, 0, 1, 0, 0, 0, 0);
    } else {
        return new Date(año, mes + 1, 1, 0, 0, 0, 0);
    }
}

// Función para formatear números con ceros a la izquierda
function formatearNumero(numero) {
    return numero < 10 ? `0${numero}` : numero;
}

// Función para actualizar el contador
function actualizarContador() {
    const fechaActual = getFechaCiudadMexico();
    const proximoMes = getPrimerDiaProximoMes(fechaActual);
    
    // Calcular la diferencia en milisegundos
    const diferencia = proximoMes - fechaActual;
    
    // Calcular días, horas, minutos y segundos
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
    
    // Actualizar el DOM
    document.getElementById('dias').textContent = formatearNumero(dias);
    document.getElementById('horas').textContent = formatearNumero(horas);
    document.getElementById('minutos').textContent = formatearNumero(minutos);
    document.getElementById('segundos').textContent = formatearNumero(segundos);
    
    // Si el contador llega a cero, actualizar el contenedor
    if (diferencia <= 0) {
        mostrarCancionDelMes();
    }
}

// Función para mostrar la canción del mes actual
function mostrarCancionDelMes() {
    const fechaActual = getFechaCiudadMexico();
    const mesActual = fechaActual.getMonth(); // 0 = Enero, 11 = Diciembre
    
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
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar la canción del mes actual
    mostrarCancionDelMes();
    
    // Actualizar el contador inmediatamente
    actualizarContador();
    
    // Actualizar el contador cada segundo
    setInterval(actualizarContador, 1000);
});

