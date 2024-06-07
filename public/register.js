// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyA2673_Hxw10Yi1w6c2TyLV9SFLbfNHOZk",
  authDomain: "project1-9c987.firebaseapp.com",
  databaseURL: "https://project1-9c987-default-rtdb.firebaseio.com",
  projectId: "project1-9c987",
  storageBucket: "project1-9c987.appspot.com",
  messagingSenderId: "37167302559",
  appId: "1:37167302559:web:8b6b5f9ecbe0a96508dfaa",
  measurementId: "G-HXPES1SD09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// submit button
const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
  event.preventDefault()

  //inputs
  const email = document.getElementById('signUpEmail').value;
  const password = document.getElementById('signUpPassword').value;

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