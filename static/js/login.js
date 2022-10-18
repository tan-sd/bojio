/* START OF FIREBASE */
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
// import { getDatabase, ref, child, push, update } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js"
// import {initializeApp} from  './node_modules/firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
// import { getDatabase, ref, onValue, set, update, child, push, get } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";
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

// import { getDatabase, ref, onValue} from "firebase/database";
// connect to the realtime database
const db = getDatabase();

/* CODE ADDED: END  */
/* END OF FIREBASE */

// create variable of user input

import { getDatabase, ref, child, push, update, set, get } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged , signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const database = getDatabase(app);
const auth = getAuth();
var login = document.getElementById('loginBtn')
login?.addEventListener('click', (e) => {
var email = document.getElementById('emailLogin').value
var password = document.getElementById('passwordLogin').value

// get errors here https://firebase.google.com/docs/auth/admin/errors

signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
  // Signed in 
  const user = userCredential.user;
  window.location.href = "./main.html";
  
  // ...
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  alert(errorMessage);
});

});

  //Check user stat whwether signed in
    // const user = auth.currentUser;
    // onAuthStateChanged(auth, (user) => {
    // if (user) {
    //     // User is signed in, see docs for a list of available properties
    //     // https://firebase.google.com/docs/reference/js/firebase.User
    //     const uid = user.uid;
    //     console.log("User is logged in.")
    //     console.log(uid);
    //     console.log(user.username);
    //     console.log(user);
    //     // console.log(user);
    //     // ...
    // } else {
    //     // User is signed out
    //     // ...
    //     console.log('user signed out');
    // }
    // });


// Retrieve data from firebase and verify   NOT IN USE NOW
// function findData() {
//     var fullname = ''
//     var username = document.getElementById('usernameLogin');
//     var password = document.getElementById('passwordLogin');
//     var usernameInvalidError = document.getElementById('usernameLoginInvalid');
//     var passwordInvalidError = document.getElementById('passwordLoginInvalid');
//     // console.log('hi');
//     const dbref = ref(db);

//     get(child(dbref, "accounts"))
//     .then((snapshot) => {
//     var info = snapshot.val();
//     var keys = Object.keys(info);

//     if (username.value.length == 0){
//       username.classList = 'form-control is-invalid';
//       usernameInvalidError.innerHTML = 'Please enter your username.';
      
//     }

//     if (password.value.length == 0) {
//       password.classList = 'form-control is-invalid';
//       passwordInvalidError.innerHTML = 'Please enter your password.';
//       return

//     } else {
//       password.classList = 'form-control';
//       passwordInvalidError.innerHTML = '';
      
//     }

//     for (var i=0; i < keys.length; i++) {
//         var k = keys[i];
//         var nameDB = info[k].username;
//         var passwordDB = info[k].password;
        
//         if (username.value === nameDB) {
//           username.classList = 'form-control';
//           usernameInvalidError.innerHTML = '';
//             if (password.value === passwordDB) {
//                 //k is the unique id to identify users
//                 document.cookie = `${k}`
//                 // console.log(k);
//                 fullname = info[k].firstname + info[k].lastname
//                 gotomain()
//                 break;

//             } else {
//               if (password.value.length > 0) {
//                 password.classList = 'form-control is-invalid';
//                 passwordInvalidError.innerHTML = 'The password is incorrect. Please try again.';
//                 break;
//               }
//             }
//         } else {
//             if (username.value.length > 0) {
//               username.classList = 'form-control is-invalid';
//               usernameInvalidError.innerHTML = 'The username does not exist. Please try again.';
//               password.classList = 'form-control';
//               passwordInvalidError.innerHTML = '';
//             }
//         }
//     }

//     }, function (error) {
//         console.log("Error:" + error.code)
//     });
// }

// Onclick eventlistener for log in bottom

// var loginBtn = document.getElementById('loginBtn');
// if(loginBtn){
//   loginBtn.addEventListener('click', findData);
// }

// function gotomain(){
//   window.location.href = "main.html?personname=" + fullname ;
// }


