<template>
    

    <div id='event-container' class="container mt-5" style="font-family: worksans-medium">
      <div class="row" id ='app'>
        <div class="col-lg-4 col-md-6 mb-5" v-for="(event, index) in eventsloaded.slice(0, events.length)" :key="index">
          <router-link style="text-decoration: none; color: inherit;" :to="{ name: 'event', params: { idx: index, image: event.image.url , eventid: event.id}}">
                <div class="card" style="width:auto; height: 500px">
                  <img class="card-img-top" :src="event.image.url" alt="card image collar">
                  <div class="card-body" style="width: auto;"> 
                    <div class="card-title pt-4 eventTitle">{{ event.name }}</div>
                    <div class="card-text">
                      <div class="eventDate"><i class="bi bi-calendar2-week-fill" style="margin-right: 10px"></i>{{convertDate(event.start_date)}}, {{convert24(event.start_time)}}</div>
                      <div class="eventVenue mt-2"><i class="bi bi-geo-alt-fill" style="margin-right: 10px"></i>{{event.primary_venue.name}}</div>
                      <div class="eventOrganizer mt-2">{{event.primary_organizer.name}}</div>
                    </div>
<!-- 
                  <br>
                  Start Date: {{event.start_date}}
                  <br>
                  End Date: {{event.end_date}}

                  <br><br>
                  Tags: -->
<!-- 
                  <div v-for="tag of event.tags.slice(0,2)" :key="tag">
                    {{tag['display_name']}}
               
                  </div> -->

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
            splitDate: null,
            month: null,
            date: null,
            
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

        convert24(time) {
            time = time.split(':');
            return time[0] >= 12 && (time[0]-12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
          },

        convertDate(fullDate) {
         fullDate = fullDate.split('-');
         var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
         var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
         var eventD = new Date(fullDate);
         const date = eventD.getDay() 
         return days[date] + ', ' + months[fullDate[1]] + ' ' + fullDate[2];

        }

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

<script setup>
// console.log(sourceData);
//   for( var event of sourceData.events){
//     console.log(event.tags);
//     for( var tag of event.tags){
//       console.log(tag['display_name']);
//     }
//   }
</script>