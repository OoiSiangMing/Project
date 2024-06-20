import { signUp, login } from './auth.js';

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
