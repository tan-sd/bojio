<template>
    

    <div id='event-container' class="container mt-5" style="font-family: worksans-medium">
      <div class="row" id ='app'>
        <div class="col-md-4 mb-5" v-for="(event, index) in eventsloaded.slice(0, events.length)" :key="index">
          <router-link style="text-decoration: none; color: inherit;" :to="{ name: 'event', params: { idx: index, image: event.image.url }}">
                <div class="card" style="width:auto">
                  <img class="card-img-top" :src="event.image.url" alt="card image collar">
                  <div class="card-body" style="width: auto;">
                  <div class="card-title pt-4"> {{event.name}}</div>
                  </div>
                  </div>
                </router-link>
                </div>
      
         </div>
        </div>
        <!-- <button id='view-more' class="btn mb-3" @click="loadMore" style="box-shadow: 0px 0px 14px -7px #f09819" >Load</button> -->

    <div class="container" id="bottom">
        <div class="row">
          <div class="col-3"></div>
          <div class="col-sm-6 col-12">
            <button id="view-more" class="mb-3" @click="loadMore">View More</button>
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
import sourceData from'../data.json'

console.log(sourceData);
console.log(typeof(sourceData));
    export default {
        name: 'EventsButton',
        data(){
            return {
            events: sourceData.events,
            length: 9, 
            uid: localStorage.getItem("uid"),
            
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
        console.log(this.events.length);
        if (this.length == this.events.length) {
          var viewMoreBtn = document.getElementById('view-more');
          viewMoreBtn.classList.add('disabled');
        }
    
        },
        },
        computed: {
        eventsloaded() {
        return this.events.slice(0, this.length);
        },
        },
    }
    
</script>

<style scoped>

</style>