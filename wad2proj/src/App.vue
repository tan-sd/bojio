
<!-- <template> -->
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->

  <!-- <router-view /> -->
  <!-- <div v-if="showPopup"> -->
    <!-- <SignupForm header ='Sign up for the Giveaway' text ='grab this' /> -->
  <!-- </div> -->
  <!-- <h1>{{title}}</h1>
  <div v-if="showPopup">
    <SignupForm theme ="" @close="togglePopup">
      <template v-slots:links>
        <a href="#"> Sign up now</a>
      </template>
    </SignupForm>
  </div> -->

  <!-- <button @click="togglePopup"> open popup </button> -->
<!-- </template> -->

<template>

<nav class="navbar navbar-expand-lg navbar-light mb-4 mt-2">
      <div class="container">
        <!-- <a class="navbar-brand" href="./main.html">BOJIO</a> -->
        <router-link to="/" class="navbar-brand"> BOJIO </router-link> 
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
    
        <div class="collapse navbar-collapse" id="navbarSupportedContent" >
          <ul class="navbar-nav" v-if="!isLoggedIn" >
            <li class="nav-item active pe-4">
              <!-- <a class="nav-link" href="./about.html">About</a> -->
              <router-link to="/aboutpage" class="nav-link"> About</router-link> 
            </li>

            <li class="nav-item pe-4">
              <router-link to="/createajio" class="nav-link"> Create a Jio</router-link> 
              <!-- <a class="nav-link" href="./signup.html">Sign up</a> -->
            </li>
            
            <li class="nav-item pe-4">
              <router-link to="/signup" class="nav-link"> Register </router-link> 
              <!-- <a class="nav-link" href="./signup.html">Sign up</a> -->
            </li>
            <li class="nav-item">
              <router-link to="/login/:id" class="nav-link"> Login 🔥</router-link>
              <!-- <a class="nav-link" href="./login.html"><span class="nav-login">Login</span> 🔥</a> -->
            </li>
          </ul>

          <!-- need to log out -->
          <ul class="navbar-nav" v-else >
            <li class="nav-item active pe-4">
              <!-- <a class="nav-link" href="./about.html">About</a> -->
              <router-link to="/aboutpage" class="nav-link"> About</router-link> 
            </li>
            <li class="nav-item pe-4">
              <router-link to="/createajio" class="nav-link"> Create a Jio</router-link> 
              <!-- <a class="nav-link" href="./signup.html">Sign up</a> -->
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link" @click="handlesignOut" v-if="isLoggedIn">Logout🔥</router-link>
          
              <!-- <a class="nav-link" href="./login.html"><span class="nav-login">Login</span> 🔥</a> -->
            </li>
          </ul>

        </div>
      </div>
</nav>
<router-view />

<div class="container">
      <div class="row mb-5">
        <div id = 'personname' style="display:none"></div>
      </div>
</div> 

</template>

<!-- <div>
  <nav>
    <router-link to="/"> Home </router-link> |
    <router-link to="/aboutpage"> About</router-link> |
    <router-link to="/securepage"> Secure </router-link>
    <span v-if="isLoggedIn"
      >
      <button @click="handlesignOut" v-if="isLoggedIn">Logout</button>
    </span>
    <span v-else>
      <router-link to="/signup"> Register </router-link> |
      <router-link to="/login"> Login </router-link>
    </span>
  </nav>
  
</div> -->

<style>
@import './assets/global.css';
</style>

<script setup>
  // import { ref } from 'vue' // used for conditional rendering
  // import firebase from 'firebase'
  // import { useRouter } from 'vue-router'
// import { getDatabase, ref, child, push, update, set, get } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
// import { getAuth, signInWithEmailAndPassword, onAuthStateChanged , signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

import { onMounted, ref } from 'vue'
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth';
import { useRouter } from 'vue-router' 
import { getDatabase, onValue } from 'firebase/database'
import { getdata } from './utils';
const router = useRouter();
const isLoggedIn = ref(false)

var uid;

let auth;
onMounted(()=>{
  auth = getAuth();
  onAuthStateChanged(auth, (user)=>{ 
    if(user) {
      isLoggedIn.value = true;
      console.log(user);
      uid = user.uid
      console.log(uid);
      // console.log(uid +'is loggedin');
      getdata()
    } else {
      isLoggedIn.value = false;
    }
  })
})

const handlesignOut = () => {
    signOut(auth).then(()=>{ 
      router.push('/')

    })
  }

// const database = getDatabase(app);
// const auth = getAuth();

  // const router = useRouter()

  // runs after firebase is initialized
  // firebase.auth().onAuthStateChanged(function(user) {
  //     if (user) {
  //       isLoggedIn.value = true // if we have a user
  //     } else {
  //       isLoggedIn.value = false // if we do not
  //     }
  // })
  // const signOut = () => {
  //   firebase.auth().signOut()
  //   router.push('/')
  // }
</script>

<script>


export default {
  name: 'App',
  components: {
    
    
},

data () {
  return {
    title: '',
    showPopup: false
  }
},

methods: {
  togglePopup(){
    this.showPopup = !this.showPopup
  }
}
 
  
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  /* -webkit-font-smoothing: antialiased; */
  /* -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
</style>
