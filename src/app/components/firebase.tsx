
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA9hJKbsYs82xpI32lNwfSUsSW4IxrM7_o",
    authDomain: "login-elearning-be4fb.firebaseapp.com",
    projectId: "login-elearning-be4fb",
    storageBucket: "login-elearning-be4fb.appspot.com",
    messagingSenderId: "961744702876",
    appId: "1:961744702876:web:54c4a99cf42cb71c440c59",
    measurementId: "G-NYHJ4814HV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
