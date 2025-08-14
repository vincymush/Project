// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBL69r9Gp30yo7XaNmCZRJhlly02cK0w5w",
  authDomain: "pharmacy-management-syst-5f159.firebaseapp.com",
  databaseURL: "https://pharmacy-management-syst-5f159-default-rtdb.firebaseio.com",
  projectId: "pharmacy-management-syst-5f159",
  storageBucket: "pharmacy-management-syst-5f159.firebasestorage.app",
  messagingSenderId: "284611754163",
  appId: "1:284611754163:web:1934cbba759136a76198c6"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);

export default app;
