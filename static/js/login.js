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
var username = document.getElementById('usernameLogin');
var password = document.getElementById('passwordLogin');
var usernameInvalidError = document.getElementById('usernameLoginInvalid');
var passwordInvalidError = document.getElementById('passwordLoginInvalid');
var foundUser = true;
// when value of 'title' changes, update to our <h1 id='target'>
// onValue(title, (snapshot) => {
//     const data = snapshot.val(); // get the new value
//     document.getElementById('target').innerText = data;
// });
/* CODE ADDED: END  */
/* END OF FIREBASE */

// Retrieve data from firebase and verify
function findData() {

    var loginmsg = ''
    const dbref = ref(db);

    get(child(dbref, "accounts"))
    .then((snapshot) => {
    console.log(snapshot);
    console.log(snapshot.val()); //give username n pw of all current users
    var info = snapshot.val();
    var keys = Object.keys(info);
    console.log(keys); //give array of encoded ids 

    for (var i=0; i < keys.length; i++) {
        var k = keys[i];
        var nameDB = info[k].username; //changed from name to username
        var passwordDB = info[k].password;

        // if (username == nameDB) {
        //     if (password == passwordDB) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // } else {
        //     return false;
        // }
        // console.log(nameDB);
        // console.log(passwordDB);
        // console.log(typeof nameDB);
        // console.log(typeof username);

        if (username.value === nameDB) {
          usernameexist = true
            if (password.value === passwordDB) {
                window.location.href = "main.html";
                break

            } else { //need to change to if exist then do this stuff or not reloop
                // do something - wrong password
                // loginmsg += 'The password is incorrect. Please try again.'
                
            }
        } else {
            // do somthing - user does not exist
            // loginmsg += 'Username does not exist'
        }

        var msg = document.getElementsByClassName('login-msg')[0]
        msg.textContent = loginmsg

    }
    
    msg.textContent = loginmsg

    }, function (error) {
        console.log("Error:" + error.code)
    });

    console.log(username.value);
    console.log(password.value);
}

// Onclick eventlistener for log in bottom
var loginBtn = document.getElementById('loginBtn');
loginBtn.addEventListener('click', findData);