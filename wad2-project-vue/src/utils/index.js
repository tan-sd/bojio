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