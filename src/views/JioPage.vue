<template>
    <div class="container">
        <div class="row d-flex justify-content-center align-items-center">
            <img id="goToTop" v-if="event.image == 'no-image'" src="/public/Images/default-event-picture.jpg" class="event-banner-card-image" />
            <img v-else id="goToTop" class="event-banner-card-image" :src="event.imageUrl"/>
        </div>
    </div>

    <div class="container">
        <div class="event-header-details text-center">
            {{ event.eventname }}
        </div>

        <div class="row mx-auto mt-4">
            <div
                class="col-12 col-xl-6 order-xl-first order-last"
                style="font-size: 15px; background-color: "
            >
                <div class="card public-about-container p-4 mb-3">
                    <div>
                        <div class="public-header mb-2">About</div>
                        <div class="public-text">
                            "{{ event.activities[0].description }}"
                        </div>
                    </div>
                    <!-- creator -->
                    <div class="my-3">
                        <div class="public-header mb-1">Creator</div>
                        <div>
                            <router-link
                                class="routerLink"
                                :to="{
                                    name: 'individual profile',
                                    params: { idx: event.userid },
                                }"
                            >
                                <div
                                    class="card border-0 friend-bar ps-3"
                                    style="width: 13rem; height: 3.5rem"
                                >
                                    <div class="row">
                                        <div class="col-3 p-2">
                                            <div class="rounded-circle text-center" style="padding: 3px 6px; font-size: 20px; background: linear-gradient(90deg, #ef4136, #fbb040); color: white;">
                                                <span>{{event.username[0].toUpperCase()}}</span>
                                            </div>
                                        </div>
                                        <div class="col-9 my-auto p-0">
                                            <span
                                                class="float-start p-0"
                                                style="
                                                    color: black;
                                                    font-size: 15px;
                                                "
                                                >{{ event.username }}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                    <div class="my-3">
                        <div class="public-header">Category</div>
                        <div class="public-text">{{ event.category }}</div>
                    </div>
                    <!-- participants -->
                    <div class="my-3">
                        <span class="public-header">
                            Participants ({{ peoplegoing.length }})  
                        </span>
                        <div
                            v-for="(username, userid) in getnames"
                            :key="userid"
                            class="my-2"
                        >
                            <router-link
                                class="routerLink"
                                :to="{
                                    name: 'individual profile',
                                    params: { idx: userid },
                                }"
                            >
                                <div class="card border-0 friend-bar ps-3" style="width: 13rem; height: 3.5rem">
                                    <div class="row">
                                        <div class="col-3 p-2">
                                            <div class="rounded-circle text-center" style="padding: 3px 6px; font-size: 20px; background: linear-gradient(90deg, #ef4136, #fbb040); color: white;">
                                                <span>{{username[0].toUpperCase()}}</span>
                                            </div>
                                        </div>
                                        <div class="col-9 my-auto p-0">
                                            <span class="float-start p-0" style="color: black; font-size: 15px;">{{ username }}</span>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>

                    <div class="my-3">
                        <div class="public-header">Activities</div>
                        <div
                            class="my-2"
                            v-for="(act, index) in event.activities"
                            :key="index">
                            <div class="row">
                                <div
                                    class="card border-0 public-activity-bar ps-3"
                                    style="width: 25rem; height: 5rem">
                                    <div class="row my-auto">
                                        <div class="col-2 my-auto">
                                            <div
                                                id="activities-index"
                                                class="rounded-circle text-center"
                                                style="padding: 5px 5px; font-size: 20px; background: linear-gradient(90deg, #ac72ff, #23d2ff); color: white;">
                                                <span>{{ index+1 }}</span>
                                            </div>
                                        </div>
                                        <div class="col-10 my-auto p-0">
                                            <div
                                                class="row"
                                                id="activities-details"
                                            >
                                                <div
                                                    style="
                                                        font-family: worksans-semibold;
                                                    "
                                                >
                                                    {{ act.name }}
                                                </div>
                                                <div
                                                    style="
                                                        font-size: 0.9rem;
                                                        color: grey;
                                                    "
                                                >
                                                    {{ act.location }}
                                                </div>
                                                <div
                                                    style="
                                                        font-size: 0.9rem;
                                                        color: grey;
                                                    "
                                                >
                                                    {{ act.duration }} minutes
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <div class="row mx-auto">
        <div class="">
            <div class="public-header">Activities</div>
            <div v-for="act , index in event.activities" :key="index" class="my-2">
                <div class="card border-0 public-activity-bar p-2 ps-4 mx-auto" style="width: 90%; padding:20px;">
                    <div class="row my-auto">
                        <div class="col-2 my-auto">
                            <div class="rounded-circle" style="padding:7px 15px; font-size:25px; background: linear-gradient(90deg, #ac72ff, #23d2ff); color:white;">
                            <span class="d-flex justify-content-center">{{index+1}}</span>
                            </div>
                        </div>
            
                        <div class="col-10 my-auto">
            
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
    </div> -->

                <div class="row">
                    <div class="col-6 w-100">
                        <div
                            class=""
                            v-if="
                                creatorid == myuid ||
                                peoplegoing.includes(myuid)
                            "
                        >
                            <div class="view chat">
                                <header>
                                    <h1>Welcome, {{ state.username }}</h1>
                                </header>

            
                                <div class="chat-box">
                                    <div
                                        class=""
                                        v-for="message in allmessages"
                                        :key="message.key"
                                        :class="
                                            message.username == state.username
                                                ? 'message current-user'
                                                : 'message'
                                        "
                                    >
                                
                                        <div class="message-inner">
                                            <div class="username">
                                                {{ message.username }}
                                            </div>
                                            <div class="content">
                                                {{ message.content }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <footer>
                                    <form @submit.prevent="SendMessage">
                                        <input
                                            type="text"
                                            v-model="inputMessage"
                                            placeholder="Write a message..."
                                        />
                                        <input type="submit" value="Send" />
                                    </form>
                                </footer>
                            </div>
                        </div>
                    </div>
                    <div class="col-6"></div>
                </div>
            </div>
            <!-- map -->
            
            <div
                class="col-12 col-xl-6 order-xl-last order-first"
                style="position: relative"
                id=""
            >
                <div
                    class="container border card p-4 public-map-container mb-5"
                >
                    <div class="row mb-3">
                        <div class="public-header">Details</div>
                        <div class="mt-2 public-text'">
                            <i
                                class="bi bi-calendar2-week-fill eventDate"
                                style="margin-right: 10px"
                            ></i
                            >{{ displayDate() }}, {{ convertTime() }}
                        </div>
                        <div class="mt-2 public-text'">
                            <i
                                class="bi bi-geo-alt-fill eventDate"
                                style="margin-right: 10px"
                            ></i
                            >{{ getVenue() }}
                        </div>
                    </div>
                    <!-- {{eventId}} -->
                    
                    
                    <div class="col text-center">
                        <GMapMap
                            :center="center"
                            :zoom="12"
                            map-type-id="roadmap"
                            style="width: 85; height: 40vmin"
                            :options="options"
                            ref="map"
                        >
                            <!-- <GMapMarker
      :key="marker.id"
      v-for="marker in markers"
      :position="marker.position"
    /> -->
                        </GMapMap>
                    </div>

                    <!-- <div id="event-card-buttons" class="text-center row mt-3">

    <div class="col-12 col-md-6 mx-auto">
    <a :href="routeLink" target="_blank" id="event-route" class="col-12">
        <span id="howToGetThere">How To Get There</span>  
    </a>
    </div>
    <div class="col-12 col-md-6 mx-auto">
        <div v-if="myuid == event.userid">
            
            <button type="button" class="btn btn-primary col-12" @click="deleteJio(eventId); ">
                <router-link to="/" style="text-decoration:none">Delete this jio</router-link>
            </button>
            
        </div>
        <div v-else-if="peoplegoing.includes(myuid)">
            <button style="background-image: none; background-color:rgba(220,53,69,255); border:none;" type="button" class="btn btn-primary col-12" @click="leaveJio(myuid)">
                Leave this event
            </button>
        </div>
        <div v-else-if="peoplegoing.length == event.maxnumber">
            <button type="button" class="btn btn-primary col-12" disabled>
                No slots left
            </button>
        </div>
        <div v-else>
            <button type="button" class="btn btn-primary col-12" @click="joinjio(event.userid)">
                Join Jio +
            </button>
        </div>
    </div>
</div> -->
                </div>
            </div>
        </div>
    </div>

    <footer class="main-footer">
        <div class="container">
            <div id="footer-row" class="row py-4 px-4 z-10 w-100">
                <div class="col-lg-5 col-md-3 col-3 d-none d-lg-inline">
                    <div class="container">
                        <div class="row">
                            {{ displayDate().toUpperCase() }},
                            {{ convertTime() }}
                        </div>
                        <div class="row" style="font-family: worksans-semibold">
                            {{ event.eventname }}
                        </div>
                    </div>
                </div>
                <div
                    class="col-lg-2 col-md-5 col-3 my-auto"
                    id="remaining-slots"
                >
                    {{ getRemainingSlots }} slots left
                </div>
                <div class="col-lg-2 col-md-3 col-4 mx-auto">
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
                <div
                    class="col-lg-3 col-md-4 col-5 mx-auto float-end"
                    id="event-card-buttons"
                >
                    <div v-if="myuid == event.userid">
                        <button
                            type="button"
                            class="btn btn-primary col-12"
                            @click="deleteJio(eventId)"
                        >
                            <router-link to="/" style="text-decoration: none"
                                ><i class="bi bi-x-lg"></i> Delete this
                                jio</router-link
                            >
                        </button>
                    </div>
                    <div v-else-if="pplgoing.includes(myuid)">
                        <button
                            style="
                                background-image: none;
                                background-color: rgba(220, 53, 69, 255);
                                border: none;
                            "
                            type="button"
                            class="btn btn-primary col-12"
                            @click="leaveJio(myuid)"
                        >
                            Leave this event
                        </button>
                    </div>
                    <div v-else-if="peoplegoing.length == event.maxnumber">
                        <button
                            type="button"
                            class="btn btn-primary col-12"
                            disabled
                        >
                            <i class="bi bi-lock"></i> No slots left
                        </button>
                    </div>
                    <div v-else>
                        <button
                            type="button"
                            class="btn btn-primary col-12"
                            @click="joinjio(event.userid)"
                        >
                            Join Jio +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <!-- {{peoplegoing}}
{{myuid}} -->
</template>

<script>
import {
    getusers,
    getprivate,
    getpublic,
    getjiodetails,
    createjiolist,
    replacejiolist,
    displaypplgoing,
    createMessage,
    getmessage,
getusername,
} from "../utils/index.js";
import { reactive, onMounted, ref, getCurrentInstance, computed } from "vue";
import { deleteprivatejio, deletepublicjio, leavejio, removemsgs } from "../utils/index";
import { thisExpression } from "@babel/types";

var directionsDisplay;
var directionsService;

export default {
    name: "jio details for both public and private",

    data() {
        return {
            eventId: "",
            event: "",
            errormsg: "",
            creatorid: "",
            peoplegoing: "",
            allusers: "",
            names: "",
            myuid: "",
            ownLat: "",
            ownLng: "",
            routeLink: "",
            locations: [],
            center: { lat: 1.3421, lng: 103.8198 },
            options: {
                zoomControl: false,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
                styles: [],
            },
            state: {
                username: "",
                messages: [],
            },
            inputMessage: "",
            allthemessages:[],
        };
    },

    methods: {

        // removemsg(){
        //     removemsgs()
        // },
        calculateAndDisplayRoute(
            directionsService,
            directionsDisplay
            // start,
            // destination
        ) {
            // var refWaypoints = this.waypts;
            var refWaypoints = [];

            var start = this.locations[0];
            var end = this.locations[this.locations.length - 1];

            for (var i = 1; i < this.locations.length - 1; i++) {
                refWaypoints.push({
                    location: this.locations[i],
                    stopover: true,
                });
            }

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

        showRoute() {
            if (directionsDisplay != null) {
                directionsDisplay.setMap(null);
                directionsDisplay = null;
            }
            directionsService = new window.google.maps.DirectionsService();
            directionsDisplay = new window.google.maps.DirectionsRenderer();
            directionsDisplay.setMap(this.$refs.map.$mapObject);

            if (this.locations.length >= 1) {
                this.calculateAndDisplayRoute(
                    directionsService,
                    directionsDisplay
                    // this.places[0],
                    // this.places[1]
                );
                // console.log(typeof(this.markers[0]))
            }
        },

        getId() {
            this.eventId = this.$route.params.idx;
            var eventId = this.$route.params.idx;
        },

        joinjio(creatorid) {
            //check if key is empty, if empty then use create jiolist
            //aft tat both will call func to get the value with key=peoplegoing
            //var array = value
            // array.push(myown uid)
            //call another function to put array as the new value

            var myuid = localStorage.getItem("uid");

            var pplgoing = [];

            getjiodetails(creatorid, this.eventId)
                .then((value) => {
                    //means theres alr people going
                    console.log(creatorid);
                    console.log(this.eventId);
                    console.log(value);

                    if (myuid != creatorid) {
                        console.log("i am not the creator but i wan to join");
                        //enter here when empty is not returned from the promise
                        //and im not the creator
                        getjiodetails(creatorid, this.eventId)
                            .then((value) => {
                                //means theres alr people going cuz not empty
                                // console.log(creatorid);
                                // console.log(this.eventId);
                                // console.log(value);
                                pplgoing = value;
                                //replace this 10 with maxlimit
                                if (pplgoing.length >= this.event.maxnumber) {
                                    this.errormsg = "hit the max sorry!";
                                } else if (
                                    pplgoing.length >= 1 &&
                                    pplgoing.includes(myuid)
                                ) {
                                    console.log(" u alr inside ");
                                    this.errormsg = "u alr in the party";
                                } else {
                                    console.log("going to add u");
                                    console.log(pplgoing);
                                    console.log(myuid);
                                    var uid = localStorage.getItem("uid");
                                    pplgoing.push(uid);
                                    replacejiolist(
                                        creatorid,
                                        this.eventId,
                                        pplgoing
                                    );
                                    this.peoplegoing = pplgoing;
                                }
                            })
                            .catch((value) => {
                                console.log(value);
                            });
                    } else {
                        console.log(
                            "i wont add to the key and wont add to peoplegoing array"
                        );
                    }
                })
                .catch((value) => {
                    console.log(value);
                    // i wan to check if the creator is me if yes then idw to add
                    if (value == "empty" && myuid != creatorid) {
                        //then i js add this person in
                        createjiolist(creatorid, this.eventId).then((value) => {
                            // js continue;
                            // create list w my uid if no one has joined
                            console.log('current list is empty, i add myself in');
                            //now confirm peoplegoing got some value, ill put this as pplgoing
                            getjiodetails(creatorid, this.eventId)
                                .then((value) => {
                                    //means theres alr people going

                                    //this will give the current array of ppl going
                                    this.peoplegoing = value
                                    pplgoing = value;
                                    //replace this 10 with maxlimit
                                    if (
                                        pplgoing.length >= this.event.maxnumber
                                    ) {
                                        this.errormsg = "hit the max sorry!";
                                    } else if (
                                        pplgoing.length > 1 &&
                                        pplgoing.includes(myuid)
                                    ) {
                                        // means i alr prev joined before
                                        // need to be more than 1 because if prev no one inside then length is alr 1
                                        console.log(
                                            " just added u in so array length 1 if js added so need > 1"
                                        );
                                        this.errormsg = "u alr in the party";
                                    } 
                                    // else if (!pplgoing.includes(myuid)) {
                                    //     // in else statement:
                                    //     // ppl going is 1 n its me
                                    //     //means i hvn push the person in so here push

                                    //     // console.log('added');
                                    //     var uid = localStorage.getItem("uid");
                                    //     pplgoing.push(uid);
                                    //     replacejiolist(
                                    //         creatorid,
                                    //         this.eventId,
                                    //         pplgoing
                                    //     );
                                    //     this.peoplegoing = pplgoing;
                                    //     //here means can push person in
                                    // }
                                })
                                .catch((value) => {
                                    console.log(value);
                                });
                        });
                    }
                });
        },

        leaveJio(myuid) {
            var index = this.peoplegoing.indexOf(myuid);
            this.peoplegoing.splice(index, 1);
            var creatorid=this.event.userid
            var eventId=this.eventId
            console.log(index),
            console.log(creatorid),
            console.log(eventId),
            leavejio(creatorid,eventId,index);

        },


        displayDate() {
            const eventDate = this.event.date.split("T")[0];
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
            return (
                days[date] +
                ", " +
                months[parseInt(fullDate[1])] +
                " " +
                fullDate[2]
            );
        },

        convertTime() {
            let time = this.event.date.split("T")[1];
            time = time.split(":");
            return (
                (time[0] >= 12 &&
                    (time[0] - 12 || 12) + ":" + time[1] + " PM") ||
                (Number(time[0]) || 12) + ":" + time[1] + " AM"
            );
        },

        getVenue() {
            return this.event.activities[0].location;
        },

        userLocation() {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.ownLat = position.coords.latitude;
                    this.ownLng = position.coords.longitude;
                    this.routeLink += this.ownLat + "," + this.ownLng + "/";
                },
                (error) => {
                    console.log(error.message);
                }
            );
        },
        allLocations() {
            console.log(this.event);
            for (var i = 0; i < this.event.activities.length; i++) {
                this.locations.push(this.event.activities[i].location);
            }
            return this.locations;
        },
        SendMessage() {
            if (this.inputMessage === "" || this.inputMessage === null) {
                return;
            }

            const message = {
                username: this.state.username,
                content: this.inputMessage,
            };

            createMessage(this.eventId, message);
            console.log("sendMessage function, finish create message");
            this.inputMessage = "";
            //js add on message
            this.allthemessages.push(message)
            // this.getupdatedmessage()
        },

        getupdatedmessage() {
            console.log('in get updates message method');
            var messages = [];
            getmessage(this.eventId).then((value) =>
                Object.keys(value).forEach((key) => {
                    messages.push({
                        id: key,
                        username: value[key].username,
                        content: value[key].content,
                    });
                })
            );
            console.log(" finish get message ");

            console.log(messages);
            this.state.messages = messages;
            console.log('finish get updated message method');
        },
        deleteJio(eventId) {
            let userid = this.event.userid;

            if (this.event.type == "public") {
                deletepublicjio(eventId, userid);
            } else {
                deleteprivatejio(eventId, userid);
            }
        },
    },

    computed: {
        getRemainingSlots() {
            return this.event.maxnumber - this.peoplegoing.length;
        },
        eventloaded() {
            return this.event;
        },

        numberofppl() {
            console.log('numberofppl computed');
            return this.peoplegoing.length;
        },

        pplgoing(){
            console.log('ppl going computed');
            return this.peoplegoing
        },

        allmessages() {
            this.getupdatedmessage();

            console.log('allmessages computed');
            console.log(this.state.messages);
            return this.allthemessages;
        },

        getnames() {
            
            var uidarray = this.peoplegoing;

            // find usernames of the users
            const allusers = this.allusers;
            //object with userid as keys

            console.log("in get names");
            console.log(allusers);
            var usernames = {};
            for (const user in allusers) {
                //user is the key
                if (uidarray.includes(user)) {
                    const username = allusers[user]["username"];
                    usernames[user] = username;
                }
            }

            console.log('username here');
            console.log(usernames);
            return usernames
            // this.names = usernames;
            // console.log(this.names);
        },
    },
    // tempRoute(){
    //     var ans=""
    //     navigator.geolocation.getCurrentPosition(

    //         (position) => {
    //         this.ownLat=position.coords.latitude;
    //         this.ownLng=position.coords.longitude;
    //         ans= 'https://www.google.com/maps/dir/'+this.ownLat+","+this.ownLng+"/"

    //         console.log(ans)
    //         this.routeLink = ans
    //         return ans
    //         },
    //         (error) => {
    //         ans= error.message;
    //         },
    //         // console.log(ans)

    //     );
    //     return ''
    // }

    created() {
  
        var myuid = localStorage.getItem("uid");
        this.myuid = myuid;
        getusername(myuid).then((value)=>{
    
            this.state.username = value
        })


        this.getId();
        //get public events
        getusers()
            .then((value) => {
                this.allusers = value;
            })
            .then((value) => console.log("finish loading")),
            getpublic()
                .then((value) => {
                    const publickeys = Object.keys(value);
                    var ans = "";

                    if (publickeys.includes(this.eventId)) {
                        console.log("in get public");
                        this.event = value[this.eventId];
                        // console.log(this.event)
                        /////start

                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                this.ownLat = position.coords.latitude;
                                this.ownLng = position.coords.longitude;
                                ans =
                                    "https://www.google.com/maps/dir/" +
                                    this.ownLat +
                                    "," +
                                    this.ownLng +
                                    "/";

                                this.routeLink = ans;

                                this.allLocations();
                                console.log(this.routeLink);
                                // console.log(this.locations)
                                for (var loc of this.locations) {
                                    this.routeLink += loc + "/";
                                    console.log(this.routeLink);
                                }
                                this.showRoute();
                            },
                            (error) => {
                                ans = error.message;
                            }
                        );

                        ///end
                    }

                    this.creatorid = this.event.userid;

                    displaypplgoing(this.creatorid, this.eventId).then(
                        (value) => {
                            this.peoplegoing = value;
                            // this.getnames();
                        }
                    );
                })
                .catch((message) => {
                    console.log(message);
                    console.log("error");
                });

        //get private events
        getprivate().then((value) => {
            const privatekeys = Object.keys(value);
            var ans = "";
            if (privatekeys.includes(this.eventId)) {
                this.event = value[this.eventId];
                console.log(this.event);
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.ownLat = position.coords.latitude;
                        this.ownLng = position.coords.longitude;
                        ans =
                            "https://www.google.com/maps/dir/" +
                            this.ownLat +
                            "," +
                            this.ownLng +
                            "/";

                        this.routeLink = ans;

                        this.allLocations();
                        console.log(this.routeLink);
                        // console.log(this.locations)
                        for (var loc of this.locations) {
                            this.routeLink += loc + "/";
                            console.log(this.routeLink);
                        }
                        this.showRoute();
                    },
                    (error) => {
                        ans = error.message;
                    }
                );

                this.creatorid = this.event.userid;

                displaypplgoing(this.creatorid, this.eventId).then((value) => {
                    this.peoplegoing = value;
                    // this.getnames();
                });
            }
        });

        var messages = [];
        //to get all msg from firebase
        getmessage(this.eventId).then(
            (value) =>
                Object.keys(value).forEach((key) => {
                    messages.push({
                        id: key,
                        username: value[key].username,
                        content: value[key].content,
                    });
                }),

            (this.state.messages = messages),
            this.allthemessages = messages
        );
        console.log(this.state.messages);
        console.log("here is to display events on create");
    },
};
</script>

