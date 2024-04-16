const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Función para registrar un usuario en la base de datos
function registrarUsuario(nombre, email, contraseña) {
    // Obtener una referencia a la base de datos
    const db = getDatabase();

    // Obtener una referencia al nodo de usuarios en la base de datos
    const usuariosRef = ref(db, 'usuarios');

    // Generar un ID único para el nuevo usuario
    const nuevoUsuarioRef = push(usuariosRef);

    // Datos del nuevo usuario
    const nuevoUsuarioData = {
        nombre: nombre,
        email: email,
        contraseña: contraseña
    };

    // Escribir los datos del nuevo usuario en la base de datos
    set(nuevoUsuarioRef, nuevoUsuarioData)
        .then(() => {
            console.log('Usuario registrado exitosamente');
        })
        .catch((error) => {
            console.error('Error al registrar usuario:', error);
        });
}

document.querySelector('.form-container.sign-up button').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del botón

    // Obtener los valores del formulario
    const nombre = this.closest('form').querySelector('input[name="nombre"]').value;
    const email = this.closest('form').querySelector('input[name="email"]').value;
    const contraseña = this.closest('form').querySelector('input[name="contraseña"]').value;

    // Llamar a la función para registrar el usuario en la base de datos
    registrarUsuario(nombre, email, contraseña);
});