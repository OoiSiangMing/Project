// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2673_Hxw10Yi1w6c2TyLV9SFLbfNHOZk",
    authDomain: "project1-9c987.firebaseapp.com",
    databaseURL: "https://project1-9c987-default-rtdb.firebaseio.com",
    projectId: "project1-9c987",
    storageBucket: "project1-9c987.appspot.com",
    messagingSenderId: "37167302559",
    appId: "1:37167302559:web:8b6b5f9ecbe0a96508dfaa",
    measurementId: "G-HXPES1SD09"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Function to write user data to the database
function writeUserData(userId, username, email) {
    set(ref(database, 'users/' + userId), {
        username: username,
        email: email
    });
}

// Function to sign up a new user
async function signUp(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User signed up:", user);
        alert("Sign up successful!");
    } catch (error) {
        console.error("Error signing up:", error);
        alert(`Sign up failed: ${error.message}`);
    }
}

// Function to log in an existing user
async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User logged in:", user);
        window.location.href = "index_user.html"; // Redirect to another page
    } catch (error) {
        console.error("Error logging in:", error);
        alert("Login failed. Please check your email and password.");
    }
}

// Handle sign-up form submission
document.getElementById('signUpForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the form from submitting normally
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;
    await signUp(email, password);
});

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the form from submitting normally
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    await login(email, password);
});
