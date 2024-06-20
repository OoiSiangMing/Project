import { auth, database } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { ref, set, get, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

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
    return snapshot.size || Object.keys(snapshot.val()).length; // Return the count of users
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
    writeUserData(userId, username, email);

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

// Function to retrieve username from Realtime Database based on email
async function getUsernameFromEmail(email) {
  try {
    const usersRef = ref(database, 'users');
    const emailQuery = query(usersRef, orderByChild('email'), equalTo(email));
    const snapshot = await get(emailQuery);

    if (snapshot.exists()) {
      const userData = snapshot.val();
      const userId = Object.keys(userData)[0];
      const username = userData[userId].username;
      console.log("Username retrieved:", username);
      return username;
    } else {
      console.log(`No user found with email: ${email}`);
      return null;
    }
  } catch (error) {
    console.error("Error retrieving username:", error);
    return null;
  }
}

// Function to check the auth state and update the username
function checkAuthState() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log("User is signed in:", user);

      // Retrieve username based on user's email
      const email = user.email;
      const username = await getUsernameFromEmail(email);

      if (username) {
        // Update the username element in the DOM
        document.getElementById('username').textContent = `Welcome, ${username}`;
      } else {
        // Handle case where username is not found (optional)
        document.getElementById('username').textContent = 'Welcome, Guest';
      }

      // Optionally, perform other actions based on user authentication state
      // Show user-specific content, hide login content, etc.
      document.getElementById('userContent').style.display = 'block';
      document.getElementById('loginContent').style.display = 'none';
    } else {
      console.log("No user is signed in.");

      // Hide user-specific content, show login content
      document.getElementById('userContent').style.display = 'none';
      document.getElementById('loginContent').style.display = 'block';
    }
  });
}

// Call checkAuthState to monitor auth state changes
checkAuthState();

export { signUp, login, checkAuthState };