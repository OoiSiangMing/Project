// Import necessary functions from Firebase
import { auth, database } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Function to write user data to the Realtime Database
function writeUserData(uid, username, email) {
  set(ref(database, 'users/' + uid), {
    email: email,
    username: username // Add username field to store in the database
  }).then(() => {
    console.log("User data written to database");
  }).catch((error) => {
    console.error("Error writing user data to database:", error);
  });
}

// Function to fetch the username from the Realtime Database
async function fetchUsername(uid) {
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `users/${uid}`));
    if (snapshot.exists()) {
      return snapshot.val().username;
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching username:", error);
    return null;
  }
}

// Function to sign up a new user
async function signUp(email, password, username) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User signed up:", user);

    // Write user data to the database
    writeUserData(user.id, username, email);

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
    window.location.href = "index_user.html"; // Redirect to another page after login
  } catch (error) {
    console.error("Error logging in:", error);
    alert("Login failed. Please check your email and password.");
  }
}


// Export functions
export { signUp, login, fetchUsername };
