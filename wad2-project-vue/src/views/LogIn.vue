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
                          <input type="text" class="form-control" id="emailLogin" placeholder="username">
                            <label for="emailLogin" class="text-muted">username</label>
                            <div id="emailLoginInvalid" class="invalid-feedback">
                            </div>
                          </div>
                        </div>

                        <div class="form-group col pt-3">
                          <div class="form-floating">
                          <input type="password" class="form-control" id="passwordLogin" placeholder="password">
                            <label for="usernameLogin" class="text-muted">password</label>
                            <div id="passwordLoginInvalid" class="invalid-feedback">
                            </div>
                          </div>
                        </div>                        
                      </div>
                    
                    <button type="button" style="background-color: rgb(255, 127, 45); color: white" class="btn orange border border-3 mt-4 rounded-5" id="loginBtn">Log in</button>
                  </form>
            </div>

            <div class="col-2"></div>
            
        </div>
      </div>

      <div class="container pt-4">
        <div class="row">
            <div class="col text-center">
                <div><a style="text-decoration: none; color: rgb(255, 127, 45);" href="#">Forgot your password?</a></div>
            </div>
        </div>
      </div>


      <div class="container pt-1">
        <div class="row">
            <div class="col text-center">
                <div>Don't have an account? <a style="text-decoration: none; color: rgb(255, 127, 45);" href="./signup.html">Sign up here</a></div>
            </div>
        </div>
      </div>

    <h1>Login to Your Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="errMsg">{{errMsg}}</p>
    <p><button @click="signIn">Submit</button></p>
  </template>
  
  <script setup>
    import { ref } from 'vue'
    // import firebase from 'firebase'
    import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
    import { useRouter } from 'vue-router' // import router
    const email = ref('')
    const password = ref('')
    const router = useRouter() // get a reference to our vue router
    const errMsg = ref()
    const signIn = () => { // we also renamed this method
      
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email.value, password.value) // THIS LINE CHANGED
        .then(() => {
          console.log('Successfully logged in!');
          router.push('/aboutpage') // redirect to the feed
        })
        .catch(error => {
          console.log(error.code)
          // alert(error.message);
          switch (error.code){
            case 'auth/invalid-email':
              errMsg.value = 'Invalid email';
              break;
            case 'auth/user-not-found':
              errMsg.value = ' No account with that email was found';
              break;
            case 'auth/wrong-password':
              errMsg.value = 'Incorrect password';
              break;
            default: 
              errMsg.value = 'Email or password was incorrect';
              break;

          }
        });
    }
  </script>
  