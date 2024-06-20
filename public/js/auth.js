import { auth, database } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Function to write user data to the Realtime Database
function writeUserData(username, email) {
  set(ref(database, 'users/' + username), {
    Email: email,
    Username: username // Add username field to store in the database
  }).then(() => {
    console.log("User data written to database");
  }).catch((error) => {
    console.error("Error writing user data to database:", error);
  });
}

// Function to fetch username from the Realtime Database using email
async function fetchUsernameByEmail(email) {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, `users`));
  if (snapshot.exists()) {
    const users = snapshot.val();
    for (const userKey in users) {
      if (users[userKey].email === email) {
        return users[userKey].username;
      }
    }
  } else {
    console.log("No data available");
  }
  return null;
}

// Function to sign up a new user
async function signUp(email, password, username) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User signed up:", user);

    // Write user data to the database
    writeUserData(username, email);

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

    // Fetch the username and update the HTML
    const username = await fetchUsernameByEmail(user.email);
    if (username) {
      document.getElementById('username').innerText = username;
    }

    // Optionally, you can redirect or perform other actions here
    window.location.href = "index_user.html"; // Redirect to another page after login
  } catch (error) {
    console.error("Error logging in:", error);
    alert("Login failed. Please check your email and password.");
  }
}


// Export functions
export { signUp, login, fetchUsernameByEmail, onAuthStateChanged };

