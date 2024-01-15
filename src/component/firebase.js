import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyA5J9oiQ-Gg3-9PMVLST5KN23w1baYo8B8",
    authDomain: "todo-d2299.firebaseapp.com",
    projectId: "todo-d2299",
    storageBucket: "todo-d2299.appspot.com",
    messagingSenderId: "916993706301",
    appId: "1:916993706301:web:a8538c91d587d8f45b9d54",
    measurementId: "G-E79N9XC5K3"
  };


const app = initializeApp(firebaseConfig);
const firestore  = getFirestore(app);

export{firestore }
export {collection, addDoc, getDocs, deleteDoc, doc, updateDoc };