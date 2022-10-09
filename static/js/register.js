/* START OF FIREBASE */
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDC4kZ-Ec-jP7dnlFEmvD5rW9bOIXRyT3Q",
    authDomain: "wad2-project-d8ba0.firebaseapp.com",
    projectId: "wad2-project-d8ba0",
    storageBucket: "wad2-project-d8ba0.appspot.com",
    messagingSenderId: "168248515824",
    appId: "1:168248515824:web:bfcb3221af409131e07635",
    databaseURL: "https://wad2-project-d8ba0-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/* CODE ADDED: START */
// Import the functions needed to read from realtime database
import { getDatabase, ref, onValue, set, update, child, push } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

// connect to the realtime database
const db = getDatabase();

// create variable of user input
var firstName = document.getElementById('firstName');
var lastName = document.getElementById('lastName');
var username = document.getElementById('username');
var password = document.getElementById('password');

// when value of 'title' changes, update to our <h1 id='target'>
// onValue(title, (snapshot) => {
//     const data = snapshot.val(); // get the new value
//     document.getElementById('target').innerText = data;
// });
/* CODE ADDED: END  */
/* END OF FIREBASE */

// Retrieve form data and insert it into firebase
function InsertData() {
  push(ref(db, "accounts/"),{
    firstname: firstName.value,
    lastname: lastName.value,
    username: username.value,
    password: password.value
  })
.then(() => {
  alert('Account created successfully!')
})
.catch((error) => {
  alert(error);
})
}

// Registration form validation
function securityCheck(){
    var errorCount = 0;
    var firstName = document.getElementById('firstName');
    var lastName = document.getElementById('lastName');
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var confirmPassword = document.getElementById('confirmPassword');
    var passwordInvalidError = document.getElementById('passwordInvalid');
    var passwordValidation = false;
  
    // console.log(username)
    // console.log(password)
    // console.log(checkpassword)
  
    // function containsSpecialChars(str) {
    // const specialChars =
    //   '[`!@#$%^&*()_+-=[]{};\':"\\|,.<>/?~]/';
    // return specialChars
    //   .split('')
    //   .some((specialChar) => str.includes(specialChar));
    // }
    // console.log(containsSpecialChars(username));
    
  // if (firstName.length == 0) {
  //   firstName.class
  // }

    if(firstName.value.length == 0) {
      firstName.classList = "form-control is-invalid";
    } else {
      firstName.classList = "form-control is-valid";
    }
    
    if(lastName.value.length == 0) {
      lastName.classList = "form-control is-invalid";
    } else {
      lastName.classList = "form-control is-valid";
    }

    if(username.value.length < 8){
      username.classList = "form-control is-invalid";
      // msg+='Please enter a valid username <br>'
      errorCount += 1;
    } else {
      username.classList = "form-control is-valid";
    }

    if(password.value.length == 0) {
      password.classList = "form-control is-invalid";
      // msg+='Password field is empty <br>'
      passwordInvalidError.innerText = "Please enter your password.";
      errorCount += 1;
    } else if (password.value.length < 8) {
      password.classList = "form-control is-invalid";
      passwordInvalidError.innerText = "Password must be at least 8 characters.";
      errorCount += 1;
    } else {
      password.classList = "form-control is-valid";
      passwordInvalidError.innerText = '';
      passwordValidation = true;
    }

    console.log(passwordValidation);
    if(passwordValidation == false) {
      null;
    } else if (password.value != confirmPassword.value) {
      password.classList = "form-control is-invalid";
      confirmPassword.classList = "form-control is-invalid";
    } else {
      password.classList = "form-control is-valid";
      confirmPassword.classList = "form-control is-valid";
    }

    if (errorCount == 0) {
      InsertData();
    }
  }

    // console.log(msg);

    // if(msg!=''){
    //   var placeholder = document.getElementById('errors')
    //   placeholder.innerHTML=`<h5>Error</h5>`+msg;
    // } else {
      // InsertData();
  //   }
  // }

// Onclick eventlistener for sign up bottom
var signupBtn = document.getElementById('signupBtn');
signupBtn.addEventListener('click', securityCheck);