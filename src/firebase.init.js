// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// don't share config in public 
const firebaseConfig = {
  apiKey: "AIzaSyDVxhG7AcxOcw3pff3pzxQTZNkaj87SO8I",
  authDomain: "email-password-auth-19858.firebaseapp.com",
  projectId: "email-password-auth-19858",
  storageBucket: "email-password-auth-19858.firebasestorage.app",
  messagingSenderId: "6017595247",
  appId: "1:6017595247:web:cc6010a5ba5915d6759a9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 