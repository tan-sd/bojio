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
            <div v-if="confirmjio" class="profile-dark-background">
            </div>
        </Transition>
        
            
            <!-- pops up when you try to delete friend -->
            <Transition name="fade">
            <template v-if="confirmjio">
                <div class="card container p-4 profile-delete-popup text-center">
                    <div class="row mb-3 ">
                        <h5 style="font-family:worksans-semibold">Confirm Jio?</h5>
                        <span>Are you sure you want to confirm Jio</span>
                    </div>
                    <div class="row">
                        <div class="col"><button class="profile-popup-button w-100" @click="createjio">Yes</button></div>
                        <div class="col"><button class="profile-popup-button w-100" @click="this.confirmjio=false">No</button></div>
                    </div>
                </div>
                
            </template>
            </Transition>
        

    <div class="container-fluid p-5">
      <div class="row">
          <!-- form section -->
          <div class="col-12 d-flex justify-content-center">
            <form class="register-form">
              <div class="mb-3 text-center" style="font-family: worksans-semibold">Event Details</div>
              <div class="form-row">
                <div class="form-group col" style="width: auto">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="eventTitle" placeholder="event title" v-model="title"
                      v-bind:class="{ maxCount: titleMaxCount }" />
                    <label for="eventTitle" class="text-muted">Event title</label>
                    <div id="eventTitleInvalid" class="invalid-feedback">
                      Please provide the event title.
                    </div>
                  </div>
                  <div class="float-end mt-1">
                    {{ checkTitle }} / {{ titleLimit }}
                  </div>
                </div>
                <div class="form-group col mt-5" style="width: auto">
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
              <div class="register-form-field form-group col mt-5" style="width: auto">
                <div class="form-floating">
                  <input type="datetime-local" class="form-control" id="eventDateTime" placeholder="eventDateTime"
                    v-model="eventDateTime" />
                  <label for="eventDateTime" class="text-muted">Event date and time</label>
                  <div id="eventDateTimeInvalid" class="invalid-feedback"></div>
                </div>
                <!-- <div
                  id="DateTimeInvalid"
                  class="text-danger"
                  v-if="new Date(eventDateTime) < currentDateTime"
                >
                  Enter a valid date and time for the event.
                </div> -->
              </div>
            </div>
            
            <div class="form-row mt-3">
              Type of Event:
              <div class="form-check">
                <!-- cannot make one horizontal line -->
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="public">
                <label class="form-check-label" for="exampleRadios1">
                  Public
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="private">
                <label class="form-check-label" for="exampleRadios2">
                  Private
                </label>
              </div>
            </div>
            <div class="row mt-3">
              <div class="form-group col" style="width: auto">
                  <div class="form-floating">
                    <input type="number" class="form-control" id="maxLimit" placeholder="maximum Limit" v-model="maxLimit"
                    />
                    <label for="maxLimit" class="text-muted">Jio capacity</label>
                    <div id="eventTitleInvalid" class="invalid-feedback">
                      Please provide a limit to the number of people going
                    </div>
                  </div>
            
              </div>
              <div class="form-group col" style="width: auto">
            
                <select class="form-select" aria-label="Default select example" v-model="category" id="category">
                  <option value="">Jio category </option>
                  <option value="Entertainment">Business and Industry</option>
                  <option value="Entertainment">Education</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Fitness and Wellness">Fitness and Wellness</option>
                  <option value="Food and Drinks">Food and Drinks</option>
                  <option value="Hobbies and Activities">Hobbies and Activities</option>
                  <option value="Shopping and Fashion">Shopping and Fashion</option>
                  <option value="Sports and Outdoor Activities">Sports and Outdoor Activities</option>
                  <option value="Technology">Others</option>
            
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
          <div class="row"> <!-- map -->
              <GMapMap :center="center" :zoom="11" map-type-id="roadmap" style="width: 100%; height: 400px"
              :options="options" ref="map">
              </GMapMap>
            </div>

            <div class="row mt-5"> <!-- event details -->
              <div v-if="actArr.length == 0">
                    <div class="card border-0 friend-bar p-2 ps-4 mx-auto" style="max-width: 30rem; height:5rem">
                      <div class="row my-auto">
                        <div class="col-3 col-md-2">
                          <div class="rounded-circle" style="padding:7px 15px; font-size:30px; background: radial-gradient(circle at 18.7% 37.8%, rgb(250, 250, 250) 0%, rgb(225, 234, 238) 90%); color:white; width:50px; height: 50px;">
                          </div>   
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

                        <!-- <div class="col-3 my-auto">
                          <div class="row">
                            <button type="button" style="background-color: rgb(255, 127, 45); color: white"
                            class="btn orange border border-3 rounded-5" id="loginBtn"
                            >
                            X
                          </button>
                          </div>
                        </div> -->
                      </div>
                  </div>

                  <!-- <div class='card mx-auto'>
                      <div class='card-body'>
                          <h5 class='card-title'>{{act.name}}</h5>
                          <p class='card-text'>{{act.location}}</p>
                          <p class='card-text'>{{act.duration}}</p>
                          <button type="button" style="background-color: rgb(255, 127, 45); color: white"
                            class="btn orange border border-3 rounded-5" id="loginBtn"
                            @click="actArr.splice(index, 1), removetime(act.duration), remove(act.location)">
                            Remove
                          </button>
                      </div>
                  </div> -->
                </div>
                
                <!-- <p>Total Duration(Mins): {{ totalDuration }}</p> -->
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
      popup:false,
      imgUrl: 'no-imageUrl',
      image: 'no-image',
      imageData: 'no-imageData',
      actError: [],
      evtError: [],
      center: { lat: 1.3421, lng: 103.8198 },
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
      eventDateTime: new Date(), //initialise to current date before changing first
      currentDateTime: new Date(),
      actArr: [],
      actTitle: "",
      actLocation: "",
      actDuration: "",
      totalDuration: 0,
      currentPlace: null,
      travelMode: "DRIVING",//initialise as driving first 
      autocompleteOptions: {
        componentRestrictions: {
          country: ["sg"],
        },
      },
      currentLat: "",
      currentLng: "",
      options: {
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        styles: [],
      },
      // currentTime:new Date().toLocaleTimeString('en-GB').slice(0, 5),
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
      directionsService,
      directionsDisplay,
      // start,
      // destination
    ) {
      // var refWaypoints = this.waypts;
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
      
      console.log( refWaypoints);
      console.log('start: ' + start);
      console.log('end: ' + end);
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
      console.log(place)
    },
    addAct() {
      //reset map
      if (directionsDisplay != null) {
        directionsDisplay.setMap(null);
        directionsDisplay = null;
        }
      directionsService = new window.google.maps.DirectionsService();
      directionsDisplay = new window.google.maps.DirectionsRenderer();

      console.log(directionsDisplay);
      
      directionsDisplay.setMap(this.$refs.map.$mapObject);

      var errors = 0;

      var activityLocation = document.getElementById("activityLocation");
      var activityTitle = document.getElementById("activityTitle");
      var activityDuration = document.getElementById("activityDuration");

      if (this.actDuration == "") {
        activityDuration.classList = "form-control is-invalid";
        // this.actError.push("Duration is empty or invalid");
        errors += 1;
      } else {
        activityDuration.classList = "form-control is-valid";
      }

      if (activityLocation.value == "") {
        activityLocation.classList = "form-control is-invalid";
        // this.actError.push("Location is empty or invalid");
        errors += 1;
      } else {
        activityLocation.classList = "form-control is-valid";
      }

      if (this.actTitle == "") {
        activityTitle.classList = "form-control is-invalid";
        // this.actError.push("Activity has no title");
        errors += 1;
      } else {
        activityTitle.classList = "form-control is-valid";
      }
      if(errors>0){
        this.confirmjio=false
      }
      

      if (errors == 0) {
        
        this.places.push(this.actLocation);
        console.log(this.places)
        console.log(this.currentLat)
        console.log(this.currentLng)
        
        if (this.places.length >= 1) {
        this.calculateAndDisplayRoute(
          directionsService,
          directionsDisplay,
          // this.places[0],
          // this.places[1]
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

    //adding points to map which was intially in add and remove activity function

  
    removetime(activity) {
      // console.log("the activity is" + activity);
      // console.log("before" + this.totalDuration);
      this.totalDuration -= parseFloat(activity);
      // console.log("aft" + this.totalDuration);
      // console.log('in remove');

    },

    remove(location) {
      if (directionsDisplay != null) {
        directionsDisplay.setMap(null);
        directionsDisplay = null;
        }
      directionsService = new window.google.maps.DirectionsService();
      directionsDisplay = new window.google.maps.DirectionsRenderer();

      console.log(directionsDisplay);
      
      directionsDisplay.setMap(this.$refs.map.$mapObject);
      console.log(this.places)
      var index = this.places.indexOf(location)
      this.places.splice(index, 1)
      console.log(this.places)
      if (this.places.length >= 1) {
        this.calculateAndDisplayRoute(
          directionsService,
          directionsDisplay,
          // this.places[0],
          // this.places[1]
        );
      }

      if (this.places.length == 2) {
        // console.log(this.places)
        // for (var i = 1; i < this.places.length - 1; i++) {
        //   console.log(i);
        //   console.log(this.places[i]);
        //   this.waypts.push({
        //     location: this.places[i],
        //     stopover: true,
        //   });
        // }
        this.calculateAndDisplayRoute(
          directionsService,
          directionsDisplay,
          // this.places[0],
          // this.places[this.places.length - 1]
        );
      }

      if (this.places.length > 2) {
        // console.log(this.places)
        for (var i = 1; i < this.places.length - 1; i++) {
          console.log(i);
          console.log(this.places[i]);
          this.waypts.push({
            location: this.places[i],
            stopover: true,
          });
        }
        console.log(this.waypts);
        this.calculateAndDisplayRoute(
          directionsService,
          directionsDisplay,
          // this.places[0],
          // this.places[this.places.length - 1]
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
      var maxLimit= document.getElementById("maxLimit");
      var category = document.getElementById("category");
      var activityLocation = document.getElementById("activityLocation");
      var activityTitle = document.getElementById("activityTitle");
      var activityDuration = document.getElementById("activityDuration");
      var errors = 0;

      if (this.title == "") {
        eventTitle.classList = "form-control is-invalid";
        // this.evtError.push("Event has no title");
        errors += 1;
      } else {
        eventTitle.classList = "form-control is-valid";
      }

      if (this.description == "") {
        eventDescription.classList = "form-control is-invalid";
        // this.evtError.push("Event has no description ");
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
        // this.evtError.push("Please choose a valid date");
      } else {
        eventDateTime.classList = "form-control is-valid";
        eventDateTimeInvalid.innerHTML = "";
      }

      if (this.actArr.length < 1) {
        errors+=1
        activityDuration.classList = "form-control is-invalid";
        activityTitle.classList = "form-control is-invalid";
        activityLocation.classList = "form-control is-invalid";
        // [FILLUP].classList = ('form-control is-invalid')
        // [FILLUP].innerHTML = 'Please provide at least one activity.'
        // this.evtError.push("Please provide at least one activity");
      } else {
        // [FILLUP].classList = ('form-control is-valid')
        // [FILLUP].innerHTML = ''
        activityDuration.classList = "form-control is-valid";
        activityTitle.classList = "form-control is-valid";
        activityLocation.classList = "form-control is-valid";
      }

      if (this.maxLimit == "") {
        maxLimit.classList = "form-control is-invalid";
        // this.evtError.push("Event has no title");
        errors += 1;
      } else {
        maxLimit.classList = "form-control is-valid";
      }

      if (this.category == "") {
        category.classList = "form-control is-invalid";
        // this.evtError.push("Event has no title");
        errors += 1;
      } else {
        category.classList = "form-control is-valid";
      }
      

      console.log(this.evtError);

      if (errors == 0) {
        this.confirmjio=true;
        eventTitle.classList = "form-control";
        eventDescription.classList = "form-control";
        eventDateTime.classList = "form-control";
        //still in createjio, no error then add to db
        
      }
    },
    createjio() {
      createJio(this.actArr)
      this.confirmjio=false;
      // this.$router.push("/");
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
    titleMaxCount() {
      if (this.title.length > 50) {
        return true;
      } else {
        return false;
      }
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
