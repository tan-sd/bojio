<template>
    <main class="securepage">
        <!-- <h1>Secure Page</h1> -->
      
        <div class="container-fluid text-center mt-5">
        <p class ='login-msg'></p>
        <div class="row">
          <div class="banner-header-form col">
            Create a Jio
          </div>
        </div>
      </div>

      <div class="container-fluid text-center pt-1">
        <div class="row">
            <div class="banner-text-form col">
                Make any occasion unforgettable!
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <div class="row">
            <div class="col-2"></div>
            <div class="col-8 d-flex justify-content-center align-items-center">
                <form class="register-form" style="width: 600px;">

                      <!-- i change these frm username to email -->
                        <!-- <div class="form-group col" style="width: auto;">
                          <div class="form-floating">
                          <input type="text" class="form-control" id="usernameLogin" placeholder="username">
                            <label for="usernameLogin" class="text-muted">username</label>
                            <div id="usernameLoginInvalid" class="invalid-feedback">
                            </div>
                          </div>
                        </div> -->

                        <div class="form-row pt-4">

                          <div class="form-group col" style="width: auto;">
                            <div class="form-floating">
                            <input type="text" class="form-control" id="emailLogin" placeholder="email" v-model="title">
                              <label for="emailLogin" class="text-muted">event title</label>
                              <div id="emailLoginInvalid" class="invalid-feedback">
                              </div>
                            </div>
                            <div class="float-end mt-1">{{checkTitle}} / {{titleLimit}}</div>
                          </div>
                          

                          <div class="form-group col mt-5" style="width: auto">
                            <div class="form-floating">
                              <textarea v-model="description" class="form-control" placeholder="description" id="description" style="height: 200px;"></textarea>
                              <label for="description" class="text-muted">event description</label>
                            </div>
                        </div>
                        <div class="float-end mt-1">{{checkDescription}} / {{descriptionLimit}}</div>
                      </div>
                      

                      <div class="register-form-field form-group col mt-5" style="width: auto;">
                        <div class="form-floating">
                          <input type="date" class="form-control w-50" id="firstName" placeholder="First name">
                          <label for="firstName" class="text-muted">date</label>
                          <div id="firstNameInvalid" class="invalid-feedback">
                            Enter a first name.
                          </div>
                        </div>
                      </div>

                      <div class="register-form-field form-group col mt-5" style="width: auto;">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="firstName" placeholder="First name">
                          <label for="firstName" class="text-muted">Location</label>
                          <div id="firstNameInvalid" class="invalid-feedback">
                            Enter a first name.
                          </div>
                        </div>
                      </div>

                      <GMapMap class="mt-5"
                      :center="center"
                      :zoom="15"
                      :disableDefaultUI="true"
                      map-type-id="roadmap"
                      style="width: auto; height: 300px"
                  >
                    <GMapCluster>
                      <GMapMarker
                          :key="index"
                          v-for="(m, index) in markers"
                          :position="m.position"
                          :clickable="true"
                          :draggable="true"
                          @click="center=m.position"
                      />
                    </GMapCluster>
                  </GMapMap>
                      
                    
                    <button type="button" style="background-color: rgb(255, 127, 45); color: white" class="btn orange border border-3 mt-4 rounded-5" id="loginBtn">Create Jio</button>
                  </form>
            </div>
            <div class="col-2"></div>
        </div>
      </div>

    </main>

  </template>

  <script>

    export default {
      name: 'App',
      data() {
        return {
          center: { lat: 51.093048, lng: 6.842120 },
          markers: [
            {
              position: {
                lat: 51.093048, lng: 6.842120
              },
            },
          ],
          titleLimit: 100,
          descriptionLimit: 300,
          description: '',
          title: '',
        }
      },
      computed: {
        checkDescription() {
          return this.description.length
        },
        checkTitle() {
          return this.title.length
        }
      }
    }

  </script>