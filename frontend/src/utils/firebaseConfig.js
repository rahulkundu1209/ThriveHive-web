import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0xIpo8jSpO8BjqXqpHs2lGzxHWCohPqQ",
  authDomain: "thrive-hives-web.firebaseapp.com",
  projectId: "thrive-hives-web",
  storageBucket: "thrive-hives-web.firebasestorage.app",
  messagingSenderId: "404012425768",
  appId: "1:404012425768:web:5ef19565af98be7281cb1d",
  measurementId: "G-26CZ4K57PP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