<style scoped>
.view {
    display: flex;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(90deg, #ef4136, #fbb040);
}

.view.chat {
    flex-direction: column;
}

.view.chat header {
    position: relative;
    display: block;
    width: 100%;
    padding: 50px 30px 10px;
    color: #fff;
}

.view.chat .chat-box {
    /* border-radius: 24px 24px 0px 0px; */
    background-color: #fff;
    box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
    flex: 1 1 100%;
    padding: 30px;
}

.view.chat .chat-box .message {
    display: flex;
    margin-bottom: 15px;
}

.view.chat .chat-box .message .message-inner .username {
    color: #888;
    font-size: 16px;
    margin-bottom: 5px;
    padding-left: 15px;
    padding-right: 15px;
}

.view.chat .chat-box .message .message-inner .content {
    display: inline-block;
    padding: 10px 20px;
    background-color: #f3f3f3;
    border-radius: 999px;
    color: #333;
    font-size: 18px;
    line-height: 1.2em;
    text-align: left;
}

.view.chat .chat-box .message.current-user {
    margin-top: 30px;
    justify-content: flex-end;
    text-align: right;
}

.view.chat .chat-box .message.current-user .message-inner {
    max-width: 75%;
}

.view.chat .chat-box .message.current-user .message-inner .content {
    color: #fff;
    font-weight: 600;
    background: linear-gradient(90deg, #ac72ff, #23d2ff);
    /* #ac72ff,#23d2ff */
}

.view.chat footer {
    /* position: sticky; */
    position: relative;
    bottom: 0px;
    height: 100px;
    background-color: #fff;
    padding: 30px;
    box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
}

.view.chat footer form {
    display: flex;
}

.view.chat footer form input[type="text"] {
    flex: 1 1 100%;
    appearance: none;
    border: none;
    outline: none;
    background: none;
    display: block;
    width: 100%;
    padding: 10px 15px;
    border-radius: 8px 0px 0px 8px;
    color: #333;
    font-size: 18px;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
    background-color: #f3f3f3;
    transition: 0.4s;
}

.view.chat footer form input[text="text"]::placeholder {
    color: #888;
    transition: 0.4s;
}

.view.chat footer form input[type="submit"] {
    appearance: none;
    border: none;
    outline: none;
    background: none;
    display: block;
    padding: 10px 15px;
    border-radius: 0px 8px 8px 0px;
    background-color: #ea526f;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
}
</style>
