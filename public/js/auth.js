import { auth, database } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Function to write user data to the Realtime Database
function writeUserData(username, email) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kuala_Lumpur',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const signupTime = formatter.format(new Date());

  set(ref(database, 'users/' + username), {
    Username: username,
    Email: email,
    SignupTime: signupTime // Add the sign-up time
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

    // Retrieve user data from the database
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `users/`));
    if (snapshot.exists()) {
      const usersData = snapshot.val();
      let username = null;
      for (const key in usersData) {
        if (usersData[key].Email === email) {
          username = usersData[key].Username;
          break;
        }
      }

      if (username) {
        // Store the username in localStorage
        localStorage.setItem('username', username);

        // Redirect to another page after login
        window.location.href = "index_user.html";
      } else {
        console.error("No user data found for this email.");
      }
    } else {
      console.error("No data available.");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    alert("Login failed. Please check your email and password.");
  }
}


export { signUp, login };
