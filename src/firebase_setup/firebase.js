// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: import.meta.VITE_API_KEY,
  authDomain: import.meta.VITE_AUTH_DOMAIN,
  databaseURL:
    "https://cumulative-points-calcul-73190-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: import.meta.VITE_PROJECT_ID,
  storageBucket: import.meta.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.VITE_MESSAGE_SENDER_ID,
  appId: import.meta.VITE_APP_ID,
  measurementId: import.meta.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
