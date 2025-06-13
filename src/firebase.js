import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDN_BL1RjIeqpW-BQfvdVY08RM0SX3UsxU",
    authDomain: "tutor-fc786.firebaseapp.com",
    projectId: "tutor-fc786",
    storageBucket: "tutor-fc786.firebasestorage.app",
    messagingSenderId: "555103198345",
    appId: "1:555103198345:web:9bf34c8276cad44b2b3a58",
    measurementId: "G-WT25ZNZ2CH"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Sign in with Google
export const signInWithGoogle = () => signInWithPopup(auth, provider);

// Sign out
export const logout = () => signOut(auth);
