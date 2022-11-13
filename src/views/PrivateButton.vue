<template>
    <div class="container">
        <div class="row">
            <div class="col-6 d-flex justify-content-center mt-5">
                <input type="textbox" v-model="searchedname" class="form-control rounded-pill"
                    id="exampleFormControlInput1" placeholder="Search..." @keyup="search()"
                    @keyup.delete="deletesearch()" />
            </div>
            <div class="col d-flex justify-content-center mt-5">
                <!-- selected: {{ selectedcategory }} -->
                <select class="form-select" v-model="selectedcategory" @click="filter">
                    <option disabled value="">Categories</option>
                    <option v-for="value in categories" :key="value">
                        {{ value }}
                    </option>
                </select>
            </div>
        </div>
    </div>

    <div v-if="uid.length <= 1" class="container text-center">
        <!-- <Modal v-if="showmodal" v-on:closepopup="close()" ></Modal> -->
        <div class="row" style="height: 400px; font-family: worksans-extrabold;">
            <div class="col my-auto">
                <h1><i class="bi bi-stars orange-icon"></i></h1>
                Please
            <span class="privateJio">
                <router-link to="/login">login</router-link>
            </span>
            or
            <span class="privateJio">
                <router-link to="/signup">sign up</router-link>
            </span>
            to view private jios
            </div>
        </div>
        <!-- style="font-size: 4vmin; font-family: worksans-medium;"> -->
    </div>

    <div v-else>
        <div id="event-container" class="container mt-5" style="font-family: worksans-medium">
            <div class="row" id="app">
                <div v-if="!hasfriends">
                    <div class="row" style="height: 400px;">
                        <div class="col text-center my-auto" style="font-family: worksans-extrabold;">
                            <h1><i class="bi bi-person-add orange-icon"></i></h1>
                            <div>You haven't added anyone to your friend's list!</div>
                        </div>
                    </div>
                </div>
                <div v-else-if="Object.keys(privateevents).length == 0">
                    
                    <div class="row" style="height: 400px;">
                        <div class="col text-center my-auto" style="font-family: worksans-extrabold;">
                            <h1><i class="bi bi-card-heading orange-icon"></i></h1>
                            <div>
                                It appears your friends has not created any jios. Why don't you create a jio?
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else>
                    <div
                        class="row"
                        v-if=" selectedcategory == '' || selectedcategory == 'All'">
                        <div class="col-lg-4 col-md-6 mb-5" v-for="(event, index) in privateevents" :key="index">
                            <router-link @click="scrollToTop" style="text-decoration: none; color: inherit" :to="{ name: 'eachjioevent', params: { idx: index },}">
                                <div class="card event-card" style="width:auto; height:500px;">
                                    <div v-if="event.image == 'no-image'" class="crop">
                                        <img class="card-img-top fixed-img-size"
                                        src="../../public/Images/default-event-picture.jpg"
                                        style="max-height: 200px; width: 100%;" />
                                    </div>
                                    <div v-else class="crop">
                                        <img class="card-img-top fixed-img-size" :src="event.imageUrl" alt="card image collar" style="min-height: 200px; width: 100%"/>
                                    </div>
                                    <div class="card-body" style="width: auto">
                                        <div class="card-title pt-1 eventTitle">
                                            {{ event.eventname }}
                                        </div>
                                        <div class="card-text">
                                            <div class="eventCreator" style="margin-right: 10px">
                                                <i class="bi bi-person-circle" style="margin-right: 10px"></i>{{ event.username }}
                                            </div>
                                            <div class="eventDate mt-2">
                                                <i class="bi bi-calendar2-week-fill" style="margin-right: 10px"></i>{{convertDate(event.date.split("T")[0])}}, {{convert24(event.date.split("T")[1])}}
                                            </div>
                                            <div class="eventVenue mt-2">
                                                <i class="bi bi-geo-alt-fill" style="margin-right: 10px"></i>{{event.activities[0].location}}
                                            </div>
                                            <div class="tagContainer mt-3">
                                                <div class="badge text-bg-secondary">
                                                    {{ event.category }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>

                    <div v-else>
                        <div class="row" v-if="Object.keys(filterevents).length > 0">
                            <div class="col-lg-4 col-md-6 mb-5" v-for="(event, index) in filterevents" :key="index">
                                <router-link @click="scrollToTop" style=" text-decoration: none; color: inherit;" :to="{name: 'eachjioevent', params: { idx: index },}">
                                    <div class="card event-card" style="width: auto; height:500px">
                                        <div v-if="event.image == 'no-image'" class="crop">
                                            <img class="card-img-top fixed-img-size"
                                            src="../../public/Images/default-event-picture.jpg"
                                            style="max-height: 200px; width: 100%;" />
                                        </div>
                                        <div v-else class="crop">
                                            <img class="card-img-top fixed-img-size" :src="event.imageUrl" alt="card image collar" style="min-height: 200px; width: 100%"/>
                                        </div>
                                        <div class="card-body" style="width: auto">
                                            <div class="card-title pt-1 eventTitle">
                                                {{ event.eventname }}
                                            </div>
                                            <div class="card-text">
                                                <div class="eventCreator" style="margin-right: 10px">
                                                    <i class="bi bi-person-circle" style="margin-right: 10px;"></i>{{ event.username }}
                                                </div>
                                                <div class="eventDate mt-2">
                                                    <i class="bi bi-calendar2-week-fill" style="margin-right: 10px;"></i>{{convertDate(event.date.split("T")[0])}}, {{convert24(event.date.split("T")[1])}}
                                                </div>
                                                <div class="eventVenue mt-2">
                                                    <i class="bi bi-geo-alt-fill" style="margin-right: 10px;"></i>{{event.activities[0].location}}
                                                </div>
                                                <div class="tagContainer mt-3">
                                                    <div class="badge text-bg-secondary">
                                                        {{ event.category }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                        <div v-else>
                            <div class="container">
                                <div class="row" style="height: 400px;">
                                    <div class="col text-center my-auto" style="font-family: worksans-extrabold;">
                                        <h1><i class="bi bi-search orange-icon"></i></h1>
                                        <div>Sorry! No events found.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end of display event  -->
            </div>
            <!-- <button id='view-more' class="btn mb-3" @click="loadMore" style="box-shadow: 0px 0px 14px -7px #f09819" >Load</button> -->
        </div>
    </div>
</template>

<script>
import { onMounted } from "vue";
import {
    getprivate,
    snapshotToArray,
    getusername,
    displayfriends,
} from "../utils/index.js";
// import Modal from './Modal.vue'
import { ref } from "vue";

export default {
    name: "PrivateButton",

    data() {
        return {
            selectedcategory: "",
            privateevents: {},
            length: 1,
            uid: localStorage.getItem("uid"),
            myfriends: [],
            hasfriends: false,
            categories: [
                "All",
                "Business and Industry",
                "Education",
                "Entertainment",
                "Fitness and Wellness",
                "Food and Drinks",
                "Hobbies and Activities",
                "Shopping and Fashion",
                "Sports and Outdoor Activities",
                "Others",
            ],
            allevents: "",
            filterobj: {},
            temparray: [],
            searchobj: {},
            searchedname: '',
            usesearch: false,
            usefilter: false,
            latestobj: {}
        };
    },

    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        },
        filter() {
            var category = this.selectedcategory;
            var tempobj = {};
            if(!this.usesearch){
                const events = this.privateevents;
                for (const event in events) {
                console.log(event);
                const eventcat = events[event]["category"];
                if (eventcat == category) {
                    tempobj[event] = events[event];
                }
                }
                this.filterobj = tempobj;
                console.log(tempobj);
                
            }else{
                //get searcharray
                const events = this.searchobj
                for (const event in events) {
                console.log(event);
                const eventcat = events[event]["category"];
                if (eventcat == category) {
                    tempobj[event] = events[event];
                }
                }
                this.filterobj = tempobj;
                console.log(tempobj);

                this.latestobj = tempobj

            }
    
        },
        
        search() {
    
    console.log("start of search func");
    var search = this.searchedname;
    if (search.length > 0) {
        this.usesearch = true;
    } else {
        this.usesearch = false;
    }
    console.log(search);
    var allevents = this.publicevents;
    //its an object

    //dont replace this.events , shd create a new search array
    var tempobj = {};
    console.log(allevents);
    for (const event in allevents) {
        //event is my key
        console.log(allevents[event]);
        const eventname = allevents[event]['eventname'].toLowerCase();
        console.log(eventname);
        console.log(search);
        if (eventname.includes(search.toLowerCase())) {
            tempobj[event] = allevents[event]
        }
    }
    this.searchobj = tempobj
    console.log(tempobj);

    console.log("end of search func");
},

deletesearch() {
    console.log("in delete search");
    var search = this.searchedname;

    if (search != "") {
        console.log("in delete, use search");

        var allevents = this.publicevents
        var tempobj = {};

        for (const event in allevents) {
            console.log(event);
            const eventname = allevents[event]["name"].toLowerCase();
            // console.log(eventname);
            if (eventname.includes(search.toLowerCase())) {
                // tempobj.push(event);
            tempobj[event] = allevents[event]
            }
        }
        this.searchobj = tempobj

        // this.searcharray = temparray;
    }
},
        loadMore() {
            console.log(this.privateevents);
            if (this.length >= this.privateevents.length) {
                return;
            }
            this.length = this.length + 1;
            console.log(this.length);
        },
        convert24(time) {
            console.log(time);
            time = time.split(":");
            return (
                (time[0] >= 12 &&
                    (time[0] - 12 || 12) + ":" + time[1] + " PM") ||
                (Number(time[0]) || 12) + ":" + time[1] + " AM"
            );
        },

        convertDate(fullDate) {
            console.log(fullDate);
            fullDate = fullDate.split("-");
            var months = [
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
            var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            var eventD = new Date(fullDate);
            const date = eventD.getDay();
            return (
                days[date] +
                ", " +
                months[parseInt(fullDate[1], 10)] +
                " " +
                fullDate[2]
            );
        },
        close() {
            console.log("this clicked");
            // this.modalVisible = false
            // this.showmodal = false
        },
    },
    computed: {
        eventsloaded() {
            if(this.usesearch){
                return this.searchobj
            }
            return this.privateevents;
        },

        filterevents() {
            // this.allevents = this.filterarray
            if (this.usesearch && this.filterarray) {
                // if use search, take searcharray
                this.filter();
                console.log(this.latestobj);
                return this.latestobj;
            }else{
            this.filter();
            console.log(this.filterobj);
            }
            return this.filterobj;
        },
    },

    created() {
        var friendsjios = {};
        // var count = 0
        // var friendsuids = []
        // var myfriends = this.myfriends
        // console.log(myfriends);
        // get my friends out first
        displayfriends().then((value) => {
            this.hasfriends = true;

            const myfriends = Object.keys(value);
            console.log(myfriends);

            // console.log(value);
            // for (let personuid in value) {
            //   console.log(' in priv button my fren is ' + personuid);
            //   friendsuids.push(personuid)
            // }
            // getusername(personuid).then((value) => {

            // let username = value
            // myfriends.push(username)

            //then i check if the these friends got any private events created

            getprivate()
                .then((value) => {
                    // value will get an object with keys thats the event unique id
                    const keys = Object.keys(value);
                    // console.log(keys);
                    console.log(value);
                    // keys is a list with the event unique ids
                    for (let i in value) {
                        let data = value[i];
                        // console.log(i);
                        let userid = data.userid;
                        // console.log(userid);
                        console.log(myfriends);
                        let myuid = localStorage.getItem('uid')
                        if (myfriends.includes(userid)) {
                            console.log(userid + "is my friend");
                            //then want to get event details
                            friendsjios[i] = data;
                            //cnot use count, must use i so can access eventid aft tat
                            // count ++;
                        }

                        if (userid == myuid) {
                            friendsjios[i] = data;
                        }

                        

                        // let individual_username = data.username
                        // console.log(individual_username);
                        // console.log(myfriends);
                        //my friends is array of usernames

                        // if current person is my friend and i has not add the activity in
                        // if((myfriends.includes(individual_username)) && !(Object.prototype.hasOwnProperty.call(friendsjios,data)) ){
                        //   console.log(individual_username);
                        //   friendsjios[i] = data
                        //   console.log(friendsjios);
                        // }
                    }
                    console.log(friendsjios);
                    this.privateevents = friendsjios;
                    this.myfriends = myfriends;
                })
                .catch((message) => {
                    console.log("error");
                });

            // })
        });
    },
};
</script>
