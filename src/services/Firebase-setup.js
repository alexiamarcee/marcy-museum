import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA2fniq1Ew844s-RmKWYPBMt9nUSc7yX5U",
  authDomain: "foromuseo.firebaseapp.com",
  projectId: "foromuseo",
  storageBucket: "foromuseo.firebasestorage.app",
  messagingSenderId: "884434435831",
  appId: "1:884434435831:web:e654060a613a852509ddf2",
  databaseURL: "https://foromuseo-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

