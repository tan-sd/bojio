import { onMounted } from 'vue'
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth';
import { useRouter } from 'vue-router' 
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, child, push, update, set, get, onValue } from 'firebase/database'

// import uid from '../App.vue'
var uid;
const firebaseConfig = {
  apiKey: "AIzaSyDC4kZ-Ec-jP7dnlFEmvD5rW9bOIXRyT3Q",
  authDomain: "wad2-project-d8ba0.firebaseapp.com",
  databaseURL: "https://wad2-project-d8ba0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wad2-project-d8ba0",
  storageBucket: "wad2-project-d8ba0.appspot.com",
  messagingSenderId: "168248515824",
  appId: "1:168248515824:web:bfcb3221af409131e07635"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
// console.log(db);
// const dbRef = ref(getDatabase());



//register user

//validate email
// function validate_email(email){
//   var expression = /^[^@]+@\w+(\.\w+)+\w$/
//   if(expression.test(email) == true){
//     //ok email
//     return true

//   } else{
//     //email invalid
//     return false
//   }
// }

//   const auth = getAuth();
//   var signupBtn = document.getElementById('signupBtn')
//   signupBtn?.addEventListener('click', (e) => {
//   var firstName = document.getElementById('firstName');
//   var lastName = document.getElementById('lastName');
//   var username = document.getElementById('username');
  
//   var email = document.getElementById("email").value;
//     // var username = document.getElementById("username").value;
//     var password = document.getElementById("password").value;
//     var status = securityCheck()
//     if (status){
//       createUserWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//           // Signed in 
//           const user = userCredential.user;
//           console.log(user);
//           console.log(user.uid);
//           set(ref(db, "accounts/" + user.uid),{
//             firstname: firstName.value,
//             lastname: lastName.value,
//             username: username.value,
//             email: email,
//             password: password,
//             events: ['no events'],
//             createdjios: ['no jios'],
        
//           })
//           .then(() => {
//             alert('details created successfully!')
//           })
//           .catch((error) => {
//             alert(error);
//           })
          
//           alert("Successfully signed up!");
//           //Redirect user if you want
//       })
//       .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;

//           if(errorMessage == 'Firebase: Error (auth/email-already-in-use).'){ 
//             var email = document.getElementById('email')
//             email.classList = "form-control is-invalid";
//             document.getElementById('emailInvalid').innerText = 'Email already exists.'

//           }
//           // ..
//           else{
//             alert(errorMessage);

//           }
//       });
//     }

// })

//get public data
export function getpublic(){
  // console.log('this function is getthis');
  return new Promise((resolve, reject) =>{
    
    const publicevents = ref(db, 'public events/')
    onValue(publicevents, (snapshot) =>{
      // Object.keys(snapshot.val()).forEach((key) =>{
        // const request = snapshot.val()[key]
        // console.log(key, request.email);
        const data = snapshot.val()
        console.log(snapshot.val);
        console.log(typeof(data));
        return resolve(data)
      })
      return reject('not found')
    })

  }

  export function getprivate(){
    // console.log('this function is getthis');
    return new Promise((resolve, reject) =>{
      
      const publicevents = ref(db, 'private events/')
      onValue(publicevents, (snapshot) =>{
        // Object.keys(snapshot.val()).forEach((key) =>{
          // const request = snapshot.val()[key]
          // console.log(key, request.email);
          const data = snapshot.val()
          console.log(snapshot.val);
          console.log(typeof(data));
          return resolve(data)
        })
        return reject('not found')
      })
  
    }
  


export function getdata(){
    uid = localStorage.getItem("uid")
    const dbRef = ref(getDatabase());
    get(child(dbRef, `accounts/${uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
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



var eventname = ''
var username =''
var date =''
var type = ''
var activities =''
var testthis = ''

// //to createjio
export function createJio(eventname, type) {
  const db = getDatabase();
  
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

  // Get a key for a new Post.
  const newKey = push(child(ref(db), 'events')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};

  //to separate public n private events
  // privateevents 
  //        -jio data


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


// // //see private jios
// // var privatejios = document.getElementById('private')
// // privatejios.addEventListener('click', getprivate)

// const dbRef = ref(getDatabase());

// export function getprivate(){
// get(child(dbRef, `private events/`)).then((snapshot) => {
//   if (snapshot.exists()) {

//     localStorage.setItem('privatejios', JSON.stringify(snapshot.val()))
   
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });
// }


//get public 
// // var publicjios = document.getElementById('public')
// // publicjios.addEventListener('click', getpublic)

// export function getpublic(){
//   const dbRef = ref(getDatabase());
//   get(child(dbRef, `public events/`)).then((snapshot) => {
//     if (snapshot.exists()) {
  
//       // console.log(snapshot.val());
//       localStorage.setItem('publicjios', JSON.stringify(snapshot.val()))
//       // console.log(snapshot.val());
//       return(snapshot.val())
//       // localStorage.setItem('publicjios', JSON.stringify(snapshot.val())
//     } else {
//       console.log("No data available");
//     }
//   }).catch((error) => {
//     console.error(error);
//   });
//   }