// Función para verificar la sesión
function verificarSesion() {
    // Verifica si hay una sesión válida en el almacenamiento local
    if (!localStorage.getItem("sesionActiva")) {
        // Si no hay una sesión válida y no estás en index.html, redirige al usuario a la página de inicio de sesión
        if (window.location.pathname !== "/index.html") {
            window.location.href = "index.html";
            console.log("No hay sesión, redirigiendo a index.html");
        } else {
            console.log("No hay sesión, pero ya estás en index.html");
        }
    } else {
        // Si la sesión está activa y el usuario intenta acceder a index.html, redirige a encriptacion.html
        if (window.location.pathname === "/index.html") {
            window.location.href = "encriptacion.html";
        }
    }
}