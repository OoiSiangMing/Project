import { auth } from './firebase.js';
import { fetchUsernameByEmail, signUp, login, onAuthStateChanged } from './auth.js';

function resetForm(formId) {
  document.getElementById(formId).reset();
}

// Ensure the DOM is fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Listen for auth state changes
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log("User signed in:", user);
      const username = await fetchUsernameByEmail(user.email);
      if (username) {
        console.log("Fetched username:", username);
        document.getElementById('username').innerText = username;
      } else {
        console.log("Username not found for email:", user.email);
      }
    } else {
      console.log("No user is signed in.");
    }
  });

// Handle sign-up form submission
document.getElementById('signUpForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('signUpEmail').value;
  const password = document.getElementById('signUpPassword').value;
  const username = document.getElementById('signUpUsername').value;
  await signUp(email, password, username);
  resetForm('signUpForm');
});

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  await login(email, password);
  resetForm('loginForm');
});

}); // Closing the DOMContentLoaded event listener function