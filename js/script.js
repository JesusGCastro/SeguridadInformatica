const loginBtn = document.getElementById('login');
const formulario = document.getElementById('contactForm');
const formularioDesencriptado = document.getElementById('contactForm2');
const botonSubmit = document.getElementById('botonDES');

// Campos para encriptar
const mensajeClaro = document.getElementById('mensajeCLARO');
const mensajeCifrado = document.getElementById('mensajeCIFRADO'); 

document.addEventListener('click', function() {
    // Obtener el formulario y el botón de enviar
    // Agregar un listener para el evento submit del formulario
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Definir la key para cifrar
        const key = "CTBroRealmenteEstaEsLaClaveMontana";
        
        // Obtén el contenido del textarea
        const mensaje = mensajeClaro.value;

        // Cifra el mensaje usando CryptoJS
        const mensajeFinal = CryptoJS.DES.encrypt(mensaje,key,{
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        // Actualiza el contenido del textarea con el mensaje cifrado
        mensajeCifrado.value = mensajeFinal;
    });
});

// Campos para encriptar
const cifradoMensaje = document.getElementById('mensajeCIFRADO2');
const claroMensaje = document.getElementById('mensajeCLARO2'); 

document.addEventListener('click', function() {
    // Obtener el formulario y el botón de enviar
    // Agregar un listener para el evento submit del formulario
    formularioDesencriptado.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Definir la key para descifrar
        const key = "CTBroRealmenteEstaEsLaClaveMontana";
        
        // Obtén el contenido del textarea
        const textoADescifrar = cifradoMensaje.value;

        // Cifra el mensaje usando CryptoJS
        const mensajeFinal = CryptoJS.DES.decrypt(textoADescifrar,key,{
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        // Actualiza el contenido del textarea con el mensaje cifrado
        claroMensaje.value = mensajeFinal.toString(CryptoJS.enc.Utf8);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Obtén el botón de limpiar
    const botonLimpiar = document.getElementById('botonLimpiar');
    
    // Agregar un listener para el evento click del botón Limpiar
    botonLimpiar.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Limpiar los textareas
        mensajeClaro.value = "";
        mensajeCifrado.value = "";
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Obtén el botón de limpiar
    const botonLimpiar2 = document.getElementById('botonLimpiar2');

    // Agregar un listener para el evento click del botón Limpiar
    botonLimpiar2.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Limpiar los textareas
        cifradoMensaje.value = "";
        claroMensaje.value = "";
    });
});