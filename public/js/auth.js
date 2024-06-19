import { auth, database } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Function to write user data to the Realtime Database
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

// Function to get the count of existing users
async function getUserCount() {
  const usersRef = ref(database, 'users');
  const snapshot = await get(usersRef);
  if (snapshot.exists()) {
    return snapshot.size; // Use snapshot.size to get the count of users
  }
  return 0; // If no users exist, return 0
}

// Function to sign up a new user
async function signUp(email, password, username) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User signed up:", user);

    // Get the count of existing users and generate the user ID
    const userCount = await getUserCount();
    const userId = `user_${userCount + 1}`;

    // Write user data to the database
    writeUserData(user.uid, username, email);

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

    // Optionally, you can redirect or perform other actions here
    window.location.href = "index_user.html"; // Redirect to another page after login
  } catch (error) {
    console.error("Error logging in:", error);
    alert("Login failed. Please check your email and password.");
  }
}

// Function to check the auth state and update the username
function checkAuthState() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Optionally, retrieve and display user data here if needed
    }
  });
}

// Call checkAuthState to monitor auth state changes
checkAuthState();

export { signUp, login, checkAuthState };
