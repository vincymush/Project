// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Optional: Analytics (you can remove this if you don't need it)
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBL69r9Gp30yo7XaNmCZRJhlly02cK0w5w",
  authDomain: "pharmacy-management-syst-5f159.firebaseapp.com",
  projectId: "pharmacy-management-syst-5f159",
  storageBucket: "pharmacy-management-syst-5f159.firebasestorage.app",
  messagingSenderId: "284611754163",
  appId: "1:284611754163:web:1934cbba759136a76198c6",
  measurementId: "G-MBRQCKEPJN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app); // Optional

export default app;
