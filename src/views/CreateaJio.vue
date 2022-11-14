<template>
  <main class="securepage">
    <div class="container-fluid text-center ">
      <p class="login-msg"></p>
      <div class="row">
        <div class="banner-header-form col">Create a Jio</div>
        <div class="row">
          <div class="banner-text-form col">
            Make any occasion unforgettable!
          </div>
        </div>
      </div>
    </div>
    <Transition name="fade">
      <div v-if="confirmjio || gobackhome" class="profile-dark-background"></div>
    </Transition>
      
    <!-- POP UP MODAL TO CONFIRM JIO CREATION -->
      <Transition name="fade">
        <template v-if="confirmjio">
          <div class="card container p-4 profile-delete-popup text-center">
            <div class="row mb-3 ">
              <h5 style="font-family:worksans-semibold">Confirm Jio?</h5>
                <span>Are you sure you want to confirm Jio</span>
            </div>
            <div class="row">
              <div class="col">
                <button class="profile-popup-button w-100" @click="createjio">
                  Yes
                </button>
              </div>
              <div class="col">
                <button class="profile-popup-button w-100" @click="this.confirmjio=false">
                  No
                </button>
              </div>
            </div>
          </div>
        </template>
      </Transition>

      <!-- DIRECTS BACK TO HOME PAGE AFTER JIO CREATION -->
      <Transition name="fade">
        <template v-if="gobackhome">
          <div class="card container p-4 profile-delete-popup text-center">
            <div class="row mb-3 ">
                <h5 style="font-family:worksans-semibold">Jio Confirmed</h5>
            </div>
            <div class="row">
                <div class="col"><router-link to='/' style="text-decoration: none;"><button class="profile-popup-button w-100">
                  Return back to home page</button></router-link></div>
                <div class="col"><button class="profile-popup-button w-100" @click="this.$router.go()">create another jio</button></div>
            </div>
          </div>          
        </template>
      </Transition>
        
    <div class="container-fluid p-5">
      <div class="row">
        <!-- FORM SECTION -->
        <div class="col-12 d-flex justify-content-center">
          <form class="register-form">
            <div class="mb-3 text-center" style="font-family: worksans-semibold">Event Details</div>
            <div class="form-row">
              <div class="form-group col" style="width: auto">
                <div class="form-floating">
                  <input type="text" class="form-control" id="eventTitle" placeholder="event title" v-model="title"/>
                  <label for="eventTitle" class="text-muted">Event title</label>
                  <div id="eventTitleInvalid" class="invalid-feedback">
                    Please provide the event title.
                  </div>
                </div>
              </div>
              <div class="form-group col mt-4" style="width: auto">
                <div class="form-floating">
                  <textarea v-model="description" class="form-control" placeholder="description" id="eventDescription"
                    style="height: 200px" v-bind:class="{ maxCount: descriptionMaxCount }"></textarea>
                  <label for="eventDescription" class="text-muted">Event description</label>
                  <div id="eventDescriptionInvalid" class="invalid-feedback">
                    Please provide a description.
                  </div>
                </div>
              </div>
              <div class="float-end mt-1">
                {{ checkDescription }} / {{ descriptionLimit }}
              </div>
            </div>
            <div class="input-group">
              <input type="file" class="form-control" @change="onFileChange" accept="image/*" id="imgUpload" style="display: none"/>
            </div>
            <div class="row mt-4">
              <div class="form-group col" style="width: auto">
                  <div class="form-floating">
                    <input type="number" class="form-control" id="eventCapacity" placeholder="maximum Limit" v-model="maxLimit"/>
                    <label for="maxLimit" class="text-muted">Event capacity</label>
                    <div id="eventCapacityInvalid" class="invalid-feedback">
                      Please provide a limit of people going.
                    </div>
                  </div>
              </div>
            </div>
            <div @click="imgUpload" id="imgPreview" class="row mt-4 mx-auto card" style="cursor: pointer; width: 400px; height: 250px;">
              <div id="preview" class="d-flex justify-content-center align-items-center my-auto">
                <img style="width: 80%;" v-if="imgUrl != 'no-imageUrl'" :src="imgUrl">
                <div v-else>
                  <div class="d-flex justify-content-center align-items-center">
                    <h1><i class="bi bi-card-image mx-auto"></i></h1>
                  </div>
                  <div>Upload a banner photo</div>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="register-form-field form-group col mt-4" style="width: auto">
                <div class="form-floating">
                  <input type="datetime-local" class="form-control" id="eventDateTime" placeholder="eventDateTime"
                    v-model="eventDateTime" />
                  <label for="eventDateTime" class="text-muted">Event date and time</label>
                  <div id="eventDateTimeInvalid" class="invalid-feedback"></div>
                </div>
              </div>
            </div>
          
            <div class="form-row mt-4">
              <div class="row">
                <div class="col-4">
                  Type of Event:
                </div>
                <div class="col-3">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="public" checked>
                    <label class="form-check-label" for="exampleRadios1">
                      Public
                    </label>
                  </div>
                </div>
                <div class="col-3">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="private">
                    <label class="form-check-label" for="exampleRadios2">
                      Private
                    </label>
                  </div>
                </div>
              </div>
            </div>
          
            <div class="row mt-4">
              <div class="form-group col" style="width: auto">
                <select class="form-select" aria-label="Default select example" v-model="category" id="category">
                  <option value="">Categories</option>
                  <option value="Business and Industry">Business and Industry</option>
                  <option value="Education">Education</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Fitness and Wellness">Fitness and Wellness</option>
                  <option value="Food and Drinks">Food and Drinks</option>
                  <option value="Hobbies and Activities">Hobbies and Activities</option>
                  <option value="Shopping and Fashion">Shopping and Fashion</option>
                  <option value="Sports and Outdoor Activities">Sports and Outdoor Activities</option>
                  <option value="Others">Others</option>
                </select>
                <div class="invalid-feedback">
                  Please provide a category for the event
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <div class="row">
        <div class="col-12 col-lg-5 mt-5">
          <div class="create-map-container">
            <div class="mb-3" style="font-family: worksans-semibold">
              Activities
            </div>

            <div class="form-floating">
              <input type="text" class="form-control" id="activityTitle" placeholder="activityTitle"
              v-model="actTitle" />
              <label for="activityTitle" class="text-muted">
                Activity title
              </label>
              <div class="invalid-feedback">
                Please provide an activity title
              </div>
            </div>

            <div class="form-group mt-3" style="width: auto">
              <div class="form-floating">
                <GMapAutocomplete type="text" class="form-control" id="activityLocation"
                placeholder="This is a placeholder" @place_changed="setPlace" :options="autocompleteOptions"
                :value="this.search">
                </GMapAutocomplete>
                <label for="activityLocation" class="text-muted">Activity location</label>
                <div class="invalid-feedback">
                  Please provide a location.
                </div>
              </div>
            </div>

            <div class="form-group mt-3" style="width: auto">
              <div class="form-floating">
                <input type="number" class="form-control" id="activityDuration" placeholder="activityDuration"
                v-model="actDuration" />
                <label for="activityLocation" class="text-muted">
                  Activity duration (mins)
                </label>
                <div class="invalid-feedback">
                  Please provide a duration.
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-center">
              <button type="button" class="btn login-signup-button w-50" id="addAct" @click="addAct(), document.GMapAutocomplete.set('place', null)">
                Add activity
              </button>
            </div>
          </div>
        </div>


        <div class="col-12 col-lg-7">
          <div class="text-center mb-4 mt-5" style="font-family: worksans-semibold">Overview</div>
          <!-- GOOGLE MAP -->
          <div class="row"> 
            <GMapMap :center="center" :zoom="11" map-type-id="roadmap" style="width: 100%; height: 400px"
            :options="options" ref="map">
            </GMapMap>
          </div>

          <!-- EVENT DETAILS -->
          <div class="row mt-5">
            <div v-if="actArr.length == 0">
              <div class="card border-0 friend-bar p-2 ps-4 mx-auto" style="max-width: 30rem; height:5rem">
                <div class="row my-auto">
                  <div class="col-3 col-md-2">
                    <div class="rounded-circle" style="padding:7px 15px; font-size:30px; background: radial-gradient(circle at 18.7% 37.8%, rgb(250, 250, 250) 0%, rgb(225, 234, 238) 90%); color:white; width:50px; height: 50px;"></div>   
                  </div>
                  
                  <div class="col-9 col-md-10 my-auto">
                    <span class="float-start" style="color:black;">
                      <span style="font-family: worksans-semibold">No activities yet</span>
                      <br>
                      <span style="font-size: 0.9rem; color: grey;">Add an activity!</span>
                    </span>
                    <div class="invalid-feedback">
                      Please provide some activities
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else>
              <div v-for="(act, index) in this.actArr" :key="act">
                <div class="card border-0 friend-bar p-2 ps-4 mx-auto mt-3" style="width: 30rem; height: 6rem;">
                  <div class="row my-auto">
                    <div class="col-2 my-auto">
                      <div class="rounded-circle" style="padding:7px 15px; font-size:25px; background: linear-gradient(90deg, #ac72ff, #23d2ff); color:white;">
                        <span class="d-flex justify-content-center">{{index+1}}</span>
                      </div>   
                    </div>
                    
                    <div class="col-10 my-auto">
                      <div style="cursor: pointer; width: 25px; height: 25px; background: linear-gradient(90deg, #ef4136, #fbb040);" @click="actArr.splice(index, 1), removetime(act.duration), remove(act.location)" class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                        <span style="color:white; position: relative; left: -1px; top: -10px">x</span>
                      </div>
                      
                      <div class="row">
                        <div style="font-family: worksans-semibold">{{act.name}}</div>
                        <div style="font-size: 0.9rem; color: grey;">{{act.location}}</div>
                        <div style="font-size: 0.9rem; color: grey;">{{act.duration}} minutes</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-5">
          <button type="button" style="min-width:10rem" class="btn login-signup-button mt-4 w-25" id="loginBtn" @click="checkjio">
            Create Jio!
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { remove } from "@firebase/database";
import { createJio } from '../utils/index'

