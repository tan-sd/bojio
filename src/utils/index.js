import {
  onMounted,
  onBeforeMount,
  onUnmounted,
  computed
} from 'vue'
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import {
  useRouter
} from 'vue-router'
import {
  initializeApp
} from 'firebase/app'
import {
  getDatabase,
  ref,
  child,
  push,
  update,
  set,
  get,
  onValue,
  remove
} from 'firebase/database'

import { getStorage, ref as refStorage, uploadBytesResumable, getDownloadURL } from "firebase/storage"

// import Filter from 'bad-words'
import { getFirestore } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { nodeName } from 'jquery';



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

// Initialize Cloud Firestore and get a reference to the service
// const auth = firebase.auth()

// export function useAuth() {
//   const user = ref(null)
//   const unsubscribe = auth.onAuthStateChanged(_user => (user.value = _user))
//   onUnmounted(unsubscribe)
//   const isLogin = computed(() => user.value !== null)

//   // const signIn = async () => {
//   //   const googleProvider = new firebase.auth.GoogleAuthProvider()
//   //   await auth.signInWithPopup(googleProvider)
//   // }
//   const signOut = () => auth.signOut()

//   return { user, isLogin, signOut }
// }

// const firestore = firebase.firestore()
// const messagesCollection = messagesCollection.orderBy('createdAt', 'desc').limit(100)
// const messagesQuery = messagesCollection.orderBy('createdAt', 'desc').limit(100)
// const filter = new Filter()

// export function useChat() {
//   const messages = ref([])
//   const unsubscribe = messagesQuery.onSnapshot(snapshot => {
//     messages.value = snapshot.docs
//       .map(doc => ({ id: doc.id, ...doc.data() }))
//       .reverse()
//   })
//   onUnmounted(unsubscribe)

//   const { user, isLogin } = useAuth()
//   const sendMessage = text => {
//     if (!isLogin.value) return
//     const { uid, displayName } = user.value
//     messagesCollection.add({
//       userName: displayName,
//       userId: uid,
//       // userPhotoURL: photoURL,
//       text: filter.clean(text),
//       createdAt: firebase.firestore.FieldValue.serverTimestamp()
//     })
//   }

//   return { messages, sendMessage }
// }

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const firestoredb = getFirestore(app);

// console.log(db);
// const dbRef = ref(getDatabase());

export function removemsgs(){

  remove(ref(db, `messages`))
  // remove(ref(db, 'images'))

}

export function resetPassword(){
  const auth = getAuth();

  var email = document.getElementById('emailValidation').value
  var status = document.getElementById('status')
  sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
    console.log('success');
    status.innerHTML = 'Email sent. Check your email to reset password.'
    status.style.color = 'black'
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
    status.innerHTML = 'Sorry, invalid email.'
    status.style.color = 'red'

  

    // ..
  });

}

//validate email
function validate_email(email) {
  var expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    //ok email
    return true

  } else {
    //email invalid
    return false
  }
}

