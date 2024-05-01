import CryptoJS from 'crypto-js';

const key = "CTBroRealmenteEstaEsLaClaveMontana";

function encriptar(mensaje) {
    const texto_cifrado = CryptoJS.DES.encrypt(mensaje, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7 
    });
    return texto_cifrado.toString(); // Convertir a cadena legible
}

function desencriptar(mensaje){
    const texto_descifrado = CryptoJS.DES.decrypt(mensaje, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7 });

    return texto_descifrado.toString(); // Convertir a cadena legible
}

