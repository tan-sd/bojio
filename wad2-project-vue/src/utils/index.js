import { onMounted } from 'vue'
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth';
import { useRouter } from 'vue-router' 
import { getDatabase, ref, child, push, update, set, get } from 'firebase/database'

// import uid from '../App.vue'
var uid;

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

//to createjio
function createJio(eventname, type) {
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
  //      userid
  //        -jio data


  updates[`${type} events/${uid}/${newKey}`] = jioData;

  // accounts

  // eventsgoing
              
  // createdjios
              
  updates['/createdjios/' + uid + '/' + newKey] = jioData;


  //add under createdjios which is under username account
  updates[`accounts/${uid}/createdjios/${newKey}`] = jioData;

  console.log(updates);
  return update(ref(db), updates);
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