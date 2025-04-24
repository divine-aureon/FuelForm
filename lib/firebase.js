// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyCW3tXvpnVKMY1LQQRcDHdv_xSWUEts9Z8",
  authDomain: "fuelform-802b0.firebaseapp.com",
  projectId: "fuelform-802b0",
  storageBucket: "fuelform-802b0.appspot.com",
  messagingSenderId: "560628167362",
  appId: "1:560628167362:web:6cad32fafc99f195df815b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };