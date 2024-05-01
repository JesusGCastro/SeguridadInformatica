const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const formulario = document.getElementById('contactForm');
const botonSubmit = document.getElementById('botonDES');
const mensajeClaro = document.getElementById('mensajeCLARO');
let mensajeCifrado = document.getElementById('mensajeCIFRADO'); 

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
        let mensajeFinal = CryptoJS.DES.encrypt(mensaje, key).toString();

        // Actualiza el contenido del textarea con el mensaje cifrado
        mensajeCifrado = mensajeFinal;

        console.log(mensajeCifrado);
    });
});