var directionsDisplay;
var directionsService;

export default {
  title: "BOJIO – Create a Jio",
  data() {
    return {
      confirmjio:false,
      gobackhome:false,
      popup:false,
      imgUrl: 'no-imageUrl',
      image: 'no-image',
      imageData: 'no-imageData',
      actError: [],
      evtError: [],
      center: {
        lat: 1.3421,
        lng: 103.8198
      },
      places: [],
      waypts: [],
      maxLimit:"",
      coords: "",
      destination: "",
      titleLimit: 50,
      descriptionLimit: 100,
      description: "",
      title: "",
      category:"",
      eventDateTime: new Date(), // initialise to current date before changing first
      currentDateTime: new Date(),
      actArr: [],
      actTitle: "",
      actLocation: "",
      actDuration: "",
      totalDuration: 0,
      currentPlace: null,
      travelMode: "DRIVING",// initialise as driving first 
      autocompleteOptions: {
        componentRestrictions: {
          country: ["sg"],
        },
      },
      currentLat: "",
      currentLng: "",
      options: {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        styles: [],
      },
    };
  },
  methods: {
    imgUpload() {
      var imgUpload = document.getElementById('imgUpload');
      imgUpload.click()
    },
    onFileChange(e) {
      const file = e.target.files[0]
      this.imageData = file;
      this.imgUrl = URL.createObjectURL(file);
      const files = e.target.files;
      this.image = files[0]
    }, 
    calculateAndDisplayRoute(
      // START
      // DESTINATION
      directionsService,
      directionsDisplay,
    ) {
      var refWaypoints = [];
      var travelMode = this.travelMode;
      var start = this.places[0]
      var end = this.places[this.places.length - 1]

      for (var i=1;i<this.places.length-1;i++) {
        refWaypoints.push({
          location: this.places[i],
          stopover: true,
        });
      }
      // console.log( refWaypoints);
      // console.log('start: ' + start);
      // console.log('end: ' + end);
      directionsService.route(
        {
          origin: start,
          destination: end,
          waypoints: refWaypoints,
          travelMode: travelMode,
          optimizeWaypoints: true
        },
        function (response, status) {
          if (status === "OK") {
            directionsDisplay.setDirections(response);
          } else {
            // console.log(this.places)
            // this.places.splice(this.places.length-1,1)
            // console.log(this.places)
            window.alert("Directions request failed due to location " + status + "\n\nPlease remove activity and choose another location");
          }
        }
      ); 
    },
    setPlace(place) {
      this.actLocation = place.name;
      this.currentLat = place.geometry.location.lat();
      this.currentLng = place.geometry.location.lng();
      // console.log(place)
    },
    addAct() {
      // RESET MAP
      if (directionsDisplay != null) {
        directionsDisplay.setMap(null);
        directionsDisplay = null;
        }
      directionsService = new window.google.maps.DirectionsService();
      directionsDisplay = new window.google.maps.DirectionsRenderer();

      // console.log(directionsDisplay);
      
      directionsDisplay.setMap(this.$refs.map.$mapObject);

      var errors = 0;
      var activityLocation = document.getElementById("activityLocation");
      var activityTitle = document.getElementById("activityTitle");
      var activityDuration = document.getElementById("activityDuration");

      if (this.actDuration == "") {
        activityDuration.classList = "form-control is-invalid";
        errors += 1;
      } else {
        activityDuration.classList = "form-control is-valid";
      }

      if (activityLocation.value == "") {
        activityLocation.classList = "form-control is-invalid";
        errors += 1;
      } else {
        activityLocation.classList = "form-control is-valid";
      }

      if (this.actTitle == "") {
        activityTitle.classList = "form-control is-invalid";
        errors += 1;
      } else {
        activityTitle.classList = "form-control is-valid";
      }
      if(errors>0){
        this.confirmjio=false
      }
      
      if (errors == 0) {
        this.places.push(this.actLocation);
        // console.log(this.places)
        // console.log(this.currentLat)
        // console.log(this.currentLng)
        
        if (this.places.length >= 1) {
        this.calculateAndDisplayRoute(
          directionsService,
          directionsDisplay,
        );
        // console.log(typeof(this.markers[0]))
      }
      // console.log(this.places)

      this.actArr.push({
        name: this.actTitle,
        location: this.actLocation,
        duration: this.actDuration,
        description: this.description,
        image: this.image,
        imageUrl: this.imgUrl,
        imageData: this.imageData
      });

      this.totalDuration += parseFloat(this.actDuration);
      console.log(this.places)
      activityDuration.classList = "form-control";
      activityLocation.classList = "form-control";
      activityTitle.classList = "form-control";
      this.clearForm();
      document.GMapAutocomplete.set("place", null);
      }
    },

    // adding points to map which was intially in add and remove activity function

    removetime(activity) {
      this.totalDuration -= parseFloat(activity);
    },

    remove(location) {
      if (directionsDisplay != null) {
        directionsDisplay.setMap(null);
        directionsDisplay = null;
        }
      directionsService = new window.google.maps.DirectionsService();
      directionsDisplay = new window.google.maps.DirectionsRenderer();
      directionsDisplay.setMap(this.$refs.map.$mapObject);
      var index = this.places.indexOf(location)
      this.places.splice(index, 1)
      if (this.places.length >= 1) {
        this.calculateAndDisplayRoute(
          directionsService,
          directionsDisplay,
        );
      }

      if (this.places.length == 2) {
        this.calculateAndDisplayRoute(
          directionsService,
          directionsDisplay,
        );
      }

      if (this.places.length > 2) {
        for (var i = 1; i < this.places.length - 1; i++) {
          this.waypts.push({
            location: this.places[i],
            stopover: true,
          });
        }
        this.calculateAndDisplayRoute(
          directionsService,
          directionsDisplay,
        );
      }
    },
    clearForm() {
      this.actDuration = "";
      document.getElementById("activityLocation").value = "";
      this.actTitle = "";
      this.actError = [];
    },
    checkjio() {
      var eventTitle = document.getElementById("eventTitle");
      var eventDescription = document.getElementById("eventDescription");
      var eventDateTime = document.getElementById("eventDateTime");
      var eventDateTimeInvalid = document.getElementById("eventDateTimeInvalid");
      var maxEventLimit= document.getElementById("eventCapacity");
      var category = document.getElementById("category");
      var activityLocation = document.getElementById("activityLocation");
      var activityTitle = document.getElementById("activityTitle");
      var activityDuration = document.getElementById("activityDuration");
      var errors = 0;
      console.log(category.value)
      console.log(this.maxLimit)
      console.log(typeof this.maxLimit)
      console.log(typeof maxEventLimit.value)

      if (this.maxLimit === "") {
        maxEventLimit.classList = "form-control is-invalid";
      } else if (Number(this.maxLimit) < 1) {
        maxEventLimit.classList = "form-control is-invalid";
        document.getElementById('eventCapacityInvalid').innerHTML = "Please provide a number more than 0."
      }

      if (this.title == "") {
        eventTitle.classList = "form-control is-invalid";
        errors += 1;
      } else {
        eventTitle.classList = "form-control is-valid";
      }

      if (this.description == "") {
        eventDescription.classList = "form-control is-invalid";
        errors += 1;
      } else {
        eventDescription.classList = "form-control is-valid";
      }

      if (
        eventDateTime.value == "" ||
        new Date(this.eventDateTime) < this.currentDateTime
      ) {
        eventDateTime.classList = "form-control is-invalid";
        eventDateTimeInvalid.innerHTML = "Please provide a valid date.";
        errors += 1;
      } else {
        eventDateTime.classList = "form-control is-valid";
        eventDateTimeInvalid.innerHTML = "";
      }

      if (this.actArr.length < 1) {
        errors+=1
        activityDuration.classList = "form-control is-invalid";
        activityTitle.classList = "form-control is-invalid";
        activityLocation.classList = "form-control is-invalid";
      } else {
        activityDuration.classList = "form-control is-valid";
        activityTitle.classList = "form-control is-valid";
        activityLocation.classList = "form-control is-valid";
      }

      if(this.category==""){
        category.classList = "form-control is-invalid";
        errors += 1;
      } else {
        category.classList = "form-control is-valid";
      }
      
      console.log(this.evtError);
      console.log(errors);

      if (errors == 0) {
        this.confirmjio=true;
        eventTitle.classList = "form-control";
        eventDescription.classList = "form-control";
        eventDateTime.classList = "form-control";
      }
    },
    createjio() {
      createJio(this.actArr)
      this.confirmjio=false;
      this.gobackhome=true
    },
  },
  computed: {
    checkDescription() {
      return this.description.length;
    },
    checkTitle() {
      return this.title.length;
    },
    formatDate() {
      return (
        this.currentYear + "-" + this.currentMonth + "-" + this.currentDate
      );
    },
    markersLength() {
      return this.markers.length;
    },
    descriptionMaxCount() {
      if (this.description.length > 100) {
        return true;
      } else {
        return false;
      }
    },

  },

  mounted() {
    // autofill fields if came from an event details page
    if(this.$route.params.idx){
      this.title = this.$route.params.idx
    }
  }
};
</script>