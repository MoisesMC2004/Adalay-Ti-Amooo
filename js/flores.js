// Script para la página de flores

// Manejo de historial inteligente para dispositivos móviles
document.addEventListener('DOMContentLoaded', () => {
    // Registrar profundidad de navegación para esta página
    sessionStorage.setItem('navDepth', '2');

    // Interceptar el botón "ATRÁS!" para retroceder en el historial nativo
    const atrasBtn = document.querySelector('a[href="carta.html"]');
    if (atrasBtn) {
        atrasBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Si el historial del navegador tiene páginas anteriores, ir hacia atrás
            if (window.history.length > 1) {
                window.history.back();
            } else {
                // Fallback seguro usando replace para no acumular basura en el stack
                window.location.replace('carta.html');
            }
        });
    }
});
