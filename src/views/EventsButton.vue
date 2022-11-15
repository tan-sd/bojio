<template>
    <div class="container mt-5">
        <div class="row mx-auto" style="width: 300px;">
            <div class="col">
                <p class="text-center">
                    <span style="font-family: worksans-semibold">
                        Search Events
                    </span>
                    <i class="bi bi-search orange-icon"></i>
                </p>
                <input
                    type="textbox"
                    v-model="searchedname"
                    class="form-control rounded-pill searchfield"
                    id="exampleFormControlInput1"
                    placeholder="Search..."
                    @keyup="search()"
                    @keyup.delete="deletesearch()"
                    />
            </div>
            <div v-if="filterchoice!=''"></div>
        </div>
    </div>

    <!-- IF NO FILTER USED  -->
    <div v-if="!usefilter">
        <div
            id="event-container"
            class="container mt-5"
            style="font-family: worksans-medium">
            <div class="row" id="app">
                <div
                    class="col-lg-4 col-md-6 mb-5"
                    v-for="(event, index) in eventsloaded.slice(0, events.length)"
                    :key="index">
                    <router-link
                        @click="scrollToTop"
                        style="text-decoration: none; color: inherit"
                        :to="{ name: 'event', params: { idx: event.id } }">
                        <div class="card event-card" style="width: auto; height: 500px">
                            <img class="card-img-top" :src="event.image.url" alt="card image collar"/>
                            <div class="card-body" style="width: auto">
                                <div class="card-title pt-1 eventTitle">
                                    {{ event.name }}
                                </div>
                                <div class="card-text">
                                    <div class="eventDate">
                                        <i
                                            class="bi bi-calendar2-week-fill"
                                            style="margin-right: 10px"
                                        ></i
                                        >{{ convertDate(event.start_date) }},
                                        {{ convert24(event.start_time) }}
                                    </div>
                                    <div class="eventVenue mt-2">
                                        <i
                                            class="bi bi-geo-alt-fill"
                                            style="margin-right: 10px"
                                        ></i
                                        >{{ event.primary_venue.name }}
                                    </div>
                                    <div class="eventOrganizer mt-2">
                                        <i
                                            class="bi bi-briefcase-fill"
                                            style="margin-right: 10px"
                                        ></i
                                        >{{ event.primary_organizer.name }}
                                    </div>
                                </div>
                                <div class="tagContainer mt-3">
                                    <div
                                        class=""
                                        v-for="tag of event.tags.slice(0, 2)"
                                        :key="tag"
                                    >
                                        <div class="badge text-bg-secondary">
                                            {{ tag["display_name"] }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>

        <div class="container" id="bottom">
            <div class="row">
                <div class="col-3"></div>
                <div class="col-sm-6 col-12">
                    <button id="view-more" class="mb-3" @click="loadMore">
                        View More
                    </button>
                </div>
                <div
                    class="col-lg-3 col-12 d-flex justify-content-lg-end justify-content-center mb-5"
                >
                    <span
                        >Showing
                        <span id="card-count">{{ eventsloaded.length }}</span>
                        of <span id="card-total"></span>
                        {{ events.length }} events
                    </span>
                </div>
            </div>
        </div>
    </div>

    <!-- IF FILTER IS USED -->
    <div v-else>
        <div
            id="event-container"
            class="container mt-5"
            style="font-family: worksans-medium"
        >
            <div class="row" id="app">
                <div
                    class="col-lg-4 col-md-6 mb-5"
                    v-for="(event, index) in filterevents.slice(
                        0,
                        events.length
                    )"
                    :key="index"
                >
                    <router-link
                        style="text-decoration: none; color: inherit"
                        :to="{ name: 'event', params: { idx: event.id } }"
                    >
                        <div
                            class="card event-card"
                            style="width: auto; height: 500px"
                        >
                            <img
                                class="card-img-top"
                                :src="event.image.url"
                                alt="card image collar"
                            />
                            <div class="card-body" style="width: auto">
                                <div class="card-title pt-1 eventTitle">
                                    {{ event.name }}
                                </div>
                                <div class="card-text">
                                    <div class="eventDate">
                                        <i
                                            class="bi bi-calendar2-week-fill"
                                            style="margin-right: 10px"
                                        ></i
                                        >{{ convertDate(event.start_date) }},
                                        {{ convert24(event.start_time) }}
                                    </div>
                                    <div class="eventVenue mt-2">
                                        <i
                                            class="bi bi-geo-alt-fill"
                                            style="margin-right: 10px"
                                        ></i
                                        >{{ event.primary_venue.name }}
                                    </div>
                                    <div class="eventOrganizer mt-2">
                                        {{ event.primary_organizer.name }}
                                    </div>
                                </div>
                                <div class="tagContainer mt-3">
                                    <div
                                        class=""
                                        v-for="tag of event.tags.slice(0, 2)"
                                        :key="tag"
                                    >
                                        <div class="badge text-bg-secondary">
                                            {{ tag["display_name"] }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>

        <div class="container" id="bottom">
            <div class="row">
                <div class="col-3"></div>
                <div class="col-sm-6 col-12">
                    <button id="view-more" class="mb-3" @click="loadMore">
                        View More
                    </button>
                </div>
                <div
                    class="col-lg-3 col-12 d-flex justify-content-lg-end justify-content-center mb-5"
                >
                    <span
                        >Showing
                        <span id="card-count">{{ filterevents.length }}</span>
                        of <span id="card-total"></span>
                        {{ filterevents.length }} events
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import sourceData from "../data.json";

export default {
    name: "EventsButton",
    props: ["data"],
    data() {
        return {
            events: sourceData.events,
            length: 9,
            uid: localStorage.getItem("uid"),
            splitDate: null,
            month: null,
            date: null,
            sgdistrictcode: {
                All: [
                    "72",
                    "73",
                    "77",
                    "78",
                    "75",
                    "76",
                    "79",
                    "80",
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "14",
                    "15",
                    "16",
                    "09",
                    "10",
                    "11",
                    "12",
                    "13",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                    "22",
                    "23",
                    "24",
                    "25",
                    "26",
                    "27",
                    "28",
                    "29",
                    "30",
                    "58",
                    "59",
                    "31",
                    "32",
                    "33",
                    "34",
                    "35",
                    "36",
                    "37",
                    "38",
                    "39",
                    "40",
                    "41",
                    "42",
                    "43",
                    "44",
                    "45",
                    "46",
                    "47",
                    "48",
                    "49",
                    "50",
                    "81",
                    "51",
                    "52",
                    "53",
                    "54",
                    "55",
                    "82",
                    "56",
                    "57",
                    "60",
                    "61",
                    "62",
                    "63",
                    "64",
                    "65",
                    "66",
                    "67",
                    "68",
                    "69",
                    "70",
                    "71",
                ],
                North: ["72", "73", "77", "78", "75", "76", "79", "80"],
                Central: [
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "14",
                    "15",
                    "16",
                    "09",
                    "10",
                    "11",
                    "12",
                    "13",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                    "22",
                    "23",
                    "24",
                    "25",
                    "26",
                    "27",
                    "28",
                    "29",
                    "30",
                    "58",
                    "59",
                ],
                East: [
                    "31",
                    "32",
                    "33",
                    "34",
                    "35",
                    "36",
                    "37",
                    "38",
                    "39",
                    "40",
                    "41",
                    "42",
                    "43",
                    "44",
                    "45",
                    "46",
                    "47",
                    "48",
                    "49",
                    "50",
                    "81",
                    "51",
                    "52",
                    "53",
                    "54",
                    "55",
                    "82",
                    "56",
                    "57",
                ],
                West: [
                    "60",
                    "61",
                    "62",
                    "63",
                    "64",
                    "65",
                    "66",
                    "67",
                    "68",
                    "69",
                    "70",
                    "71",
                ],
            },
            selectedlocation: "",
            usefilter: false,
            filterarray: [],
            searchedname: "",
            usesearch: false,
            searcharray: [],
            maplocation: "",
        };
    },
    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        },
        loadMore() {
            console.log(this.events);
            if (this.length >= this.events.length) {
                return;
            }
            this.length = this.length + 9;
            console.log(this.length);
            console.log(this.events.length);
            if (this.length == this.events.length) {
                var viewMoreBtn = document.getElementById("view-more");
                viewMoreBtn.classList.add("disabled");
            }
        },

        filter() {
            // console.log("start of filter function");
            var chosenlocation = this.selectedlocation;
            var temparray;
            var postalcode;
            var allpostalcodes;

            if (!this.usesearch) {
                //if never use search go normal way, just filter from main events
                temparray = [];
                if (chosenlocation != "") {
                    this.usefilter = true;
                    const allpostalcodes = this.sgdistrictcode[chosenlocation];
                    //loop through events. if events postal code inside this all postal codes, i add
                    const events = this.events;
                    for (const event of events) {
                        postalcode =
                            event["primary_venue"]["address"]["postal_code"];
                        if (postalcode != null) {
                            postalcode = postalcode.substring(0, 2);
                            if (
                                Object.values(allpostalcodes).indexOf(
                                    postalcode
                                ) > -1
                            ) {
                                temparray.push(event);
                            }
                        }
                    }
                }
            } else {
                temparray = [];
                if (chosenlocation != "") {
                    this.usefilter = true;
                    allpostalcodes = this.sgdistrictcode[chosenlocation];
                    //loop through events. if events postal code inside this all postal codes, i add
                    const events = this.searcharray;
                    for (const event of events) {
                        postalcode =
                            event["primary_venue"]["address"]["postal_code"];
                        if (postalcode != null) {
                            postalcode = postalcode.substring(0, 2);
                            if (
                                Object.values(allpostalcodes).indexOf(
                                    postalcode
                                ) > -1
                            ) {
                                temparray.push(event);
                            }
                        }
                    }
                }
                this.latestarray = temparray;
            }
            if (chosenlocation == "All") {
                this.usefilter = false;
            }
            this.filterarray = temparray;
        },
        clearfilter() {
            this.usefilter = false;
        },
        usemapfilter() {

            this.selectedlocation = this.data;
            this.filter();
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
            var allevents = this.events;
            //dont replace this.events , shd create a new search array
            var temparray = [];
            for (const event of allevents) {
                // console.log(event);
                const eventname = event["name"].toLowerCase();
                if (eventname.includes(search.toLowerCase())) {
                    temparray.push(event);
                }
            }
            this.searcharray = temparray;
            console.log(temparray);
            console.log(this.usesearch);
            console.log("end of search func");
        },
        deletesearch() {
            console.log("in delete search");
            var search = this.searchedname;
            if (search != "") {
                console.log("in delete, use search");

                var allevents = sourceData.events;
                console.log(allevents);
                console.log(allevents.length);
                var temparray = [];

                for (const event of allevents) {
                    const eventname = event["name"].toLowerCase();
                    if (eventname.includes(search.toLowerCase())) {
                        temparray.push(event);
                    }
                }
                this.searcharray = temparray;
            }
        },
        convert24(time) {
            time = time.split(":");
            return (
                (time[0] >= 12 &&
                    (time[0] - 12 || 12) + ":" + time[1] + " PM") ||
                (Number(time[0]) || 12) + ":" + time[1] + " AM"
            );
        },
        convertDate(fullDate) {
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
            return days[date] + ", " + months[fullDate[1]] + " " + fullDate[2];
        },
    },
    computed: {
        filterchoice(){
            // console.log(this.data);
            this.usemapfilter()
            return this.data
        },
        eventsloaded() {
            if (this.usesearch) {
                //change events to searcharray
                this.events = this.searcharray;
            }else{
                this.events = sourceData.events
            }
            return this.events.slice(0, this.length);
        },
        filterevents() {
            this.allevents = this.filterarray;
            if (this.usesearch && this.filterarray) {
                // if use search, take searcharray
                this.filter();
                console.log(this.latestarray);
                return this.latestarray;
            }
            // else take filter array
            this.filter();
            console.log(this.filterarray);
            return this.filterarray;
        },
    }
};
</script>

<script setup>
// console.log(sourceData);
//   for( var event of sourceData.events){
//     console.log(event.tags);
//     for( var tag of event.tags){
//       console.log(tag['display_name']);
//     }
//   }
</script>
