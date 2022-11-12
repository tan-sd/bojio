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

export default {
    name: "PublicButton",
    // publicevents: getthis(),

    data() {
        return {
            publicevents: "",
            length: 1,
            categories: [
                "Business and Industry",
                "Education",
                "Entertainment",
                "Fitness and Wellness",
                "Food and Drinks",
                "Hobbies and Activities",
                "Others",
                "Shopping and Fashion",
                "Sports and Outdoor Activities",
                "Select All",
            ],
            selectedcategory: "",
            allevents: "",
            filterobj: {},
            temparray: [],
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

        filter() {
            var category = this.selectedcategory;
            var tempobj = {};
            const events = this.publicevents;
            console.log(typeof events);
            for (const event in events) {
                console.log(event);
                const eventcat = events[event]["category"];
                if (eventcat == category) {
                    tempobj[event] = events[event];
                }
            }
            this.filterobj = tempobj;
            console.log(tempobj);
        },

        // firebaseevents() {
        //   getpublic().then((value) =>{
        //       console.log('inside this');
        //       console.log(value);
        //       this.publicevents = value
        //       // console.log("created - " + this.publicevents);
        //       // console.log(typeof(value));
        //       // console.log('end of .then');
        //     })
        //     .catch((message)=> {
        //       console.log(message);
        //       console.log('error');
        //     })

        // }

        // outerfunction(){

        //   getthis.then((value) =>{
        //     eventsfromdb = value
        //     console.log(value);
        //     console.log(typeof(value));
        //   })
        //   .catch((message)=> {
        //     console.log('error');
        //   })

        // },

        // events: localStorage.getItem('publicjios'),
        // mounted(){
        //     fetch(getpublic())
        //     .then( res => res.json())
        //     .then(data => this.jobs = data)
        //     .catch(err => console.log(err.message))

        // }
        // mounted(){
        //     getpublic()
        // }
    },

    computed: {
        eventsloaded() {
            // console.log('hi');
            return this.publicevents;
        },

        filterevents() {
            // this.allevents = this.filterarray
            this.filter();
            console.log(this.filterobj);
            return this.filterobj;
        },
    },

    created() {
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

        // this.firebaseevents()
        // console.log("getpublic2")
        // const dbRef = ref(getDatabase());
        // get(child(dbRef, `public events/`)).then((snapshot) => {
        //   console.log("getpublic2 - then")
        //   if (snapshot.exists()) {
        //     console.log("getpublic2 - snapshotexists")

        //     // console.log(snapshot.val());
        //     localStorage.setItem('publicjios', JSON.stringify(snapshot.val()))
        //     console.log("snapshot.val():" + snapshot.val());
        //     this.publicevents = snapshot.val();
        //     // localStorage.setItem('publicjios', JSON.stringify(snapshot.val())
        //   } else {
        //     console.log("No data available");
        //   }
        // }).catch((error) => {
        //   console.error(error);
        // });
    },

    // mounted() {
    //   console.log('inside mounted');
    //   this.firebaseevents()
    //   console.log('end of mounted');
    // }
};
</script>

<style scoped></style>

<template>
    <div class="container">
        <div class="row">
            <div class="col d-flex justify-content-center mt-5">
                selected: {{ selectedcategory }}
                <select v-model="selectedcategory" placeholder="select category" @click="filter">
                    <option v-for="value in categories" :key="value">
                        {{ value }}
                    </option>
                </select>
            </div>
        </div>
    </div>

    <div id="event-container" class="container mt-5" style="font-family: worksans-medium">
        <div class="row" id="app" v-if="selectedcategory == '' || selectedcategory == 'Select All'">
            <div class="col-lg-4 col-md-6 mb-5" v-for="(event, index) in eventsloaded" :key="index">
                <router-link @click="scrollToTop" style="text-decoration: none; color: inherit" :to="{ name: 'eachjioevent', params: { idx: index } }">
                    <div class="card event-card" style="width: auto; height: 500px">
                        <img class="card-img-top" v-if="event.image == 'no-image'" src="../../public/Images/default-event-picture.jpg" style="max-height: 200px; width: 100%;" />
                        <img v-else class="card-img-top" :src="event.imageUrl" alt="card image collar" style="min-height: 200px; width: 100%;" />
                            <div class="card-body" style="width: auto">
                                <div class="card-title pt-1 eventTitle">
                                    {{ event.eventname }}
                                </div>
                                <div class="card-text">
                                    <div class="eventCreator" style="margin-right: 10px">
                                        <i class="bi bi-person-circle" style="margin-right: 10px"></i>{{ event.username }}
                                    </div>
                                    <div class="eventDate mt-2">
                                        <i class="bi bi-calendar2-week-fill" style="margin-right: 10px"></i>{{convertDate(event.date.split("T")[0])}}, {{ convert24(event.date.split("T")[1]) }}
                                    </div>
                                    <div class="eventVenue mt-2">
                                    <i class="bi bi-geo-alt-fill" style="margin-right: 10px"></i>{{ event.activities[0].location }}
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

        <div v-else>
            <div class="row" v-if="Object.keys(filterevents).length > 0">
                <div class="col-lg-4 col-md-6 mb-5" v-for="(event, index) in filterevents" :key="index">
                    <router-link @click="scrollToTop" style="text-decoration: none; color: inherit" :to="{ name: 'eachjioevent', params: { idx: index } }">
                        <div class="card event-card" style="width: auto; height: 500px">
                            <img class="card-img-top" v-if="event.image == 'no-image'" src="../../public/Images/default-event-picture.jpg" style="max-height: 200px; width: 100%;" />
                            <img v-else class="card-img-top" :src="event.imageUrl" alt="card image collar" style="min-height: 200px; width: 100%;" />
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
                                        <i class="bi bi-geo-alt-fill" style="margin-right: 10px"></i>{{ event.activities[0].location }}
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
                            <h1><i class="bi bi-search"></i></h1>
                            <div>Sorry! No events found.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
