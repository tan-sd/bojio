<script>
import { onMounted } from "vue";
import { getpublic, getpublic2, snapshotToArray } from "../utils/index.js";
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "vue-router";
// import VueRouter from 'vue-router'


export default {
    name: "PublicButton",
    // publicevents: getthis(),

    data() {
        return {
            publicevents: "",
            length: 1,
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
            selectedcategory: "",
            allevents: "",
            filterobj: {},
            searchobj: {},
            temparray: [],
            searchedname: '',
            usesearch: false,
            usefilter: false,
            latestobj:{}
        };
    },

    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        },

        loadMore() {
            console.log(this.publicevents);
            if (this.length >= this.publicevents.length) {
                return;
            }
            this.length = this.length + 1;
            console.log(this.length);
        },

        convert24(time) {
            // console.log(time);
            time = time.split(":");
            return (
                (time[0] >= 12 &&
                    (time[0] - 12 || 12) + ":" + time[1] + " PM") ||
                (Number(time[0]) || 12) + ":" + time[1] + " AM"
            );
        },

        convertDate(fullDate) {
            // console.log(fullDate);
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

        filter() {
            var category = this.selectedcategory;
            var tempobj = {};

           //if im using only filter function
           if(!this.usesearch){
                const events = this.publicevents;
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

        popstateEventAction() {
        // ... some action triggered when the back button is clicked
            console.log('back is clicked');
            this.$router.push('/')
            this.removePopstateEventAction();
        },
        removePopstateEventAction() {
            window.removeEventListener('popstate', this.popstateEventAction);
        }

    },

    computed: {
        eventsloaded() {
            if(this.usesearch){
                return this.searchobj
            }
            return this.publicevents;
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

        searchevents(){
            return this.searchobject
        }
    },

    created() {

        window.addEventListener('popstate', this.popstateEventAction );

        getpublic()
            .then((value) => {
                console.log("inside this");
                console.log(value);
                this.publicevents = value;
                console.log("created - " + this.publicevents);
                console.log(typeof value);
                console.log("end of .then");
            })
            .catch((message) => {
                console.log(message);
                console.log("error");
            });

    },

    mounted() {
        if (this.$route.params.idx) {
            console.log(this.$route.params.idx);
            this.searchedname = this.$route.params.idx
        }
    }
};
</script>

<style scoped>

</style>

<template>
    <div class="container">
        <div class="row">
            <div class="col-6 d-flex justify-content-center mt-5">
                <input type="textbox" v-model="searchedname" class="form-control rounded-pill"
                    id="exampleFormControlInput1" placeholder="Search..." @keyup="search()"
                    @keyup.delete="deletesearch()" />
            </div>
            <div class="col-6 d-flex justify-content-center mt-5">
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

    <!-- not using filter, just search or no search -->
    <div id="event-container" class="container mt-5" style="font-family: worksans-medium">
        <div class="row" id="app" v-if="selectedcategory == '' || selectedcategory == 'All'">
            <div class="col-lg-4 col-md-6 mb-5" v-for="(event, index) in eventsloaded" :key="index">
                <router-link @click="scrollToTop" style="text-decoration: none; color: inherit"
                    :to="{ name: 'eachjioevent', params: { idx: index } }">
                    <div class="card event-card" style="width: auto; height: 500px">
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
                                    <i class="bi bi-calendar2-week-fill"
                                        style="margin-right: 10px"></i>{{ convertDate(event.date.split("T")[0]) }}, {{
                                                convert24(event.date.split("T")[1])
                                        }}
                                </div>
                                <div class="eventVenue mt-2">
                                    <i class="bi bi-geo-alt-fill" style="margin-right: 10px"></i>{{
                                            event.activities[0].location
                                    }}
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
        <!-- C:\Users\tan_s\Downloads\Web Development\wad2-project\public\Images\wallpaper1.jpg -->

        <!-- this one already filtering -->
        <div v-else>
            <div class="row" v-if="Object.keys(filterevents).length > 0">
                <div class="col-lg-4 col-md-6 mb-5" v-for="(event, index) in filterevents" :key="index">
                    <router-link @click="scrollToTop" style="text-decoration: none; color: inherit"
                        :to="{ name: 'eachjioevent', params: { idx: index } }">
                        <div class="card event-card" style="width: auto; height: 500px">
                            <div v-if="event.image == 'no-image'" class="crop">
                                <img class="card-img-top fixed-img-size" src="../../public/Images/default-event-picture.jpg"/>
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
                                        <i class="bi bi-person-circle" style="margin-right: 10px"></i>{{ event.username
                                        }}
                                    </div>
                                    <div class="eventDate mt-2">
                                        <i class="bi bi-calendar2-week-fill"
                                            style="margin-right: 10px"></i>{{ convertDate(event.date.split("T")[0]) }},
                                        {{ convert24(event.date.split("T")[1]) }}
                                    </div>
                                    <div class="eventVenue mt-2">
                                        <i class="bi bi-geo-alt-fill" style="margin-right: 10px"></i>{{
                                                event.activities[0].location
                                        }}
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
            
            <!-- if filter and no events appear -->
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
</template>
