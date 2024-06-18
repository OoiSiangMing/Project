// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxHxS1ErQdCo_47ePNUDCnQsKR1LheRUs",
  authDomain: "project1-24368.firebaseapp.com",
  projectId: "project1-24368",
  storageBucket: "project1-24368.appspot.com",
  messagingSenderId: "681252013525",
  appId: "1:681252013525:web:08a8fd1924b8e1f1ea295c"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



//inputs
const email = document.getElementById('signUpEmail').value;
const password = document.getElementById('signUpPassword').value;

// submit button
const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
  event.preventDefault()

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      // Signed up 
      const user = userCredential.user;
      alert("Creating Account..")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      // ..
    });


})