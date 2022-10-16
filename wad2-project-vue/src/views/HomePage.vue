<template>
   
    <!-- Welcome message -->
    <div class="container">
      <div class="row mb-5">
        <div id = 'personname' style="display:none"></div>
      </div>
    </div>

    <div class="container">
        <div class="row d-flex align-content-center justify-content-center">
        <div class="col-sm-3 col-4 d-flex align-content-center justify-content-center">
          <button class="btn" id="events">EVENTS</button>
        </div>
        <div class="col-sm-3 col-4 d-flex align-content-center justify-content-center">
          <button class="btn" id="public">PUBLIC JIOS</button>
        </div>
        <div class="col-sm-3 col-4 d-flex align-content-center justify-content-center">
          <button class="btn" id="private">PRIVATE JIOS</button> 
        </div>
      </div>
    </div>
    
    <div id='event-container' class="container mt-5" style="font-family: worksans-medium">
      <div class="row" id ='app'>
        <div class="col-md-4 mb-5" v-for="(event, index) in eventsloaded.slice(0, events.length)" :key="index">
      
                <div class="card" style="width:auto">
                  <img class="card-img-top" :src="event.image.url" alt="card image collar">
                  <div class="card-body" style="width: auto;">
                  <div class="card-title pt-4"> {{event.name}}</div>
                    <!-- <p class="card-text"> {{event.name}}</p> -->
                  </div>
                </div>
      
         </div>
        </div>
        <button id="view-more" class="mb-3" @click="loadMore" style="box-shadow: 0px 0px 14px -7px #f09819">View More</button>
        <!-- <button id='view-more' class="btn mb-3" @click="loadMore" style="box-shadow: 0px 0px 14px -7px #f09819" >Load</button> -->
    </div>
    
    <div class="container" id="bottom">
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
      </div>

</template> 


<script>

import sourceData from '../data.json'

export default {
    name:'App',
    data(){
        return {
            events: sourceData.events,
            length: 9, 
            uid: localStorage.getItem("uid")
        }
    },
    methods: {
    loadMore() {
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

}

</script>