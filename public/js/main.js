import { auth } from './firebase.js';
import { fetchUsernameByEmail, signUp, login, onAuthStateChanged } from './auth.js';

function resetForm(formId) {
  document.getElementById(formId).reset();
}

// Listen for auth state changes
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, get the username
    const username = await fetchUsernameByEmail(user.email);
    if (username) {
      document.getElementById('username').innerText = username;
    }
  }
});

document.getElementById('signUpForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('signUpEmail').value;
  const password = document.getElementById('signUpPassword').value;
  const username = document.getElementById('signUpUsername').value;
  await signUp(email, password, username);
  resetForm('signUpForm');
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  await login(email, password);
  resetForm('loginForm');
});
