<template>
   
    <!-- Welcome message -->
    <!-- will be putting if person exist here but dont work yet -->
    <div class="container" v-if="fullname.length > 0">
      <div class="row mb-5">
        <div id = 'personname' style="display:inline; font-family: worksans-extrabold; font-size: 4vmin;"> Welcome, {{fullname}}! 👋🏼</div>
      </div>
    </div> 

  

    
    <div class="container">
        <div class="row d-flex align-content-center justify-content-center">
        <div class="col-sm-3 col-4 d-flex align-content-center justify-content-center">
          <button @click="activeTab = 'EventsButton'" class="btn" id="events">EVENTS</button>
          <!-- <button class="btn" id="events">EVENTS</button> -->
        </div>
        <div class="col-sm-3 col-4 d-flex align-content-center justify-content-center">
          <button @click="activeTab = 'PublicButton'" class="btn" id="public">PUBLIC JIOS</button>
          <!-- <button class="btn" id="public">PUBLIC JIOS</button> -->
        </div>
        <div class="col-sm-3 col-4 d-flex align-content-center justify-content-center">
          <button @click="activeTab = 'PrivateButton'" class="btn" id="private">PRIVATE JIOS</button>
          <!-- <button class="btn" id="private">PRIVATE JIOS</button>  -->
        </div>
      </div>
    </div>

    <div class="container" style="display:flex; justify-content:space-between;">

    <!-- <button @click="activeTab = 'EventsButton'">A</button> -->
    <!-- <button @click="activeTab = 'PublicButton'">B</button> -->
    <!-- <button @click="activeTab = 'PrivateButton'">C</button> -->

    </div>

    <EventsButton v-if="activeTab === 'EventsButton'"/>
    <PublicButton v-if="activeTab === 'PublicButton'"/> 
    <PrivateButton v-if="activeTab === 'PrivateButton'"/>
<!--  
    <keep-alive>
    <component :is="activeTab" />
    </keep-alive> -->
    
    <!-- <div id='event-container' class="container mt-5" style="font-family: worksans-medium">
      <div class="row" id ='app'>
        <div class="col-md-4 mb-5" v-for="(event, index) in eventsloaded.slice(0, events.length)" :key="index">
      
                <div class="card" style="width:auto">
                  <img class="card-img-top" :src="event.image.url" alt="card image collar">
                  <div class="card-body" style="width: auto;">
                  <div class="card-title pt-4"> {{event.name}}</div>
                   
                  </div>
                </div>
      
         </div>
        </div> -->
        <!-- <button id="view-more" class="mb-3" @click="loadMore" style="box-shadow: 0px 0px 14px -7px #f09819">View More</button> -->
        <!-- <button id='view-more' class="btn mb-3" @click="loadMore" style="box-shadow: 0px 0px 14px -7px #f09819" >Load</button> -->
    <!-- </div> -->
    
    <!-- <div class="container" id="bottom">
        <div class="row">
          <div class="col-3"></div>
          <div class="col-sm-6 col-12">
          </div>
          <div class="col-lg-3 col-12 d-flex justify-content-lg-end justify-content-center mb-5">
            <span>Showing 
              <span id="card-count">{{length}}</span> of 
              <span id="card-total"></span> {{events.length}} events      
            </span>
          </div>
        </div>
      </div> -->


</template> 

<!-- <meta http-equiv="Content-Security-Policy" content="connect-src 'ws://localhost:8080';"> -->
<script>
//  const socket = new WebSocket('ws://localhost:8080')
// console.log(socket)
import sourceData from '../data.json'
import EventsButton from './EventsButton.vue'
import PublicButton from './PublicButton.vue'
import PrivateButton from './PrivateButton.vue'
import {getuserid} from '../utils/index.js'

export default {
    name:'App',
    title: 'BOJIO – Homepage',
    components: {
    EventsButton,PublicButton,PrivateButton
},
    data(){
        return {
            events: sourceData.events,
            length: 9, 
            uid: localStorage.getItem("uid"),
            // userid: '',
            activeTab : 'EventsButton',
            // fullname: fullname
        }
    },
//     watch: {
//   input: function () {
//     if (isLocalStorage() /* function to detect if localstorage is supported*/) {
//       localStorage.setItem('storedData', this.input)
//     }
//   }
// }
    methods: {
    loadMore() {
      console.log(this.fullname);
      console.log(this.events);
      if (this.length >= this.events.length) {
        return
      }
      this.length = this.length + 9;   
      console.log(this.length);
  
    },
  },
  computed: {
    eventsloaded() {
      return this.events.slice(0, this.length);
    },
  },

  created(){
    // this.userid = getuserid()
    // console.log('look at this' + this.userid);
  }

}

</script>

<script setup>
  var fullname = localStorage.getItem('fullname')
  console.log(fullname);
  console.log('uid is ' + localStorage.getItem('uid'));
</script>