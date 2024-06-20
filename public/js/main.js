import { signUp, login, getUsernameFromEmail } from './auth.js';

// Function to reset form fields
function resetForm(formId) {
  document.getElementById(formId).reset();
}

// Handle sign-up form submission
document.getElementById('signUpForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the form from submitting normally
  const email = document.getElementById('signUpEmail').value;
  const password = document.getElementById('signUpPassword').value;
  const username = document.getElementById('signUpUsername').value; // Get the username value
  await signUp(email, password, username);
  resetForm('signUpForm'); // Reset the form fields after sign up
});

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the form from submitting normally
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  await login(email, password);
  resetForm('loginForm'); // Reset the form fields after login
});

// Check authentication state on page load
document.addEventListener('DOMContentLoaded', () => {
  // Ensure the username is fetched and displayed after authentication state is checked
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const email = user.email;
      const username = await getUsernameFromEmail(email);

      if (username) {
        document.getElementById('username').textContent = `Welcome123, ${username}`;
      } else {
        document.getElementById('username').textContent = 'Welcometest';
      }

      // Optionally, show or hide elements based on authentication state
      document.getElementById('userContent').style.display = 'block';
      document.getElementById('loginContent').style.display = 'none';
    } else {
      // Show login form if user is not authenticated
      document.getElementById('userContent').style.display = 'none';
      document.getElementById('loginContent').style.display = 'block';
    }
  });
});
