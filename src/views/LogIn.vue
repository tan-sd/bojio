<template>
  <div class="container-fluid text-center mt-5">
    <p class ='login-msg'></p>
    <div class="row">
      <div class="banner-header-form col">
        Login
      </div>
    </div>

    <div class="row">
        <div class="banner-text-form col">
            Never miss an event.
        </div>
    </div>
    
    <div class="container-fluid text-center" v-if="authStatus">
      <div class="row mt-3">
        <div class="col-8 p-3 mx-auto" style="color: red; width:400px; font-family: worksans-semibold">
          <span>Oops! You must be logged in.</span>
        </div>
      </div>
    </div>
  </div>

  <div class="container-fluid">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8 d-flex justify-content-center align-items-center">
        <form class="register-form" style="width: 400px;">
          <div class="form-row pt-4">
            <div class="form-group col" style="width: auto;">
              <div class="form-floating">
                <input type="text" class="form-control" id="emailLogin" placeholder="email" v-model="email" @keyup.enter="signIn">
                <label for="emailLogin" class="text-muted">email</label>
                <div id="emailLoginInvalid" class="invalid-feedback"></div>
              </div>
            </div>

            <div class="form-group col pt-3">
              <div class="form-floating">
              <input type="password" class="form-control" id="passwordLogin" placeholder='password' v-model="password" @keyup.enter="signIn">
                <label for="usernameLogin" class="text-muted">password</label>
                <div id="passwordLoginInvalid" class="invalid-feedback">
                </div>
              </div>
            </div>                        
          </div>

          <div class="container">
            <div class="row mt-1">
                <div class="col p-0">
                    <!-- <div><a class='float-end' style="text-decoration: none; color: rgb(255, 127, 45); font-family: worksans-medium;" href="#">Forgot your password?</a></div> -->
                    <router-link to="/resetpassword" style="text-decoration: none; color: rgb(255, 127, 45); font-family: worksans-medium;" class="nav-link float-end"> Forgot your password?</router-link> 
                </div>
            </div>
          </div>

          <div class="col">
            <button type="button" style="background-color: rgb(255, 127, 45); color: white; padding: 1rem; font-family: worksans-semibold;" class="btn login-signup-button" id="loginBtn" @click="signIn">Log in</button>
          </div>
              
        </form>
      </div>
      <div class="col-2"></div>
    </div>
  </div>

  <div class="container pt-4 pb-5">
    <div class="row">
        <div class="col text-center">
            <div>Don't have an account? <router-link to='/signup' style="text-decoration: none; color: rgb(255, 127, 45); font-family: worksans-medium">Sign up</router-link></div>
        </div>
    </div>
  </div>
</template>
  
<script>
export default {
  title: 'BOJIO – Login',

  data() {
    return {
      isAuth : true
    }
  },

  computed: {
    authStatus() {
      return this.$route.query.status == 'notAuth' ?  true : false
    }
  }
}
</script>

<script setup>
import { ref } from 'vue'
// import firebase from 'firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router' // import router
import { useCookies } from 'vue3-cookies';

const email = ref('')
const password = ref('')
const router = useRouter() // get a reference to our vue router
const errMsg = ref()
var uid;
const signIn = () => { // we also renamed this method
var email = document.getElementById('emailLogin');
var password = document.getElementById('passwordLogin');
var emailInvalidError = document.getElementById('emailLoginInvalid');
var passwordInvalidError = document.getElementById('passwordLoginInvalid');
var loginBtn = document.getElementById('loginBtn');
    
const auth = getAuth()
signInWithEmailAndPassword(auth, email.value, password.value) // THIS LINE CHANGED
.then(() => {
  // console.log(auth);
  const current = auth.currentUser;
  // console.log(current.uid);
  if (typeof(Storage) !== "undefined") {
    const {cookies} =useCookies()
  } else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
  }
  console.log('Successfully logged in!');
  // console.log(auth.currentUser);
  router.push('/')
  // router.push(`/aboutpage/${current.uid}`) // redirect to the feed
})
.catch(error => {
  console.log(error.code)
  // alert(error.message);
  switch (error.code) {
    case 'auth/invalid-email':
      errMsg.value = 'Invalid email';
      email.classList = 'form-control is-invalid';
      emailInvalidError.innerHTML = 'You have entered an invalid email. Please try again.';
      password.classList = 'form-control';
      passwordInvalidError.innerHTML = '';
      email.classList.add('errShake');
      email.onanimationend = () => {
        setTimeout(email.classList.remove('errShake', 200))
      }
      break;
    case 'auth/user-not-found':
      errMsg.value = 'No account with that email was found';
      email.classList = 'form-control is-invalid';
      emailInvalidError.innerHTML = 'Account does not exist. Please try again.';
      password.classList = 'form-control';
      passwordInvalidError.innerHTML = '';
      email.classList.add('errShake');
      email.onanimationend = () => {
        setTimeout(email.classList.remove('errShake', 200))
      }
      break;
    case 'auth/wrong-password':
      errMsg.value = 'Incorrect password';
      email.classList = 'form-control';
      emailInvalidError.innerHTML = '';
      password.classList = 'form-control is-invalid';
      passwordInvalidError.innerHTML = 'The password is incorrect. Please try again.';
      password.classList.add('errShake');
      password.onanimationend = () => {
        setTimeout(password.classList.remove('errShake', 200))
      }
      break;
    case 'auth/internal-error':
      email.classList = 'form-control';
      emailInvalidError.innerHTML = '';
      password.classList = 'form-control is-invalid';
      passwordInvalidError.innerHTML = 'Please insert your password.'
      password.classList.add('errShake');
      password.onanimationend = () => {
        setTimeout(password.classList.remove('errShake', 200))
      }
      break;
    default: 
      errMsg.value = 'Email or password was incorrect';
      email.classList = 'form-control is-invalid';
      emailInvalidError.innerHTML = 'Incorrect Email or password. Please try again.';
      password.classList = 'form-control'
      passwordInvalidError.innerHTML = '';
      email.classList.add('errShake');
      email.onanimationend = () => {
        setTimeout(email.classList.remove('errShake', 200))
      }
      break;
  }
});
}
</script>