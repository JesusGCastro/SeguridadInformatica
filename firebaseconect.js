// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
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

console.log("Se realizo la conexión de forma exitosa!");

const formulario = document.getElementById("formulario-registro");
const inputNombre = document.getElementById("nombre");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("contrasenia");

formulario.addEventListener("submit", async function (event) {
  event.preventDefault();

  const nombre = inputNombre.value;
  const email = inputEmail.value;
  console.log(inputPassword.value);
  const contrasenia = inputPassword.value;

  try {
    await addDoc(collection(firestore, "usuarios"), {
      nombre: nombre,
      email: email,
      contrasenia: contrasenia
    });
  } catch (error) {
    console.error("Error al agregar datos", error);
  }
});