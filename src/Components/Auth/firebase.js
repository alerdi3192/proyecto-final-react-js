import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8m87mWAnaLKuREzndMaw4OuwJww_1JPw",
  authDomain: "prueba-auth-c8042.firebaseapp.com",
  projectId: "prueba-auth-c8042",
  storageBucket: "prueba-auth-c8042.firebasestorage.app",
  messagingSenderId: "259570336797",
  appId: "1:259570336797:web:65c8dfb1be05b66261b2f4"
};

/*

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8m87mWAnaLKuREzndMaw4OuwJww_1JPw",
  authDomain: "prueba-auth-c8042.firebaseapp.com",
  projectId: "prueba-auth-c8042",
  storageBucket: "prueba-auth-c8042.firebasestorage.app",
  messagingSenderId: "259570336797",
  appId: "1:259570336797:web:65c8dfb1be05b66261b2f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

*/

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth();

export function crearUsuario (email, password) {
  return (
    new Promise ((res, rej) => {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        console.log("Credenciales", userCredential)
        const user = userCredential.user;
        console.log(user)
        res(user)
        // ...
      })
      .catch((error) => {
        console.log(error.code, error.message)
        const errorCode = error.code;
        const errorMessage = error.message;
        rej(error)
        // ...
      })
    })
  )
}

export function loginEmailPass(email, password) {
  return (
    new Promise((res, rej) => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
      console.log("Credenciales", userCredential);
      const user = userCredential.user;
      console.log(user);
      res(user)
      // ...
      })
      .catch((error) => {
        console.log(error.code, error.message)
        const errorCode = error.code;
        const errorMessage = error.message;
        rej(error)
      });
    })
  )
}