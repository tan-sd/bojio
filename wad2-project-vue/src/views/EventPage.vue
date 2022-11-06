<template>
  <div v-if="loading">
    <div id="event-banner-div">
      <img
        id="event-banner-background"
        v-bind:style="{ backgroundImage: 'url(' + imageurl + ')' }"
        alt=""
      />
      <div class="row">
        <div id="event-banner-card" class="col-11 col-sm-10 col-md-8 col-lg-6">
          <img
            id="event-banner-card-image"
            class="card-img"
            :src="imageurl"
            alt=""
          />
          <div id="event-banner-card-body">
            <div class="row">
              <div class="col-12 col-md-6 mb-2">
                <h5>{{ name }}</h5>
                <p>
                  <i
                    class="bi bi-calendar2-week-fill eventDate"
                    style="margin-right: 10px"
                  ></i
                  >{{ displayDate() }}, {{ convertTime() }}
                </p>
                <p>
                  <i
                    class="bi bi-geo-alt-fill eventVenue"
                    style="margin-right: 10px"
                  ></i
                  >{{ getVenue() }}
                </p>
                <!-- <p>Organised by</p> -->
              </div>
              <div id="event-card-buttons" class="col-12 col-md-6 text-center">
                <a href="#event-details-map"><button type="button" class="btn btn-primary col-12" @click="loadMap()">
                  Show Route to Event
                </button>
                </a>
                <button type="button" class="btn btn-primary col-12">
                  Create a Jio for this event
                </button>
                <button type="button" class="btn btn-primary col-12">
                  Join a Jio for this event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="event-about-background"></div>
    <div class="container mt-3">
      {{ getlat }} {{ getlng }}

      <h1>{{ name }}</h1> <!-- TITLE OF ABOUT SECTION HERE -->
      <!-- {{description}} -->
      <div class="row">
        <div id="event-about-section" class="col-6" v-html="displayDescription"></div>
        <div class="col-6">
        <div class="container" id="event-details-map">
          <div class="col d-flex">
            <GMapMap
              :center="center"
              :zoom="16"
              map-type-id="roadmap"
              style="width: 80vmin; height: 50vmin"
              :options="options"
              ref="map"
            >
              <GMapMarker
                :key="marker.id"
                v-for="marker in markers"
                :position="marker.position"
              />
            </GMapMap>
          </div>
        </div>
      </div>
    </div>

      
    </div>


    
  </div>

  <div v-else>
    <div class="card" aria-hidden="true">
      <div id="event-banner-div">
        <img id="event-banner-background" />
        <div class="row">
          <div
            id="event-banner-card"
            class="col-11 col-sm-10 col-md-8 col-lg-6"
          >
            <svg
              class="bd-placeholder-img card-img-top"
              width="100%"
              height="180"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#868e96"></rect>
            </svg>
            <div id="event-banner-card-body">
              <div class="row">
                <div class="col-12 col-md-6 mb-2">
                  <p class="card-text placeholder-glow">
                    <span class="placeholder col-12"></span>
                  </p>
                  <p class="card-text placeholder-glow">
                    <span class="placeholder col-7"></span>
                  </p>
                  <p class="card-text placeholder-glow">
                    <span class="placeholder col-5"></span>
                  </p>
                  <p class="card-text placeholder-glow">
                    <span class="placeholder col-5"></span>
                  </p>
                </div>
                <p class="col-12 col-md-6 text-center placeholder-glow">
                  <span class="placeholder col-12 mb-1"></span>
                  <span class="placeholder col-12 mb-1"></span>
                  <span class="placeholder col-12"></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sourceData from "../data.json";
import axios from "axios";
import { variableDeclarator } from "@babel/types";
// import { getIdToken } from '@firebase/auth';

