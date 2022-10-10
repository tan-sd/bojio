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
import { getDatabase, ref, onValue, set, update, child, push, get } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

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

// Registration form validation
function securityCheck(){
    var errorCount = 0;
    var firstName = document.getElementById('firstName');
    var lastName = document.getElementById('lastName');
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var confirmPassword = document.getElementById('confirmPassword');
    var usernameInvalidError = document.getElementById('usernameInvalid');
    var passwordInvalidError = document.getElementById('passwordInvalid');
    var passwordValidation = false;

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
      usernameInvalidError.innerText = 'Username must be at least 8 characters.'
      // msg+='Please enter a valid username <br>'
      errorCount += 1;
    } else {
      username.classList = "form-control is-valid";
    }

    if(password.value.length == 0) {
      password.classList = "form-control is-invalid";
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

    var userexist = false;
    var db_user  = ''
    if (errorCount == 0) {
      //check if username alr exists

      let promise = new Promise(function(resolve, reject) {
        
        const getusers = ref(db, 'accounts/');
        onValue(getusers, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        for(var i in data){
          db_user = data[i]['username']
          console.log(username.value);
          console.log(db_user);
          if(username.value == db_user){
            console.log('user exist');
            username.classList = "form-control is-invalid";
            usernameInvalidError.innerText = 'Username has been taken.'
            var userexist = true
            break;
          }
        }
      });
      })
      
        //aft get users then want to come here
      async function f(){
        let result = await promise;
        console.log(result);
        console.log(userexist);
        if(!userexist){
          console.log(userexist);
          console.log(db_user);
          InsertData();
        }
      }
      
    }
  }

// Retrieve form data and insert it into firebase
function InsertData() {
  push(ref(db, "accounts/"),{
    firstname: firstName.value,
    lastname: lastName.value,
    username: username.value,
    password: password.value,
    eventsjoined: [],
    createdjio: []
  })
  .then(() => {
    alert('Account created successfully!')
  })
  .catch((error) => {
    alert(error);
  })
  }

// Onclick eventlistener for sign up bottom
var signupBtn = document.getElementById('signupBtn');
signupBtn.addEventListener('click', securityCheck);