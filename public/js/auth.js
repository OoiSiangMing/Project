import { auth, database } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Function to write user data to the database
function writeUserData(userId, username, email) {
  set(ref(database, 'users/' + userId), {
    username: username,
    email: email
  }).then(() => {
    console.log("User data written to database");
  }).catch((error) => {
    console.error("Error writing user data to database:", error);
  });
}

// Function to sign up a new user
async function signUp(email, password, username) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User signed up:", user);

    // Write user data to the database
    writeUserData(user.uid, username, email);

    alert("Sign up successful!");
  } catch (error) {
    console.error("Error signing up:", error);
    alert(`Sign up failed: ${error.message}`);
  }
}

// Function to retrieve user data
async function getUserData(userId) {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, `users/${userId}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.error("No data available");
    }
  } catch (error) {
    console.error("Error retrieving user data:", error);
  }
}

// Function to log in an existing user
async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User logged in:", user);

    // Retrieve and display user data
    const userData = await getUserData(user.uid);
    if (userData) {
      document.getElementById('username').innerText = userData.username;
    }

    window.location.href = "index_user.html"; // Redirect to another page
  } catch (error) {
    console.error("Error logging in:", error);
    alert("Login failed. Please check your email and password.");
  }
}

// Function to check the auth state and update the username
function checkAuthState() { 
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userData = await getUserData(user.uid);
      if (userData) {
        document.getElementById('username').innerText = userData.username;
      }
    }
  });
}

// Call checkAuthState to monitor auth state changes
checkAuthState();

export { signUp, login, checkAuthState };