//to get the person's uid and username
function getdata(){
    const dbRef = ref(getDatabase());
    get(child(dbRef, `accounts/${uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        let fullname = snapshot.val().firstname + ' ' + snapshot.val().lastname
        if(typeof(Storage)!== 'undefined'){
          localStorage.setItem('fullname', fullname)

        }
        // console.log(fullname);
        
        let personname = document.getElementById('personname')
        
        //only say hi at main page
        if(personname){
          personname.innerText =  `Welcome,  ${fullname} ! 👋🏼`
          personname.setAttribute('style', ' display:inline; font-family: worksans-extrabold; font-size: 4vmin;')
          personname.setAttribute('class', '')
        }
         
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}

var uid = ''
var eventname = ''
var username =''
var date =''
var type = ''
var activities =''
var testthis = ''

//to createjio
function createJio(eventname, type) {
  const db = getDatabase(app);
  // console.log(jioref);
  eventname = document.getElementById('name').value
  
  if (typeof(Storage) !== "undefined") {
    username = localStorage.getItem('fullname')}
    else{
      username = 'nousername'
    }
    
    date = document.getElementById('date').value
    type = document.querySelector('input[name="exampleRadios"]:checked').value;
    
    const jioData = {
      // creator: username,
      eventname: eventname,
      username: username,
      date: date,
      type: type,
      activities: [1,2,3],
    };
    // console.log(child(ref(db, 'private events/')));
    // console.log(db);
    // console.log(newKey);
    // console.log(jioData);
    // console.log(child(ref(db)));
    

    //this ok
    const newKey = push(child(ref(db), 'private events')).key;
    // set(ref(db, 'private events/' + newKey), 
    //   jioData
    // );
    
    // the above to make it private events->activity key->info
    
    
    // set(child(ref(db, 'private events/'), {
      //   eventname: eventname,
      //   username: username,
      //   date: date,
      //   type: type,
      //   activities: [1,2,3],
      // }));
      // const jioref = ref(db,'private events').set(jioData)
      //end here
    


  

  // Get a key for a new Post.
  // const newKey = push(child(ref(db), 'events')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};

  //to separate public n private events
  // privateevents 
  //      userid
  //        -jio data


  // updates[`${type} events/${uid}/${newKey}`] = jioData;

  updates[`${type} events/${newKey}`] = jioData;
  // accounts

  // eventsgoing
              
  // createdjios
              
  updates['/createdjios/' + uid + '/' + newKey] = jioData;


  //add under createdjios which is under username account
  updates[`accounts/${uid}/createdjios/${newKey}`] = jioData;

  console.log(updates);
  return update(ref(db), updates);
}


//check user sign in or out
const user = auth.currentUser;
    onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        uid = user.uid;
        console.log("User is logged in.")
        console.log(uid);

        //call function to say hi user
        getdata()
     
        console.log(user);

        var jiobtn = document.getElementById('createJio')
        jiobtn?.addEventListener('click',createJio)
        

    } else {
        // User is signed out
        // ...
        console.log('user signed out');
    }
    });


//to sign user out
var signout = document.getElementById('signout')
signout.addEventListener('click', out)
function out(){
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log('user signed out');
  }).catch((error) => {
    // An error happened.
  });
}


//see private jios
var privatejios = document.getElementById('private')
privatejios.addEventListener('click', getprivate)

const dbRef = ref(getDatabase());

function getprivate(){
get(child(dbRef, `private events/`)).then((snapshot) => {
  if (snapshot.exists()) {

    localStorage.setItem('privatejios', JSON.stringify(snapshot.val()))
   
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
}


//get public 
var publicjios = document.getElementById('public')
publicjios.addEventListener('click', getpublic)

function getpublic(){
  get(child(dbRef, `public events/`)).then((snapshot) => {
    if (snapshot.exists()) {
  
      // console.log(snapshot.val());
      localStorage.setItem('publicjios', JSON.stringify(snapshot.val()))

      // localStorage.setItem('publicjios', JSON.stringify(snapshot.val())
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  }