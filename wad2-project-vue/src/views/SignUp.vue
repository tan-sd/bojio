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

                  <div class="form-row pt-4">

                    <div class="row">
                    <div class="col">
                      <div class="register-form-field form-group col" style="width: auto;">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="firstName" placeholder="First name">
                          <label for="firstName" class="text-muted">first name</label>
                          <div id="firstNameInvalid" class="invalid-feedback">
                            Enter a first name.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col">
                      <div class="register-form-field form-group col" style="width: auto;">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="lastName" placeholder="First name">
                          <label for="lastName" class="text-muted">last name</label>
                          <div id="firstNameInvalid" class="invalid-feedback">
                            Enter a last name.
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>

                      <div class="register-form-field form-group col pt-3" style="width: auto">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="username" placeholder="Username" required>
                          <label for="username" class="text-muted">username</label>
                          <div id="usernameInvalid" class="invalid-feedback">
                            Please enter an username.
                          </div>
                        </div>
                      </div>

                      <div class="register-form-field form-group col pt-3" style="width: auto">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="email" placeholder="Username" required>
                          <label for="email" class="text-muted">email</label>
                          <div id="emailInvalid" class="invalid-feedback">
                            Please enter an email.
                          </div>
                        </div>
                      </div>

                      <div class="register-form-field form-group col pt-3" style="width: auto">
                        <div class="form-floating">
                          <input type="password" class="form-control" id="password" placeholder="Password" required>
                          <label for="password" class="text-muted">password</label>
                          <div id="passwordInvalid" class="invalid-feedback">
                          </div>
                        </div>
                      </div>

                      <div class="register-form-field form-group col pt-3" style="width: auto">
                        <div class="form-floating">
                          <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm password" required>
                          <label for="confirmPassword" class="text-muted">confirm password</label>
                          <div id="confirmPasswordInvalid" class="invalid-feedback">
                            The passwords you entered does not match
                          </div>
                        </div>  
                      </div>
                      
                  </div>
                  
                  <button type="button" style="background-color: rgb(255, 127, 45); color: white" class="btn orange border border-3 mt-4 rounded-5" id="signupBtn">Sign up</button>
                    
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

      <div class="container pt-4">
        <div class="row">
            <div class="col text-center">
                <div>Already have an account? <a style="text-decoration: none; color: rgb(255, 127, 45);" href="/login.html">Sign in</a></div>
            </div>
        </div>
      </div>

    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Submit</button></p>
    <p><button @click="signInWithGoogle">Sign in With Google</button></p>
  </template>
  

  <style>

  

  </style>

  <script setup>
    import { ref } from 'vue'
    // import firebase from 'firebase'
    import { useRouter } from 'vue-router' // import router
    import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
    // import { useRouter } from 'vue-router'
    const email = ref('')
    const password = ref('')
    const router = useRouter() // get a reference to our vue router
    const register = () => {
      
        createUserWithEmailAndPassword(getAuth(), email.value, password.value) // need .value because ref()
        .then(() => {
          console.log('Successfully registered!');
          router.push('/aboutpage') // redirect to the feed
        })
        .catch(error => {
          console.log(error.code)
          alert(error.message);
        });
    }


    const signInWithGoogle = () =>{ 
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => { 
            console.log(result.user);
            router.push('/ahoutpage')
        })
        .catch((error) => { 
          
        })
    }
  </script>
  