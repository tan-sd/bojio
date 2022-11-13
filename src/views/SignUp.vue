<template>

<div class="container-fluid text-center mt-5">
        <div class="row">
          <div class="banner-header-form col">
            Sign up
          </div>
        </div>
      </div>

      <div class="container-fluid text-center pt-1">
        <div class="row">
            <div class="banner-text-form col">
                Create an account and start <span style="font-style: italic">jioing</span>.
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <div class="row">
          <div class="col-2"></div>
            <div class="col-8 d-flex justify-content-center align-items-center">
                <form class="register-form" style="width: 400px;">

                  <div class="form-row mt-4">

                    <div class="row">
                    <div class="col-md-6 mt-3">
                      <div class="register-form-field form-group col" style="width: auto;">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="firstName" placeholder="First name" @keyup.enter="register">
                          <label for="firstName" class="text-muted">first name</label>
                          <div id="firstNameInvalid" class="invalid-feedback">
                            Enter a first name.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 mt-3">
                      <div class="register-form-field form-group col" style="width: auto;">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="lastName" placeholder="Last name" @keyup.enter="register">
                          <label for="lastName" class="text-muted">last name</label>
                          <div id="firstNameInvalid" class="invalid-feedback">
                            Enter a last name.
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>

                      <div class="register-form-field form-group col mt-3" style="width: auto" @keyup.enter="register">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="username" placeholder="Username" required>
                          <label for="username" class="text-muted">username</label>
                          <div id="usernameInvalid" class="invalid-feedback">
                            Please enter an username with at least 8 characters.
                          </div>
                        </div>
                      </div>

                      <div class="register-form-field form-group col mt-3" style="width: auto" @keyup.enter="register">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="emailSignUp" placeholder="Email" v-model="email" required>
                          <label for="email" class="text-muted">email</label>
                          <div id="emailSignUpInvalid" class="invalid-feedback">
                            Please enter an email.
                          </div>
                        </div>
                      </div>

                      <div class="register-form-field form-group col mt-3" style="width: auto" @keyup.enter="register">
                        <div class="form-floating">
                          <input type="password" class="form-control" id="passwordInput" placeholder="Password" v-model="password" required>
                          <label for="password" class="text-muted">password</label>
                          <div id="passwordInvalid" class="invalid-feedback">
                          </div>
                        </div>
                      </div>

                      <div class="register-form-field form-group col mt-3" style="width: auto" @keyup.enter="register">
                        <div class="form-floating">
                          <input type="password" class="form-control" id="confirmPasswordInput" placeholder="Confirm password" required>
                          <label for="confirmPassword" class="text-muted">confirm password</label>
                          <div id="confirmPasswordInvalid" class="invalid-feedback">
                            The passwords you entered does not match
                          </div>
                        </div>  
                      </div>

                      <!-- <div class="register-form-field form-group col mt-3 text-center" style="width: auto">
                        <label for="interestAreas" class="text-muted mb-2">Areas of interest</label>

                        <select class="form-select" aria-label="Default select example" v-model="interestAreas" id="interestAreas">
                          <option value="Entertainment">Business and Industry</option>
                          <option value="Entertainment">Education</option>
                          <option value="Entertainment">Entertainment </option>
                          <option value="Fitness and Wellness">Fitness and Wellness</option>
                          <option value="Food and Drinks">Food and Drinks</option>
                          <option value="Hobbies and Activities">Hobbies and Activities</option>
                          <option value="Shopping and Fashion">Shopping and Fashion</option>
                          <option value="Sports and Outdoor Activities">Sports and Outdoor Activities</option>
                          <option value="Technology">Others</option>
                        </select>

                        <div class="invalid-feedback">
                          Please provide an area of interest
                        </div>
                        
                      </div> -->
                      
                      <div class="col">
                        <button type="button" class="btn login-signup-button" id="signupBtn" @click="register">Create account</button>
                      </div>
                  </div>
                    
                </form>
            </div>

            <!-- <div class="col-5 d-flex justify-content-center align-items-center">
                <h1>
                  <span class="typeout orange"></span>
                </h1>
            </div> -->
            <div class="col-2"></div>
        </div>
      </div>

      <div class="container pt-4 pb-5">
        <div class="row">
            <div class="col text-center">
                <div>Already have an account? <router-link to="/login" style="text-decoration: none; color: rgb(255, 127, 45); font-family: worksans-medium;">Sign in</router-link></div>
            </div>
        </div>
      </div>

    <!-- <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Submit</button></p>
    <p><button @click="signInWithGoogle">Sign in With Google</button></p> -->
  </template>

  <script>
    export default {
      title: 'BOJIO – Sign up',

    //   data(){
    //     return{
    //       email: '',
    //       password: ''
    //     }
    //   },

    //   computed: {
    //     getemail(){
    //       var email = this.email
    //       return email
    //     }
    //   }
    }
  </script>

  <script setup>
    // import { ref } from 'vue'
    // import firebase from 'firebase'
    import { initializeApp } from 'firebase/app'
    import { securityCheck } from '../utils/index.js'
    import { useRouter } from 'vue-router' // import router
    import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
    import { getDatabase, ref, set } from 'firebase/database'

    
    // import { useRouter } from 'vue-router'
    const firebaseConfig = {
      apiKey: "AIzaSyDC4kZ-Ec-jP7dnlFEmvD5rW9bOIXRyT3Q",
      authDomain: "wad2-project-d8ba0.firebaseapp.com",
      databaseURL: "https://wad2-project-d8ba0-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "wad2-project-d8ba0",
      storageBucket: "wad2-project-d8ba0.appspot.com",
      messagingSenderId: "168248515824",
      appId: "1:168248515824:web:bfcb3221af409131e07635"
    };
    // const email = ref('')
    // const password = ref('')
    const router = useRouter() // get a reference to our vue router
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    const register = () => {

      var status = securityCheck() //returns true when form is ok
      var emailInput = document.getElementById('emailSignUp');
      var emailInvalidError = document.getElementById('emailSignUpInvalid');
      var passwordInput = document.getElementById('passwordInput');
      var confirmPasswordInput = document.getElementById('confirmPasswordInput');
      var passwordInvalidError = document.getElementById('passwordInvalid');
      var interestAreas= document.getElementById('interestAreas')
      console.log(status);

      // if(emailInput.value.length == 0) {
      //   emailInput.classList = "form-control is-invalid";
      // } else {
      //   emailInput.classList = "form-control is-valid";
      // }

      // var signupBtn = document.getElementById('signupBtn')
      // signupBtn?.addEventListener('click', (e) => {
      var firstName = document.getElementById('firstName');
      var lastName = document.getElementById('lastName');
      var username = document.getElementById("username");

      console.log(status);
      if(status){
        createUserWithEmailAndPassword(getAuth(), emailInput.value, passwordInput.value) // need .value because ref()
        .then((userCredential) => {

          console.log(userCredential);
          console.log(userCredential.user);
          const user = userCredential.user
          const uid = user.uid
          const fullname = firstName.value + lastName.value

          if(typeof(Storage)!== 'undefined'){
          localStorage.setItem('fullname', fullname)
          localStorage.setItem('uid', uid)
          
          console.log(localStorage.getItem('fullname'));
          }

          set(ref(db, "accounts/" + user.uid),{
          firstname: firstName.value,
          lastname: lastName.value,
          username: username.value,
          email: emailInput.value,
          // areaofinterest: interestAreas.value,
          // password: passwordInput.value,
          // events: ['no events'],
          createdjios: ['no jios'],
        })
        .then(() => {
          // alert('details created successfully!')
        })
        .catch((error) => {
          alert(error);
        })
        // alert("Successfully signed up!");
        console.log('Successfully registered!');
        router.push('/') // redirect to the feed
        })
        .catch(error => {
          console.log(error.code)
          // alert(error.message);
          switch (error.code){
            case 'auth/invalid-email':
              emailInput.classList = 'form-control is-invalid';
              emailInvalidError.innerHTML = 'You have entered an invalid email. Please try again.';
              emailInput.classList.add('errShake');
              emailInput.onanimationend = () => {
                setTimeout(emailInput.classList.remove('errShake', 200))
              }
              // errMsg.value = 'Invalid email';
              break;
            case 'auth/email-already-in-use':
              emailInput.classList = 'form-control is-invalid';
              emailInvalidError.innerHTML = 'Email already exists. Please try again.';
              passwordInput.classList = 'form-control is-valid';
              passwordInvalidError.innerHTML = '';
              emailInput.classList.add('errShake');
              emailInput.onanimationend = () => {
                setTimeout(emailInput.classList.remove('errShake', 200))
              }
              // errMsg.value = 'No account with that email was found';
              // email.classList = 'form-control is-invalid';
              // emailInvalidError.innerHTML = 'Account does not exist. Please try again.';
              // password.classList = 'form-control';
              // passwordInvalidError.innerHTML = '';
              break;
            case 'auth/weak-password':  //need to refer from old files from here
              passwordInput.classList = 'form-control is-invalid';
              passwordInvalidError.innerHTML = 'Password must be at least 6 characters.';
              // errMsg.value = 'Incorrect password';
              // email.classList = 'form-control';
              // emailInvalidError.innerHTML = '';
              // password.classList = 'form-control is-invalid';
              // passwordInvalidError.innerHTML = 'The password is incorrect. Please try again.';
              passwordInput.classList.add('errShake');
              passwordInput.onanimationend = () => {
                setTimeout(passwordInput.classList.remove('errShake', 200))
              }
              break;
            case 'auth/internal-error':
              passwordInput.classList = 'form-control is-invalid';
              passwordInvalidError.innerHTML = 'Please enter your password.';
              passwordInput.classList.add('errShake');
              passwordInput.onanimationend = () => {
                setTimeout(passwordInput.classList.remove('errShake', 200))
              }
              break;
            default: 
              // errMsg.value = 'Email or password was incorrect';
              // email.classList = 'form-control is-invalid';
              // emailInvalidError.innerHTML = 'Incorrect Email or password. Please try again.';
              // password.classList = 'form-control'
              // passwordInvalidError.innerHTML = '';
              break;
          }
        });

      }
    // })
    }


    const signInWithGoogle = () =>{ 
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => { 
            console.log(result.user);
            router.push('/')
        })
        .catch((error) => { 
          
        })
    }
  </script>
  