/* START OF FIREBASE */
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getDatabase, set, ref, onValue, child, get } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
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
// import { getDatabase, ref, onValue, set, update, child, push } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

// connect to the realtime database
// const db = getDatabase();

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

//validate email
function validate_email(email){
  var expression = /^[^@]+@\w+(\.\w+)+\w$/
  if(expression.test(email) == true){
    //ok email
    return true

  } else{
    //email invalid
    return false
  }
}

const db = getDatabase(app);
const auth = getAuth();
var signupBtn = document.getElementById('signupBtn')
signupBtn?.addEventListener('click', (e) => {
    var email = document.getElementById("email").value;
    // var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var status = securityCheck()
    if (status){
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          console.log(user.uid);
          set(ref(db, "accounts/" + user.uid),{
            firstname: firstName.value,
            lastname: lastName.value,
            username: username.value,
            email: email,
            password: password,
            events: ['no events'],
            createdjios: ['no jios'],
            // help: 'testthis',
          })
          .then(() => {
            alert('details created successfully!')
          })
          .catch((error) => {
            alert(error);
          })
          
          // alert("Successfully signed up!");
          //Redirect user if you want
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          if(errorMessage == 'Firebase: Error (auth/email-already-in-use).'){ 
            var email = document.getElementById('email')
            email.classList = "form-control is-invalid";
            document.getElementById('emailInvalid').innerText = 'Email already exists.'

          }
          // ..
          else{
            alert(errorMessage);

          }
      });
    }

})



// Retrieve form data and insert it into firebase
// function InsertData() {
//   push(ref(db, "accounts/"),{
//     firstname: firstName.value,
//     lastname: lastName.value,
//     username: username.value,
//     password: password.value
//   })
//   .then(() => {
//     alert('Account created successfully!')
//   })
//   .catch((error) => {
//     alert(error);
//   })
//   }


//do not account for duplicate username yet!!
//if sign up alr n sign up agn local hosts will throw error
// Firebase: Error (auth/email-already-in-use).
//code this and say if this error then error will show up on email box 

// Registration form validation
function securityCheck(){
    var errorCount = 0;
    var email = document.getElementById('email')
    var firstName = document.getElementById('firstName');
    var lastName = document.getElementById('lastName');
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var confirmPassword = document.getElementById('confirmPassword');
    var passwordInvalidError = document.getElementById('passwordInvalid');
    var passwordValidation = false;

    var emailstatus = validate_email(email.value)
    // function containsSpecialChars(str) {
    // const specialChars =
    //   '[`!@#$%^&*()_+-=[]{};\':"\\|,.<>/?~]/';
    // return specialChars
    //   .split('')
    //   .some((specialChar) => str.includes(specialChar));
    // }
    // console.log(containsSpecialChars(username));
    
    if(email.value.length == 0) {
      email.classList = "form-control is-invalid";
      errorCount += 1;

    } else {
      email.classList = "form-control is-valid";
    }

    if(firstName.value.length == 0) {
      firstName.classList = "form-control is-invalid";
      errorCount += 1;

    } else {
      firstName.classList = "form-control is-valid";
    }
    
    if(lastName.value.length == 0) {
      lastName.classList = "form-control is-invalid";
      errorCount += 1;

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

    // var userexist = false;
    var db_user  = ''
    // var userexist = false 
    if (errorCount == 0) {
      // return true
      //check if username alr exists
      var userexist = false;
  
        // const getusers = ref(db, 'accounts/');

        const dbRef = ref(getDatabase());
        get(child(dbRef, `accounts/`)).then((snapshot) => {
          console.log(snapshot);
          if (snapshot.exists()) {
            console.log(snapshot.val());
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });


        // onValue(getusers, (snapshot) => {
        // const data = snapshot.val();
        // console.log(data);
        // for(var i in data){
        //   var userexist = false;
        //   db_user = data[i]['username']
        //   console.log(username.value);
        //   console.log(db_user);
        //   if(username.value == db_user){
        //     console.log('user exist');
        //     username.classList = "form-control is-invalid";
        //     username.innerText = 'Username already exists.'
        //     var userexist = true
        //     break;
        //   }
        // }

        console.log(userexist);
        if(!userexist){
      //       console.log(userexist);
      //       console.log(db_user);
      //       console.log('hi');
      //       InsertData();

          //means user dont exist n its gd
          return true
          }
        return false
      
      
      
      
      
      //aft get users then want to come here
    
        // console.log(result);
       
        
      
    }

    
  }


// Onclick eventlistener for sign up bottom
// var signupBtn = document.getElementById('signupBtn');
// signupBtn.addEventListener('click', securityCheck);