export function securityCheck() {

  var errorCount = 0;
  var email = document.getElementById('emailSignUp')
  var firstName = document.getElementById('firstName');
  var lastName = document.getElementById('lastName');
  var username = document.getElementById('username');
  var password = document.getElementById('passwordInput');
  var confirmPassword = document.getElementById('confirmPasswordInput');
  var passwordInvalidError = document.getElementById('passwordInvalid');
  var usernameInvalidError = document.getElementById('usernameInvalid')
  var passwordValidation = false;
  var emailstatus = validate_email(email.value)
  var emailInvalidError = document.getElementById('emailSignUpInvalid');

  if (!emailstatus) {
    email.classList = "form-control is-invalid";
    emailInvalidError.innerText = 'Please enter a valid email.'
    errorCount += 1;
    email.classList.add('errShake')
    email.onanimationend = () => {
      setTimeout(email.classList.remove('errShake', 200))
    }
  } else if (email.value.length == 0) {
    email.classList = "form-control is-invalid";
    errorCount += 1;
    email.onanimationend = () => {
      setTimeout(email.classList.remove('errShake', 200))
    }

  } else {
    console.log('email valid');
    email.classList = "form-control is-valid";
  }

  if (firstName.value.length == 0) {
    firstName.classList = "form-control is-invalid";
    errorCount += 1;
    firstName.classList.add('errShake')
    firstName.onanimationend = () => {
      setTimeout(firstName.classList.remove('errShake', 200))
    }

  } else {
    firstName.classList = "form-control is-valid";
  }

  if (lastName.value.length == 0) {
    lastName.classList = "form-control is-invalid";
    errorCount += 1;
    lastName.classList.add('errShake')
    lastName.onanimationend = () => {
      setTimeout(lastName.classList.remove('errShake', 200))
    }

  } else {
    lastName.classList = "form-control is-valid";
  }

  if (username.value.length < 8) {
    username.classList = "form-control is-invalid";
    // msg+='Please enter a valid username <br>'
    errorCount += 1;
    username.classList.add('errShake')
    username.onanimationend = () => {
      setTimeout(username.classList.remove('errShake', 200))
    }

  } else {
    username.classList = "form-control is-valid";
    usernameInvalidError.innerText = ''
  }

  if (password.value.length == 0) {
    password.classList = "form-control is-invalid";
    passwordInvalidError.innerText = "Please enter your password.";
    errorCount += 1;
    password.classList.add('errShake')
    password.onanimationend = () => {
      setTimeout(password.classList.remove('errShake', 200))
    }

  } else if (password.value.length < 8) {
    password.classList = "form-control is-invalid";
    passwordInvalidError.innerText = "Password must be at least 8 characters.";
    errorCount += 1;
    password.classList.add('errShake')
    password.onanimationend = () => {
      setTimeout(password.classList.remove('errShake', 200))
    }

  } else {
    password.classList = "form-control is-valid";
    passwordInvalidError.innerText = '';
    passwordValidation = true;
  }

  // console.log(passwordValidation);
  if (passwordValidation == false) {
    null;
  } else if (password.value != confirmPassword.value) {
    password.classList = "form-control is-invalid";
    confirmPassword.classList = "form-control is-invalid";
    password.classList.add('errShake')
    password.onanimationend = () => {
      setTimeout(password.classList.remove('errShake', 200))
    }
    confirmPassword.classList.add('errShake')
    confirmPassword.onanimationend = () => {
      setTimeout(confirmPassword.classList.remove('errShake', 200))
    }

  } else {
    password.classList = "form-control is-valid";
    confirmPassword.classList = "form-control is-valid";
  }

  var db_user = ''

  if (errorCount == 0 && emailstatus) {
    // return true
    //check if username alr exists
    var userexist = false;
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
    console.log(userexist);
    if (!userexist) {

      //means user dont exist n its gd
      return true
    }
    return false
  }

}

//register user
export function register() {

  const auth = getAuth();
  var emailInput = document.getElementById('emailSignUp');
  var emailInvalidError = document.getElementById('emailSignUpInvalid');

  if (emailInput.value.length == 0) {
    emailInput.classList = "form-control is-invalid";
  } else {
    emailInput.classList = "form-control is-valid";
  }

  var signupBtn = document.getElementById('signupBtn')
  signupBtn ?.addEventListener('click', (e) => {
      var firstName = document.getElementById('firstName');
      var lastName = document.getElementById('lastName');
      var username = document.getElementById("username");
      // var username = document.getElementById('username');
      console.log(firstName, lastName);
      var email = document.getElementById("emailSignup").value;
      var password = document.getElementById("password").value;
      var status = securityCheck()
      console.log(status);
      if (status) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            console.log(user.uid);
            set(ref(db, "accounts/" + user.uid), {
                firstname: firstName.value,
                lastname: lastName.value,
                username: username.value,
                email: email,
                password: password,
                events: ['no events'],
                createdjios: ['no jios'],
              })
              .then(() => {
                alert('details created successfully!')
              })
              .catch((error) => {
                alert(error);
              })

            alert("Successfully signed up!");
            //Redirect user if you want
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;

              if (errorMessage == 'Firebase: Error (auth/email-already-in-use).') {
                var email = document.getElementById('email')
                email.classList = "form-control is-invalid";
                document.getElementById('emailInvalid').innerText = 'Email already exists.'

              }
              // ..
              else {
                alert(errorMessage);

              }
            }


          ); //catch finish
      } //if status

    } //signup event listener
  ) //signup event listener
}


