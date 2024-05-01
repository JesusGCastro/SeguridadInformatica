const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const formulario = document.getElementById('contactForm');
const botonSubmit = document.getElementById('botonDES');
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

document.addEventListener('click', function() {
    // Obtener el formulario y el botón de enviar


    // Agregar un listener para el evento submit del formulario
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        // Aquí puedes agregar tu lógica para manejar la acción de enviar el formulario
        console.log('Mensaje cifrado');

    });
});