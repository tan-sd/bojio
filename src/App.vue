<template>
<!--         
  ____    ____        _  _____  ____  
 |  _ \  / __ \      | ||_   _|/ __ \ 
 | |_) || |  | |     | |  | | | |  | |
 |  _ < | |  | | _   | |  | | | |  | |
 | |_) || |__| || |__| | _| |_| |__| |
 |____/  \____/  \____/ |_____|\____/ 
                               

 Github Repository: https://github.com/tan-sd/wad2-project

--> 
  <nav class="navbar navbar-expand-lg navbar-light mb-4 mt-2">
    <div class="container">
      <!-- <a class="navbar-brand" href="./main.html">BOJIO</a> -->
      <router-link
        class="routerLink navbar-brand"
        :to="{ name: 'default', params: { active: 'events'  }, }">
          BOJIO
      </router-link>

      <!-- <router-link to="/" class="navbar-brand"> BOJIO </router-link>  -->
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
            <router-link to="/signup" class="nav-link"> Sign up </router-link> 
            <!-- <a class="nav-link" href="./signup.html">Sign up</a> -->
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link"> <span class="nav-login"> Login </span> 🔥</router-link>
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
          <li class="nav-item pe-4">
            <router-link :to="{name: 'profile', params: {idx : uid}}" class="nav-link"> Profile </router-link> 
            <!-- <a class="nav-link" href="./signup.html">Sign up</a> -->
          </li>
          <li class="nav-item pe-4">
            <router-link to="/friendspage" class="nav-link"> Friends </router-link> 
            <!-- <a class="nav-link" href="./signup.html">Sign up</a> -->
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link" @click="handlesignOut" v-if="isLoggedIn">Log out</router-link>
        
            <!-- <a class="nav-link" href="./login.html"><span class="nav-login">Login</span> 🔥</a> -->
          </li>
        </ul>
      </div>
    </div>
  </nav>
<router-view />
</template>

<style>
@import './assets/global.css';
</style>

<script setup>

import { onMounted, onBeforeMount, ref } from 'vue'
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth';
import { useRouter } from 'vue-router' 
import { getDatabase, onValue } from 'firebase/database'
import { getdata } from './utils';


const router = useRouter();
const isLoggedIn = ref(false)

var uidParams = `/profile/${uid}`
var uid;

let auth;
onBeforeMount(()=>{
  auth = getAuth();
  onAuthStateChanged(auth, (user)=>{ 
    if(user) {
      isLoggedIn.value = true;
      // console.log(user);
      uid = user.uid

      if (typeof(Storage) !== "undefined") {
          // Store
          localStorage.setItem("uid", uid);
          // console.log(' set uid already');
        } else {
          document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        }
      getdata()

    } else {
      isLoggedIn.value = false;
    }
  })
})

const handlesignOut = () => {
    signOut(auth).then(()=>{ 
      // clear welcome msg
      localStorage.setItem("fullname", '');
      let personname = document.getElementById('personname')
      // console.log(personname);
      personname.setAttribute('style','display:none')
      router.push('/')

    })
  }

</script>

<script>
function refresh() {
  window.location.reload;
}
export default {
  name: 'App',
  components: {
},

data () {
  return {
    title: '',
    showPopup: false,
   
  }
},

methods: {
  togglePopup(){
    this.showPopup = !this.showPopup
  }
},
mounted() {
  console.log('%cGithub Repository: https://github.com/tan-sd/wad2-project', 'color: #fbb040');
  console.log('%c— BOJIO', 'color: #777777');
}
  
}
</script>