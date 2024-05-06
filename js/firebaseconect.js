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

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Agregamos los formularios como constantes uwu
const formularioRegistro = document.getElementById("formulario-registro");
const formularioInicio = document.getElementById("formulario-inicio");


const inputNombre = document.getElementById("nombre");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("contrasenia");

formularioRegistro.addEventListener("submit", async function (event) {
  event.preventDefault();

  const nombre = inputNombre.value;
  const email = inputEmail.value;
  const contrasenia = inputPassword.value;

  try {
    await addDoc(collection(firestore, "usuarios"), {
      nombre: nombre,
      email: email,
      contrasenia: contrasenia
    });

    inputNombre.value= "";
    inputEmail.value= "";
    inputPassword.value= "";

  } catch (error) {
    console.error("Error al agregar datos", error);
  }
});

const inputEmail2 = document.getElementById("email2");
const inputPassword2 = document.getElementById("contrasenia2");

formularioInicio.addEventListener("submit", async function (event){
    event.preventDefault();

    const email = inputEmail2.value;
    const contrasenia = inputPassword2.value;
    
   
        // Se crea una instancia de la coleccion usuarios
        const usuarios = collection(firestore, "usuarios");

        const q = await getDocs(query(usuarios, where("email", "==", email), where("contrasenia", "==", contrasenia)));
    
        if (!q.empty) {
            console.log("Inicio de sesión exitoso!")
            window.location.href = "encriptacion.html";
        } else{
            console.log("Error: Credenciales incorrectas")
        }
    
});