<template>
    <!-- SKELETON LOADING -->
    <div v-if="loading" class="event-whole-page">
        <div class="container">
            <div class="row">
                <div class="col d-flex justify-content-center">
                    <img
                        class="event-banner-card-image"
                        id="goToTop"
                        :src="imageurl"
                    />
                </div>
            </div>
        </div>

        <!-- <a id="event-scroll-top" href="#goToTop">
        scroll to top
      </a> -->

        <div class="container">
            {{ getlat }} {{ getlng }}
            <div class="event-header-details text-center">
                {{ name }}
            </div>

            <!-- TITLE OF ABOUT SECTION HERE -->
            <div class="row mx-auto">
                <div class="col-12 col-xl-7 mt-5 order-xl-first order-last">
                    <!-- description from data -->
                    <div class="row mx-auto">
                        <div style="font-family: worksans-semibold">About</div>
                        <div
                            class="mb-5"
                            id="event-about-section"
                            v-html="description"
                        ></div>
                    </div>
                </div>

                <div class="col-12 col-xl-5 mt-5 order-xl-last order-first">
                    <div class="p-3 event-right-column event-map-container">
                        <div class="row mx-auto">
                            <div
                                class="mt-2"
                                style="font-family: worksans-semibold"
                            >
                                Details
                            </div>
                            <div class="mt-2">
                                <i
                                    class="bi bi-calendar2-week-fill eventDate"
                                    style="margin-right: 10px"
                                ></i
                                >{{ displayDate() }}, {{ convertTime() }}
                            </div>
                            <div class="mt-2">
                                <i
                                    class="bi bi-geo-alt-fill eventVenue"
                                    style="margin-right: 10px"
                                ></i
                                >{{ getVenue() }}
                            </div>
                            <div class="mt-2">
                                <i
                                    class="bi bi-briefcase-fill"
                                    style="margin-right: 10px"
                                ></i
                                >{{ organizerName }}
                            </div>
                        </div>

                        <div class="container mb-3 mt-4">
                            <div class="col text-center">
                                <!-- GOOGLE MAP -->
                                <GMapMap
                                    :center="center"
                                    :zoom="16"
                                    map-type-id="roadmap"
                                    style="width: 85; height: 40vmin"
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

        <footer class="main-footer">
            <div class="container">
                <div id="footer-row" class="row py-4 px-4 z-10 w-100">
                    <div class="col-lg-6 col-md-3 col-3 d-none d-lg-inline">
                        <div class="container">
                            <div class="row">
                                {{ displayDate().toUpperCase() }},
                                {{ convertTime() }}
                            </div>
                            <div
                                class="row"
                                style="font-family: worksans-semibold"
                            >
                                {{ name }}
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-4 my-auto" id="event-card-buttons">
                        <a
                            :href="routeLink"
                            target="_blank"
                            id="event-route"
                            class="col-12"
                        >
                            <span id="howToGetThere"
                                ><i class="bi bi-pin-map"></i> Directions</span
                            >
                        </a>
                    </div>
                    <div id="event-card-buttons" class="col-lg-2 col-4 my-auto">
                        <button type="button" class="btn btn-primary col-12 ">
                            <router-link
                                class="routerLink"
                                :to="{
                                    name: 'createajioParams',
                                    params: { idx: this.name },
                                }"
                            >
                                Create a Jio
                            </router-link>
                        </button>
                    </div>
                    <div id="event-card-buttons" class="col-lg-2 col-4 my-auto">
                        <button type="button" class="btn btn-primary col-12">
                            Join a Jio
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    </div>

    <div v-else>
        <div>
            <div class="row">
                <div class="col-11 col-sm-10 col-md-8 col-lg-6 mx-auto">
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
                            <p
                                class="col-12 col-md-6 text-center placeholder-glow"
                            >
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

    <!-- <div id="event-card-buttons" class="text-center row mt-3">

<div class="col-12 col-md-4 mx-auto">
  <a :href="routeLink" target="_blank" id="event-route" class="col-12">
      <span id="howToGetThere">Directions</span>  
  </a>
</div>
<div class="col-12 col-md-4 mx-auto">
  <button type="button" class="btn btn-primary col-12">
      <router-link class="routerLink" :to="{ name:'createajioParams', params:{idx: this.name}}"> 
        Create a Jio
      </router-link>
    </button>
    

  
</div>
<div class="col-12 col-md-4 mx-auto">
  <button type="button" class="btn btn-primary col-12">
      Join a Jio
    </button>
</div>
</div> -->
</template>

<script>
import sourceData from "../data.json";
import axios from "axios";
import { variableDeclarator } from "@babel/types";
// import { getIdToken } from '@firebase/auth';

export default {
    name: "EventsButton",
    title: "BOJIO - Event Details",
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
            ownLat: "",
            ownLng: "",
            routeLink: "",
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
                    this.ownLat = position.coords.latitude;
                    this.ownLng = position.coords.longitude;
                    console.log(this.ownLat, this.ownLng);
                },
                (error) => {
                    console.log(error.message);
                }
            );
        },

        calculateAndDisplayRoute(
            directionsService,
            directionsDisplay
            // start,
            // destination
        ) {
            // var refWaypoints = this.waypts;
            var refWaypoints = [];

            var start = this.ownLoc;
            var end = this.center;

            // for (var i=1;i<this.places.length-1;i++) {
            //   refWaypoints.push({
            //     location: this.places[i],
            //     stopover: true,
            //   });
            // }
            console.log(refWaypoints);
            console.log("start: " + start);
            console.log("end: " + end);
            directionsService.route(
                {
                    origin: start,
                    destination: end,
                    waypoints: refWaypoints,
                    travelMode: "DRIVING",
                    optimizeWaypoints: true,
                },
                function (response, status) {
                    if (status === "OK") {
                        directionsDisplay.setDirections(response);
                    } else {
                        window.alert(
                            "Directions request failed due to " + status
                        );
                    }
                }
            );
        },

        loadMap() {
            var directionsService = new window.google.maps.DirectionsService();
            var directionsDisplay = new window.google.maps.DirectionsRenderer();
            directionsDisplay.setMap(this.$refs.map.$mapObject);
            this.calculateAndDisplayRoute(
                directionsService,
                directionsDisplay
                // this.places[0],
                // this.places[1]
            );
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
                (time[0] >= 12 &&
                    (time[0] - 12 || 12) + ":" + time[1] + " PM") ||
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

        checkDOM() {
            console.log(document.getElementsByTagName("div")[10]);
            console.log(document.getElementById("event-banner-card-body"));
        },
    },
    filters: {
        shorttext(value, limit) {
            if (value) {
                return value.substring(0, limit);
            }            
        }
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
    },

    created() {
        this.ownLoc;
        this.userLocation();
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
                            (this.latitude = parseFloat(
                                response.data.latitude
                            )),
                            (this.longitude = parseFloat(
                                response.data.longitude
                            )),
                            console.log(this.longitude),
                            this.userLocation(),
                            (this.routeLink =
                                "https://www.google.com/maps/dir/" +
                                this.ownLat +
                                "," +
                                this.ownLng +
                                "/" +
                                this.latitude +
                                "," +
                                this.longitude)
                        )
                    ),
                    axios
                        .get(this.descriptionURL)
                        .then(
                            (response) =>
                                (this.description = response.data.description)
                        ),
                    axios
                        .get(this.organizerURL)
                        .then(
                            (response) =>
                                (this.organizerName = response.data.name)
                        );
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => setTimeout(this.setLoading, 500));
    },

    mounted() {
        this.checkDOM();
    },
};
</script>
