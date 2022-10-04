// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyCL01W7I3NbH-VITrPtBd3vzyIAUmfXOTs",
    authDomain: "franco-chat.firebaseapp.com",
    projectId: "franco-chat",
    storageBucket: "franco-chat.appspot.com",
    messagingSenderId: "722446956416",
    appId: "1:722446956416:web:ce703f2c59e4c494963365"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()