// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, collection, query, where, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7S5FedSYlotsuy0JUW6D6gpKBGrZI7uU",
  authDomain: "encriptaciondes.firebaseapp.com",
  projectId: "encriptaciondes",
  storageBucket: "encriptaciondes.appspot.com",
  messagingSenderId: "444515557364",
  appId: "1:444515557364:web:6c3b56a62d4dac6459e3a1",
  measurementId: "G-MX5LWZCQ2G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); 

// Confirmamos la conexión
console.log("Se realizo la conexión de forma exitosa!");

// Función para mostrar errores en la página
function mostrarError(mensaje) {
  const errorContainer = document.getElementById('error-container');
  errorContainer.innerHTML = `<p>${mensaje}</p>`;
  errorContainer.style.display = 'block'; // Mostrar el contenedor de errores
}

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


function iniciarSesion() {
  // Guarda un indicador de sesión en el almacenamiento local
  localStorage.setItem("sesionActiva", "true");
  console.log("Si hay sesion");
}

// Agregamos los formularios como constantes uwu
const formularioRegistro = document.getElementById("formulario-registro");
const formularioInicio = document.getElementById("formulario-inicio");

const inputNombre = document.getElementById("nombre");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("contrasenia");

formularioRegistro.addEventListener("submit", async function (event) {
  event.preventDefault();

  const nombre = inputNombre.value.trim(); // Eliminar espacios en blanco al inicio y al final
  const email = inputEmail.value.trim(); // Eliminar espacios en blanco al inicio y al final
  const contrasenia = inputPassword.value.trim(); // Eliminar espacios en blanco al inicio y al final

  // Verificar que ningún campo esté vacío
  if (nombre === "" || email === "" || contrasenia === "") {
    mostrarError("**Todos los campos deben estar llenos**");
    return; // Detener la ejecución si hay campos vacíos
  }

  // Definir la key para cifrar
  const key = "CTBroRealmenteEstaEsLaClaveMontana";

  // Cifra el mensaje usando CryptoJS
  const contraseniaE = CryptoJS.DES.encrypt(contrasenia,key,{
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
  }).toString();


  try {
    await addDoc(collection(firestore, "usuarios"), {
      nombre: nombre,
      email: email,
      contrasenia: contraseniaE
    });

    inputNombre.value= "";
    inputEmail.value= "";
    inputPassword.value= "";

  } catch (error) {
    mostrarError("**Error al registrar datos: " + error.message+"**");
  }
});

const inputEmail2 = document.getElementById("email2");
const inputPassword2 = document.getElementById("contrasenia2");

formularioInicio.addEventListener("submit", async function (event){
  event.preventDefault();

  iniciarSesion();

  //CAPTCHA
  const captchaResponse = grecaptcha.getResponse();
  if (!captchaResponse > 0) {
    mostrarError("**Es necesario realizar el Captcha para continuar.**");
    throw new Error("Es necesario realizar el Captcha para continuar.");
  }


  const email = inputEmail2.value;
  const contrasenia = inputPassword2.value;

  // Verificar que ningún campo esté vacío
  if (email == "" || contrasenia == "") {
    mostrarError("**Todos los campos deben estar llenos**");
    return; // Detener la ejecución si hay campos vacíos
  }

  // Definir la key para cifrar
  const key = "CTBroRealmenteEstaEsLaClaveMontana";

  // Se crea una instancia de la colección "usuarios"
  const usuarios = collection(firestore, "usuarios");

  // Realizar una consulta para encontrar el usuario con el correo electrónico proporcionado
  const q = await getDocs(query(usuarios, where("email", "==", email)));

  if (!q.empty) {
      // Obtiene la primera coincidencia de usuario (asumiendo que los correos electrónicos son únicos)
      const usuario = q.docs[0].data();
      // Extrae la contraseña cifrada del usuario recuperado de la base de datos
      const contraseniaGuardada = usuario.contrasenia;

      // Definir la key para descifrar
      const key = "CTBroRealmenteEstaEsLaClaveMontana";

      // Cifra el mensaje usando CryptoJS
      const contraseniaD = CryptoJS.DES.decrypt(contraseniaGuardada,key,{
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
      });

      console.log(contraseniaD);

      // Compara las contraseñas cifradas
      if (contrasenia === contraseniaD.toString(CryptoJS.enc.Utf8)) {
          console.log("Inicio de sesión exitoso!");
          window.location.href = "encriptacion.html";
      } else {
        mostrarError("**Correo o contraseña incorrecta**");
      }
  } else {
    mostrarError("**Error al iniciar sesion: " + error.message+"**");
  }
});
