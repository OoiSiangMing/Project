import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
