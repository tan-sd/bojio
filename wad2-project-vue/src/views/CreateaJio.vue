<template>
  <main class="securepage">
    <!-- <h1>Secure Page</h1> -->

    <div class="container-fluid text-center mt-2">
      <p class="login-msg"></p>
      <div class="row">
        <div class="banner-header-form col">Create a Jio</div>
      </div>
    </div>

    <div class="container-fluid text-center pt-1">
      <div class="row">
        <div class="banner-text-form col">Make any occasion unforgettable!</div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col d-flex pt-4 border border solid">
          <form class="register-form" style="width: 600px">
            <h3>Event Details</h3>

            <div class="form-row">
              <div class="form-group col" style="width: auto">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control"
                    id="emailLogin"
                    placeholder="email"
                    v-model="title"
                  />
                  <label for="emailLogin" class="text-muted">Event title</label>
                  <div id="emailLoginInvalid" class="invalid-feedback"></div>
                </div>
                <div class="float-end mt-1">
                  {{ checkTitle }} / {{ titleLimit }}
                </div>
              </div>

              <div class="form-group col mt-5" style="width: auto">
                <div class="form-floating">
                  <textarea
                    v-model="description"
                    class="form-control"
                    placeholder="description"
                    id="description"
                    style="height: 200px"
                  ></textarea>
                  <label for="description" class="text-muted"
                    >Event description</label
                  >
                </div>
              </div>
              <div class="float-end mt-1">
                {{ checkDescription }} / {{ descriptionLimit }}
              </div>
            </div>

            <div
              class="register-form-field form-group col mt-5"
              style="width: auto"
            >
              <div class="form-floating">
                <input
                  type="datetime-local"
                  class="form-control"
                  id="eventDateTime"
                  placeholder="eventDateTime"
                  v-model="eventDateTime"
                />
                <label for="firstName" class="text-muted"
                  >Event date and time</label
                >
              </div>
              <div
                id="DateTimeInvalid"
                class="text-danger"
                v-if="new Date(eventDateTime) < currentDateTime"
              >
                Enter a valid date and time for the event.
              </div>
            </div>

            <div class="form-group col mt-3" style="width: auto">
              <h3>Add Activities</h3>
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="activityTitle"
                  placeholder="activityTitle"
                  v-model="actTitle"
                />
                <label for="activityTitle" class="text-muted"
                  >Activity title</label
                >
                <div id="emailLoginInvalid" class="invalid-feedback"></div>
              </div>
            </div>

            <div class="form-group col mt-5" style="width: auto">
              <div class="form-floating">

                <GMapAutocomplete
                  type="text"
                  class="form-control"
                  id="activityLocation"
                  placeholder="This is a placeholder"
                  @place_changed="setPlace"
                  :options="autocompleteOptions"
                  :value="this.search"
                >
           
              
              </GMapAutocomplete>
                <label for="activityLocation" class="text-muted"
                  >Activity Location</label
                >
              </div>
            </div>

            <div class="form-group col mt-5" style="width: auto">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="activityDuration"
                  placeholder="activityDuration"
                  v-model="actDuration"
                />
                <label for="activityLocation" class="text-muted"
                  >Activity Duration (mins)</label
                >
              </div>
            </div>

            <button
              type="button"
              style="background-color: rgb(255, 127, 45); color: white"
              class="btn orange border border-3 mt-4 rounded-5"
              id="addAct"
              @click="addAct(), document.GMapAutocomplete.set('place', null)"
            >
              Add activity!
            </button>
          </form>
        </div>
        <div class="col d-flex flex-column pt-4 border border solid">
          <div class="col" id="results">
            <h3>Activity Table</h3>

            <div v-if="actArr.length == 0">
              <h5>You have no activities yet</h5>
            </div>
            <div v-else>
              <table>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Activity(Mins)</th>
                  <th></th>
                </tr>
                <tr v-for="(act, index) in this.actArr" :key="act">
                  <th>{{ index + 1 }}</th>
                  <td>{{ act.name }}</td>
                  <td>{{ act.location }}</td>
                  <td>{{ act.duration }}</td>
                  <td>
                    <button
                      type="button"
                      style="background-color: rgb(255, 127, 45); color: white"
                      class="btn orange border border-3 rounded-5"
                      id="loginBtn"
                      @click="
                        actArr.splice(index, 1),
                          markers.splice(index, 1),
                          remove(act.duration)
                      "
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              </table>
              <p>Total Duration(Mins): {{ totalDuration }}</p>
            </div>
          </div>

          <div class="col" id="map">
            <h3>Map</h3>

            <GMapMap
              :center="center"
              :zoom="10"
              map-type-id="roadmap"
              style="width: 1000px; height: 400px"
              :options="options"
            >
              <GMapMarker
                :key="marker.id"
                v-for="(marker,i) in markers"
                :position="marker.position"
                :label="(i+1).toString()"
                

              />
              <GMapInfoWindow>
                <div>I am in info window <MyComponent /></div>
              </GMapInfoWindow>
            </GMapMap>
          </div>
        </div>
      </div>
    </div>
    <button
      type="button"
      style="background-color: rgb(255, 127, 45); color: white"
      class="btn orange border border-3 mt-4 rounded-5"
      id="loginBtn"
    >
      Create Jio
    </button>
  </main>
</template>

<script>
import { remove } from "@firebase/database";

export default {
  name: "App",
  data() {
    return {
      
      center: { lat: 1.3421, lng: 103.8198 },
      markers: [],
      titleLimit: 100,
      descriptionLimit: 300,
      description: "",
      title: "",
      eventDateTime: new Date(), //initialise to current date before changing first
      currentDateTime: new Date(),
      actArr: [],
      actTitle: "",
      actLocation: "",
      actDuration: "",
      totalDuration: 0,
      currentPlace: null,
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
    setPlace(place) {
      this.actLocation = place.name;
      this.currentLat = place.geometry.location.lat();
      this.currentLng = place.geometry.location.lng();

    },
    addAct() {
      
      
      if (isNaN(this.actDuration)) {
        console.log("error");
      } else {
        this.markers.push({
          id: Math.random(),
          position: { lat: this.currentLat, lng: this.currentLng },
        });
        this.actArr.push({
          name: this.actTitle,
          location: this.actLocation,
          duration: this.actDuration,
        });
        this.totalDuration += parseFloat(this.actDuration);
        this.clearForm();
        document.GMapAutocomplete.set("place", null);
      }
    },
    remove(activity) {
      console.log("the activity is" + activity);
      console.log("before" + this.totalDuration);
      this.totalDuration -= parseFloat(activity);
      console.log("aft" + this.totalDuration);
    },
    clearForm() {
      this.actDuration = "";
      document.getElementById("activityLocation").value='';
      this.actTitle = "";
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
    
  },

  
};
</script>
