<template>
  <div class="container-fluid text-center mt-5">
        <p class ='login-msg'></p>
        <div class="row">
          <div class="banner-header-form col">
            Login
          </div>
        </div>
      </div>

      <div class="container-fluid text-center pt-1">
        <div class="row">
            <div class="banner-text-form col">
                Never miss an event.
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <div class="row">
            <div class="col-2"></div>
            <div class="col-8 d-flex justify-content-center align-items-center">
                <form class="register-form" style="width: 400px;">

                    <div class="form-row pt-4">

                      <!-- i change these frm username to email -->
                        <!-- <div class="form-group col" style="width: auto;">
                          <div class="form-floating">
                          <input type="text" class="form-control" id="usernameLogin" placeholder="username">
                            <label for="usernameLogin" class="text-muted">username</label>
                            <div id="usernameLoginInvalid" class="invalid-feedback">
                            </div>
                          </div>
                        </div> -->

                        <div class="form-group col" style="width: auto;">
                          <div class="form-floating">
                          <input type="text" class="form-control" id="emailLogin" placeholder="email" v-model="email">
                            <label for="emailLogin" class="text-muted">email</label>
                            <div id="emailLoginInvalid" class="invalid-feedback">
                            </div>
                          </div>
                        </div>

                        <div class="form-group col pt-3">
                          <div class="form-floating">
                          <input type="password" class="form-control" id="passwordLogin" placeholder='password' v-model="password" >
                            <label for="usernameLogin" class="text-muted">password</label>
                            <div id="passwordLoginInvalid" class="invalid-feedback">
                            </div>
                          </div>
                        </div>                        
                      </div>

                      <div class="container">
                        <div class="row">
                            <div class="col">
                                <div><a class='float-end' style="text-decoration: none; color: rgb(255, 127, 45); font-family: worksans-medium;" href="#">Forgot your password?</a></div>
                            </div>
                        </div>
                      </div>
                    
                    <button type="button" style="background-color: rgb(255, 127, 45); color: white; padding: 1rem; font-family: worksans-semibold;" class="btn orange border border-3 mt-4 w-50" id="loginBtn" @click="signIn">Log in</button>
                  </form>
            </div>

            <div class="col-2"></div>
            
        </div>
      </div>

      <div class="container pt-4">
        <div class="row">
            <div class="col text-center">
                <div>Don't have an account? <a style="text-decoration: none; color: rgb(255, 127, 45); font-family: worksans-medium" href="./signup.html">Sign up</a></div>
            </div>
        </div>
      </div>

    <h1>Login to Your Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="errMsg">{{errMsg}}</p>
    <p><button @click="signIn">Submit</button></p>
  </template>
  
  <script>
    export default {
      title: 'BOJIO – Login',
    }
  </script>

  <script setup>
    import { ref } from 'vue'
    // import firebase from 'firebase'
    import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
    import { useRouter } from 'vue-router' // import router
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
      
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email.value, password.value) // THIS LINE CHANGED
        .then(() => {
          console.log(auth);
          const current = auth.currentUser;
          console.log(current.uid);
          if (typeof(Storage) !== "undefined") {
          // Store
          localStorage.setItem("uid", uid);
          // localStorage.setItem('fullname', fullname)
// 
      
        } else {
          document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        }

          console.log('Successfully logged in!');
          console.log(auth.currentUser);
          router.push('/')
          // router.push(`/aboutpage/${current.uid}`) // redirect to the feed
        })
        .catch(error => {
          console.log(error.code)
          // alert(error.message);
          switch (error.code){
            case 'auth/invalid-email':
              errMsg.value = 'Invalid email';
              email.classList = 'form-control is-invalid';
              emailInvalidError.innerHTML = 'You have entered an invalid email. Please try again.';
              password.classList = 'form-control';
              passwordInvalidError.innerHTML = '';
              break;
            case 'auth/user-not-found':
              errMsg.value = 'No account with that email was found';
              email.classList = 'form-control is-invalid';
              emailInvalidError.innerHTML = 'Account does not exist. Please try again.';
              password.classList = 'form-control';
              passwordInvalidError.innerHTML = '';
              break;
            case 'auth/wrong-password':
              errMsg.value = 'Incorrect password';
              email.classList = 'form-control';
              emailInvalidError.innerHTML = '';
              password.classList = 'form-control is-invalid';
              passwordInvalidError.innerHTML = 'The password is incorrect. Please try again.';
              break;
            case 'auth/internal-error':
              email.classList = 'form-control';
              emailInvalidError.innerHTML = '';
              password.classList = 'form-control is-invalid';
              passwordInvalidError.innerHTML = 'Please insert your password.'
              break;
            default: 
              errMsg.value = 'Email or password was incorrect';
              email.classList = 'form-control is-invalid';
              emailInvalidError.innerHTML = 'Incorrect Email or password. Please try again.';
              password.classList = 'form-control'
              passwordInvalidError.innerHTML = '';
              break;
          }
        });
    }
  </script>
  