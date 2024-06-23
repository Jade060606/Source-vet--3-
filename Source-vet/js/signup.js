// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4bI8aK4LjW0p6jlTR2CjQ09ntwv87adY",
  authDomain: "loginsignup-85a4b.firebaseapp.com",
  projectId: "loginsignup-85a4b",
  storageBucket: "loginsignup-85a4b.appspot.com",
  messagingSenderId: "590967927217",
  appId: "1:590967927217:web:9d14d28b619f557b9d4d90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//inputs


const submit = document.getElementById('btn-signup')
submit.addEventListener("click", function(event){
event.preventDefault()

const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
const name = document.getElementById('name').value;
const uname = document.getElementById('uname').value;

createUserWithEmailAndPassword(auth, email, password, name, uname)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

})