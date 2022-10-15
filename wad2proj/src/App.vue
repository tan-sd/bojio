<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
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
  <div>
    <nav>
      <router-link to="/"> Home </router-link> |
      <router-link to="/feed"> Feed </router-link> |
      <span v-if="isLoggedIn"
        >>
        <button @click="signOut">Logout</button>
      </span>
      <span v-else>
        <router-link to="/SignUp"> Register </router-link> |
        <router-link to="/LogIn"> Login </router-link>
      </span>
    </nav>
    <router-view />
  </div>
</template>


<script setup>
  import { ref } from 'vue' // used for conditional rendering
  import firebase from 'firebase'
  import { useRouter } from 'vue-router'
import { getDatabase, ref, child, push, update, set, get } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged , signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

// const database = getDatabase(app);
// const auth = getAuth();

  const router = useRouter()
  const isLoggedIn = ref(true)
  // runs after firebase is initialized
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        isLoggedIn.value = true // if we have a user
      } else {
        isLoggedIn.value = false // if we do not
      }
  })
  const signOut = () => {
    firebase.auth().signOut()
    router.push('/')
  }
</script>

<script>
// import SignupForm from "./components/SignupForm.vue";


// import HelloWorld from './components/HelloWorld.vue'

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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