//get public data
export function getpublic() {
  console.log('this function is getthis');
  return new Promise((resolve, reject) => {
    console.log('inside promise');
    const publicevents = ref(db, 'public events/')
    console.log(publicevents);
    onValue(publicevents, (snapshot) => {
      console.log('inside onvalue');
      // Object.keys(snapshot.val()).forEach((key) =>{
      // const request = snapshot.val()[key]
      // console.log(key, request.email);
      const data = snapshot.val()
      console.log("getpublic - data:" + data);
      console.log(typeof (data));
      console.log('going to resolve soon');
      if (data != null) {
        console.log('data not null');
        return resolve(data)
      }
      console.log('at reject');
      return reject('not found')
    })
  })

}

export function getprivate() {
  // console.log('this function is getthis');
  return new Promise((resolve, reject) => {

    const publicevents = ref(db, 'private events/')
    onValue(publicevents, (snapshot) => {
      // Object.keys(snapshot.val()).forEach((key) =>{
      // const request = snapshot.val()[key]
      // console.log(key, request.email);
      const data = snapshot.val()
      console.log(snapshot.val());
      console.log(typeof (data));
      if (data != null) {

        return resolve(data)
      }
      return reject('not found')
    })

  })

}



export function getdata() {
  return new Promise((resolve, reject) => {
    uid = localStorage.getItem("uid")
    console.log('uid inside getdata' + uid);
    const dbRef = ref(getDatabase());
    get(child(dbRef, `accounts/${uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());

        let fullname = snapshot.val().firstname + ' ' + snapshot.val().lastname
        if (typeof (Storage) !== 'undefined') {
          localStorage.setItem('fullname', fullname)
        }

        return resolve(fullname)
      } else {
        console.log("No data available");
        return reject
      }
    })
  }).catch((error) => {
    console.error(error);
  });
}


//get all users for friendspage
export async function getusers() {
  uid = localStorage.getItem("uid")
  return new Promise((resolve, reject) => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `accounts/`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        let fullname = snapshot.val().firstname + ' ' + snapshot.val().lastname
        const allusers = snapshot.val()
        // for(const user in allusers){
        // console.log(allusers[user].username);
        // }
        return (resolve(snapshot.val()))

      } else {

        return reject
      }
    }).catch((error) => {
      console.error(error);
    });
  })
}



var eventname;
var userid;
var date;
var type;
var activities;
var testthis;
var maxLimit;
var category;
var image;
var imageUrl;
var imageData;

// //to createjio
export function createJio(actArr) {
  console.log(actArr);
  console.log(typeof actArr[0].image)
  console.log(actArr[0].image.name)
  console.log(actArr[0].imageUrl)
  const db = getDatabase();
  console.log('inside function createjio');
  eventname = document.getElementById('eventTitle').value
  maxLimit= parseInt(document.getElementById("maxLimit").value);
  category = document.getElementById("category").value
  console.log(actArr[0].image == 'no-image')
  image = actArr[0].image
  if (actArr[0].image != "no-image") {
    image = actArr[0].image.name;
  }
  imageUrl = actArr[0].imageUrl;
  imageData = actArr[0].imageData;
  console.log(image)

  // console.log(localStorage.getItem('username'));
  // var userid;
  var username;
  if (typeof (Storage) !== "undefined") {
    userid = localStorage.getItem('uid')

    ////////////////

    // FIREBASE STORAGE
    const storage = getStorage();
    const storageRef = refStorage(storage, `${imageData.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageData)
    uploadTask.on(`state_changed`, (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Uploaded is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, error=>{
      console.log(error.message)},
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          imageUrl = downloadURL
          console.log('File available at', downloadURL);

          // FIREBASE DATABASE
    const dbRef = ref(getDatabase());
    get(child(dbRef, `accounts/${userid}`)).then((snapshot) => {
      if (snapshot.exists()) {

        var val = snapshot.val()
        console.log(val);

        date = document.getElementById('eventDateTime').value
        type = document.querySelector('input[name="exampleRadios"]:checked').value;
    
        //description is inside actArr so dont need extra key
        const jioData = {
          // creator: username,
          eventname: eventname,
          userid: userid,
          username: val.username,
          date: date,
          type: type,
          activities: actArr,
          fullname: val.firstname + ' ' + val.lastname,
          category: category,
          maxnumber: maxLimit,
          image: image,
          imageUrl: imageUrl,
        };
    
        // Get a key for a new Post.
        const newKey = push(child(ref(db), 'events')).key;
    
        const updates = {};
    
        updates[`${type} events/${newKey}`] = jioData;
    
        updates['/createdjios/' + uid + '/' + newKey] = jioData;
    
        //add under createdjios which is under username account
        updates[`accounts/${uid}/createdjios/${newKey}`] = jioData;
    
        console.log(updates);

        document.getElementById('eventTitle').value = ''
        document.getElementById("maxLimit").value = ''
        document.getElementById("category").value = ''
        document.getElementById('eventDateTime').value = ''
        document.querySelector('input[name="exampleRadios"]:checked').checked = false
        document.getElementById('eventDescription').value = ''

        return update(ref(db), updates);
        // somehow the return gives undefined now...

      } else {

        console.log("No data available");

      }
    }).catch((error) => {
      console.error(error);
    });
        });
      }
    );



    //////////////
    // var username = getusername(userid)().then((username)=>{

    //   console.log(username);
    // })

  } else {
    userid = 'uid not found'
  }

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

export function getpublic2() {
  console.log("getpublic2")
  const dbRef = ref(getDatabase());
  get(child(dbRef, `public events/`)).then((snapshot) => {
    console.log("getpublic2 - then")
    if (snapshot.exists()) {
      console.log("getpublic2 - snapshotexists")

      // console.log(snapshot.val());
      localStorage.setItem('publicjios', JSON.stringify(snapshot.val()))
      console.log("snapshot.val():" + snapshot.val());
      return (snapshot.val())
      // localStorage.setItem('publicjios', JSON.stringify(snapshot.val())
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

//when i wan to add friends
export function createfriendrequest(receiver) {
  const db = getDatabase();
  //my own uid
  const uid = localStorage.getItem("uid")
  console.log('my own uid is' + uid);
  console.log('receiver uid is' + receiver);
  const updates = {};

  updates[`/friendrequest/${uid}/${receiver}`] = 'pending'

  // updates['/friendrequest/' + uid + '/' ] = 'pending'
  console.log(updates);
  console.log('end of create friend req function');
  return update(ref(db), updates);
}

//get all friend requests
export async function getfriendrequests() {
  uid = localStorage.getItem("uid")
  console.log('loading getfriend req n check if uid avail' + uid);
  return new Promise((resolve, reject) => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `friendrequest/`)).then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        return (resolve(snapshot.val()))

      } else {

        console.log("No data available");
        return reject
      }
    }).catch((error) => {
      console.error(error);
    });
  })
}


