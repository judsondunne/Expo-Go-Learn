// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQEA7aILFFRdDexv64E5TrJILG7g3VGZo",
  authDomain: "learn-32d72.firebaseapp.com",
  projectId: "learn-32d72",
  storageBucket: "learn-32d72.appspot.com",
  messagingSenderId: "630383517072",
  appId: "1:630383517072:web:4ddd61d0b21190ad626715",
  measurementId: "G-D0XTB01K24",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const storage = getStorage(app);
export const db = getFirestore();
export const auth = getAuth(app);