export default {
  name: "EventsButton",
  data() {
    return {
      loading: false,
      latitude: "",
      longitude: "",
      events: sourceData.events,
      description: "",
      eventId: "",
      url: "",
      eventImg: "",
      name: "",
      imageurl: "",
      eventdate: "",
      starttime: "",
      organizerID: "",
      organizerName: "",
      descriptionURL: "",
      venueURL: "",
      venueID: "",
      venueName: "",
      eventName: "",
      date: "",
      time: "",
      ownLoc:"",
      center: { lat: this.latitude, lng: this.longitude },
      markers: [
        {
          position: {
            lat: this.latitude,
            lng: this.longitude,
          },
        },
      ],
      options: {
        zoomControl: false,
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
    

    userLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var lat=position.coords.latitude;
          var lng=position.coords.longitude;
        
          this.ownLoc= {lat,lng}
          console.log(this.ownLoc)
        },
        (error) => {
          console.log(error.message);
        }
      );
    },

    calculateAndDisplayRoute(
      directionsService,
      directionsDisplay,
      // start,
      // destination
    ) {
      // var refWaypoints = this.waypts;
      var refWaypoints = [];

      var start = this.ownLoc
      var end = this.center

      // for (var i=1;i<this.places.length-1;i++) {
      //   refWaypoints.push({
      //     location: this.places[i],
      //     stopover: true,
      //   });
      // }
      console.log( refWaypoints);
      console.log('start: ' + start);
      console.log('end: ' + end);
      directionsService.route(
        {
          origin: start,
          destination: end,
          waypoints: refWaypoints,
          travelMode: "DRIVING",
          optimizeWaypoints: true
        },
        function (response, status) {
          if (status === "OK") {
            directionsDisplay.setDirections(response);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    },

    loadMap(){
      var directionsService = new window.google.maps.DirectionsService();
      var directionsDisplay = new window.google.maps.DirectionsRenderer();
      directionsDisplay.setMap(this.$refs.map.$mapObject);
      this.calculateAndDisplayRoute(
          directionsService,
          directionsDisplay,
          // this.places[0],
          // this.places[1]
        )
    },

    setLoading() {
      this.loading = true;
    },

    displayDate() {
      const eventDate = this.date;
      let fullDate = eventDate.split("-");
      let months = [
        "",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let eventD = new Date(fullDate);
      const date = eventD.getDay();
      return days[date] + ", " + months[fullDate[1]] + " " + fullDate[2];
    },

    convertTime() {
      let time = this.time;
      time = time.split(":");
      return (
        (time[0] >= 12 && (time[0] - 12 || 12) + ":" + time[1] + " PM") ||
        (Number(time[0]) || 12) + ":" + time[1] + " AM"
      );
    },

    getVenue() {
      return this.venueName;
    },

    getImg() {
      return this.eventImg;
    },

    getId() {
      this.eventId = this.$route.params.idx;
      var eventId = this.$route.params.idx;
      this.url = `https://www.eventbriteapi.com/v3/events/${eventId}/?token=PRFPTWCYQ4TUG6MWF7GF`;
      this.descriptionURL = `https://www.eventbriteapi.com/v3/events/${eventId}/description/?token=PRFPTWCYQ4TUG6MWF7GF`;
    },
  },

  computed: {
    get() {
      return this.$route.params.idx;
    },

    getlat() {
      var obj = this.center;
      obj.lat = this.latitude;

      var array = this.markers;
      array[0].position.lat = this.latitude;

      return "";
    },

    getlng() {
      var obj = this.center;
      obj.lng = this.longitude;

      var array = this.markers;
      array[0].position.lng = this.longitude;

      return "";
    },

    displayDescription(){
      return (
        `<style>  
          #event-about-section p {
            width: 100%;
            font-size: 15px;
          }
        
        </style>` + 
        `
        ${this.description}
        `

      );
    }
  },

  created() {
    this.ownLoc
    this.userLocation()
    // this.calculateAndDisplayRoute()
    // this.loadMap()
    
    
    this.getId();
    var url = this.url;
    console.log(url);
    //use description
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        // this.description = response.data.description.text
        // this.eventName = response.data.name.html,
        this.name = response.data.name.text;
        this.imageurl = response.data.logo.original.url;
        this.eventdate = response.data.start.local;
        (this.venueID = response.data.venue_id),
          (this.organizerID = response.data.organizer_id),
          (this.venueURL =
            `https://www.eventbriteapi.com/v3/venues/` +
            this.venueID +
            `/?token=PRFPTWCYQ4TUG6MWF7GF`),
          (this.organizerURL =
            `https://www.eventbriteapi.com/v3/organizers/` +
            this.organizerID +
            `/?token=PRFPTWCYQ4TUG6MWF7GF`),
          // const eventdate = this.eventdate
          (this.date = this.eventdate.split("T")[0]);
        this.time = this.eventdate.split("T")[1];

        axios
          .get(this.venueURL)
          .then(
            (response) => (
              console.log(response.data),
              (this.venueName = response.data.name),
              (this.latitude = parseFloat(response.data.latitude)),
              (this.longitude = parseFloat(response.data.longitude)),
              console.log(this.longitude)
            )
          ),
          axios
            .get(this.descriptionURL)
            .then((response) => (this.description = response.data.description)),
          axios
            .get(this.organizerURL)
            .then((response) => (this.organizerName = response.data.name));
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => setTimeout(this.setLoading, 500));
  },
};
</script>
