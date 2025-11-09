// src/firebase.js

// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ✅ Correct Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTZpFoSIf9xqDGfHWnvPPyw-RClvF0a1Y",
  authDomain: "expense-tracker-ee710.firebaseapp.com",
  projectId: "expense-tracker-ee710",
  storageBucket: "expense-tracker-ee710.appspot.com", // ✅ fixed typo
  messagingSenderId: "386832877263",
  appId: "1:386832877263:web:d8762939f3726bda32d9ba",
  measurementId: "G-V4NE96WZNS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore & Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
