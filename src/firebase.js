// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, doc, setDoc  , getDocs , getFirestore , where , query , deleteDoc  } from "firebase/firestore";

import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword , signOut  } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0hf2C2es9SPGi4B0aVWwElwyMYBcgkZ4",
  authDomain: "basmaapp-e77be.firebaseapp.com",
  projectId: "basmaapp-e77be",
  storageBucket: "basmaapp-e77be.appspot.com",
  messagingSenderId: "851140060909",
  appId: "1:851140060909:web:86b935d14aa13c58878ee4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { db , setDoc , doc , where , query , collection , getDocs  , auth , createUserWithEmailAndPassword , signInWithEmailAndPassword , signOut , deleteDoc} ;