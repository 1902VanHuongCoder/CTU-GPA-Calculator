// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGE_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID,
//   measurementId: import.meta.env.VITE_MEASUREMENT_ID,
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyB4WmvbpLvN4VB9VXOKXDuzvpAI9hU2pFw",
//   authDomain: "cumulative-points-calcul-73190.firebaseapp.com",
//   databaseURL:
//     "https://cumulative-points-calcul-73190-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "cumulative-points-calcul-73190",
//   storageBucket: "cumulative-points-calcul-73190.appspot.com",
//   messagingSenderId: "995137744269",
//   appId: "1:995137744269:web:0ea304473383e4be3b61c4",
//   measurementId: "G-PSSDZ70MMY",
// };

const firebaseConfig = {
  apiKey: "AIzaSyAs0BoNXy9gtm-Jc1veY_tS74OLBUvTuco",
  authDomain: "fir-2c96c.firebaseapp.com",
  projectId: "fir-2c96c",
  storageBucket: "fir-2c96c.appspot.com",
  messagingSenderId: "913912744712",
  appId: "1:913912744712:web:419e348e445086ccf5fabd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
