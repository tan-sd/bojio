<template>
  <div class="container-fluid text-center mt-5">
    <p class ='login-msg'></p>
    <div class="row">
      <div class="banner-header-form col">
        Reset Password
      </div>
    </div>
  </div>

  <div class="container-fluid">
    <div class="row">
      <div class="col-2"></div>
        <div class="col-8 d-flex justify-content-center align-items-center">  
          <form class="register-form" style="width: 400px;">
            <div class="form-row pt-4">
              <div id="status" class="text-center"></div>
              <div class="form-group col pt-3">
                <div class="form-floating">
                  <input type="email" class="form-control" id="emailValidation" placeholder='email' >
                  <label for="emailValidation" class="text-muted">Enter your email</label>
                  <div id="emailValidationInvalid" class="invalid-feedback"></div>
                </div>
              </div>
            </div>
            <button type="button" style="background-color: rgb(255, 127, 45); color: white; padding: 1rem; font-family: worksans-semibold;" class="btn orange border border-3 mt-4 w-50" id="loginBtn" @click="checkFields">Reset Password</button>
          </form>
        </div>
        <div class="col-2"></div>

        <div class="container pt-4 mb-5">
            <div class="row">
                <div class="col text-center">
                    <div>Go back to <router-link to ='/login' style="text-decoration: none; color: rgb(255, 127, 45); font-family: worksans-medium">Login</router-link></div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { resetPassword } from '../utils'

var status;
export default{
  title:'reset password',

  data(){
    return{
      errors:0,
      success: false
    }
  },

  methods:{
    checkFields(){
      resetPassword()
      // console.log(status);
    }
  }
}

</script>