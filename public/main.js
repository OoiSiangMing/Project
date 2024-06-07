import { signUp, login } from './auth.js';

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