//when i wan to make them friends after accepting 
export function makefriends(sender) {
  //when i press accept, i was the receiver so uid go to receiver
  const db = getDatabase();
  //my own uid
  const uid = localStorage.getItem("uid")
  console.log('my own uid is' + uid);
  console.log('person tat sent req uid is' + sender);
  const updates = {};

  updates[`/friends/${uid}/${sender}`] = 'friends'
  updates[`/friends/${sender}/${uid}`] = 'friends'

  console.log(updates)
  console.log('end of make friend req function')
  remove(ref(db, `friendrequest/${sender}/${uid}`))
  return update(ref(db), updates);
}

//display all my friends
export async function displayfriends() {
  uid = localStorage.getItem("uid")
  // console.log('loading getfriend req n check if uid avail' + uid);
  return new Promise((resolve, reject) => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `friends/${uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        return (resolve(snapshot.val()))

      } else {

        console.log("No data available");
        return reject
      }
    }).catch((error) => {
      console.error(error);
    });
  })
}

export function deleteFriend(friendId,userId){
  remove(ref(db,`friends/${userId}/${friendId}`))
  remove(ref(db,`friends/${friendId}/${userId}`))

}

//get userid to say hi
export function getuserid() {
  const auth = getAuth();
  let isLoggedIn = false
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        uid = user.uid
        return resolve(uid)

      }
      localStorage.setItem('uid', '')
      localStorage.setItem('fullname', '')
      console.log('cnot find');
      return reject('under reject path')


    })

  })
}

//get users for private jio button
export async function getusername(personuid) {
  // uid = localStorage.getItem("uid")
  return new Promise((resolve, reject) => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `accounts/${personuid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());

        // }
        return (resolve(snapshot.val().username))

      } else {

        console.log("No data available");
        return reject
      }
    }).catch((error) => {
      console.error(error);
    });
  })
}


//get jio details for individual jio
export async function getjiodetails(creatorid,eventid) {
  console.log(creatorid);
  uid = localStorage.getItem("uid")
  return new Promise((resolve, reject) => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `createdjios/${creatorid}/${eventid}/peoplegoing`)).then((snapshot) => {

      console.log(snapshot);
      if (snapshot.exists()) {
        console.log(snapshot.val());
     
        return (resolve(snapshot.val()))

      } else {

        console.log("No data available");
        return reject('empty')
      }
    }).catch((error) => {
      console.error(error);
    });
  })
}

