import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCxKI0rkCN__DIWzgWK-DYyknJr9ZVJthw",
  authDomain: "portfolio-backend-20df1.firebaseapp.com",
  databaseURL: "https://portfolio-backend-20df1-default-rtdb.firebaseio.com",
  projectId: "portfolio-backend-20df1",
  storageBucket: "portfolio-backend-20df1.firebasestorage.app",
  messagingSenderId: "487713367503",
  appId: "1:487713367503:web:898776a9dd336a71751eba",
  measurementId: "G-RB10VFJ1XR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);