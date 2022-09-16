// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDmT-HTYbyhikz559fSl8dYiZU6jf45WUQ",
    authDomain: "suisse-base.firebaseapp.com",
    projectId: "suisse-base",
    storageBucket: "suisse-base.appspot.com",
    messagingSenderId: "674898191081",
    appId: "1:674898191081:web:0a24367d7a751139f40678"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app }