//wnt to join jio after clicking
export function createjiolist(creatorid,eventid) {
  const db = getDatabase();
  console.log(creatorid);
  uid = localStorage.getItem("uid")
  //my own uid
  // const uid = localStorage.getItem("uid")
  // console.log('my own uid is' + uid);
  const updates = {};

  updates[`/createdjios/${creatorid}/${eventid}/peoplegoing`] = [`${uid}`]

  // updates['/friendrequest/' + uid + '/' ] = 'pending'
  console.log(updates);
  console.log('end of createjiolist function');
  return update(ref(db), updates);
}

//wnt to join jio after clicking
export function replacejiolist(creatorid,eventid,peoplegoing) {
  const db = getDatabase();

  const updates = {};

  updates[`/createdjios/${creatorid}/${eventid}/peoplegoing`] = peoplegoing

  console.log(updates);
  console.log('end of createjiolist function');
  return update(ref(db), updates);
}

//display all my friends
export async function displaypplgoing(creatorid,eventid) {
  // uid = localStorage.getItem("uid")
  return new Promise((resolve, reject) => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `createdjios/${creatorid}/${eventid}/peoplegoing`)).then((snapshot) => {
      if (snapshot.exists()) {
        return (resolve(snapshot.val()))

      } else {
        console.log("No data available");
        return reject
      }
    }).catch((error) => {
      console.error(error);
    });
  })
}

var username

//create message for this event
export function createMessage(eventid, message) {
  const db = getDatabase();
  console.log('inside function createMessage')
 
  // if (typeof (Storage) !== "undefined") {
    userid = localStorage.getItem('uid')
    var name = localStorage.getItem('fullname')
    
    ////////////////
    const dbRef = ref(getDatabase());

    get(child(dbRef, `accounts/${userid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        username = snapshot.val().username
        console.log('LOOKHERE');
        console.log(username);
        // }
        // return (resolve(snapshot.val().username))
        get(child(dbRef, `messages/${eventid}`)).then((snapshot) => {
          if (snapshot.exists()) {
    
            var val = snapshot.val()
            console.log(val);
            console.log('LOOKHERE2');
    
            console.log(username);
    
            const jioData = {
              username: username,
              content: message.content,
            };
        
            // Get a key for a new message
            const newKey = push(child(ref(db), 'messages')).key;
        
            const updates = {};
        
            updates[`messages/${eventid}/${newKey}`] = jioData;
        
            console.log(updates);
            return update(ref(db), updates);
    
          } else {
    
            console.log("No data available");
            const newKey = push(child(ref(db), 'messages')).key;
    
            set(ref(db, 'messages/' + eventid +'/'+ newKey), {
              username: message.username,
              content: message.content,
            })
            .then(() => {
              // Data saved successfully!
              console.log('message added');
            })
            .catch((error) => {
              // The write failed...
              console.log('fail');
            });
    
          }
        }).catch((error) => {
          console.error(error);
        });
    

      } else {

        console.log("No data available");
   
      }
    }).catch((error) => {
      console.error(error);
    });



  // } 
  // else {
  //   userid = 'uid not found'
  // }

}

//check current messages for this event
export function getmessage(eventid) {
  console.log('this function is getmessage');
  return new Promise((resolve, reject) => {
    console.log('inside promise');
    var messages = ref(db, `messages/${eventid}`)

    onValue(messages, (snapshot) => {
      console.log('inside onvalue');

      const data = snapshot.val()

      if (data != null) {
        console.log('inside js file getmessage');
        console.log(data);

        return resolve(data)
      }
      console.log('at reject');
      return reject('not found')
    })
  })

}

// let x = ref(db, `messages`)  
// export default x 

export function deletepublicjio(eventId,userId){
  
  
  remove(ref(db,"createdjios/"+userId+"/"+eventId))
  remove(ref(db,"public events/"+eventId))
}

export function deleteprivatejio(eventId,userId){
  
  remove(ref(db,"createdjios/"+userId+"/"+eventId))
  remove(ref(db,"private events/"+eventId))

}

export function leavejio(creatorid,eventid,ind){
  remove(ref(db,"createdjios/"+creatorid+"/"+eventid+"/peoplegoing/"+ind))
  console.log("jio removed")
}


