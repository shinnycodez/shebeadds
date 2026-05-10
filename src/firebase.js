// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyA8fJQr6e87bTCJIaEL5NCY0MbfltgWL9o",
  authDomain: "shebeadds.firebaseapp.com",
  projectId: "shebeadds",
  storageBucket: "shebeadds.firebasestorage.app",
  messagingSenderId: "729966764384",
  appId: "1:729966764384:web:484f59d5d1b391b038be05",
  measurementId: "G-BHBMB6EK4T"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
export const storage = getStorage(app);

// ✅ Export the db
export { db };