import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxHxS1ErQdCo_47ePNUDCnQsKR1LheRUs",
  authDomain: "project1-24368.firebaseapp.com",
  databaseURL: "https://project1-24368-default-rtdb.asia-southeast1.firebasedatabase.app", // Updated URL
  projectId: "project1-24368",
  storageBucket: "project1-24368.appspot.com",
  messagingSenderId: "681252013525",
  appId: "1:681252013525:web:08a8fd1924b8e1f1ea295c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };