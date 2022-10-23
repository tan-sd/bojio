<template>

    <div class="container" style="display:flex; justify-content:space-between;">

    <div>

      Search:
      <input type="textbox">

      Filter by Location:
      <select v-model="selectedlocation" placeholder="select location" @click="filter">
        <option v-for="value,key in sgdistrictcode" :key="value">{{key}}</option>
      </select>

    </div>

    </div>
    

    <!-- if no filters used  -->
    <div v-if="!usefilter">
      <div id='event-container' class="container mt-5" style="font-family: worksans-medium">
        <div class="row" id ='app'>
          <div class="col-lg-4 col-md-6 mb-5" v-for="(event, index) in eventsloaded.slice(0, events.length)" :key="index">
            <router-link style="text-decoration: none; color: inherit;" :to="{ name: 'event', params: { idx: index, }}">
                  <div class="card" style="width:auto; height: 500px">
                    <img class="card-img-top" :src="event.image.url" alt="card image collar">
                    <div class="card-body" style="width: auto;">
                      <div class="card-title pt-1 eventTitle">{{ event.name }}</div>
                      <div class="card-text">
                        <div class="eventDate"><i class="bi bi-calendar2-week-fill" style="margin-right: 10px"></i>{{convertDate(event.start_date)}}, {{convert24(event.start_time)}}</div>
                        <div class="eventVenue mt-2"><i class="bi bi-geo-alt-fill" style="margin-right: 10px"></i>{{event.primary_venue.name}}</div>
                        <div class="eventOrganizer mt-2">{{event.primary_organizer.name}}</div>
                      </div>
                      <div class="tagContainer mt-3">
                                <div class="" v-for="tag of event.tags.slice(0,2)" :key="tag">
                                  <div class="badge text-bg-secondary">{{tag['display_name']}}</div>
                                </div>
                      </div>
                    </div>
                  </div>
            </router-link>
          </div>
        </div>


      </div>
    </div>
        <!-- <button id='view-more' class="btn mb-3" @click="loadMore" style="box-shadow: 0px 0px 14px -7px #f09819" >Load</button> -->

    <div v-else>
      <!-- need to change the key to event id and change the event page details -->
      <div id='event-container' class="container mt-5" style="font-family: worksans-medium">
        <div class="row" id ='app'>
          <div class="col-lg-4 col-md-6 mb-5" v-for="(event, index) in filterevents.slice(0, events.length)" :key="index">
            <router-link style="text-decoration: none; color: inherit;" :to="{ name: 'event', params: { idx: index, }}">
                  <div class="card" style="width:auto; height: 500px">
                    <img class="card-img-top" :src="event.image.url" alt="card image collar">
                    <div class="card-body" style="width: auto;">
                      <div class="card-title pt-1 eventTitle">{{ event.name }}</div>
                      <div class="card-text">
                        <div class="eventDate"><i class="bi bi-calendar2-week-fill" style="margin-right: 10px"></i>{{convertDate(event.start_date)}}, {{convert24(event.start_time)}}</div>
                        <div class="eventVenue mt-2"><i class="bi bi-geo-alt-fill" style="margin-right: 10px"></i>{{event.primary_venue.name}}</div>
                        <div class="eventOrganizer mt-2">{{event.primary_organizer.name}}</div>
                      </div>
                      <div class="tagContainer mt-3">
                                <div class="" v-for="tag of event.tags.slice(0,2)" :key="tag">
                                  <div class="badge text-bg-secondary">{{tag['display_name']}}</div>
                                </div>
                      </div>
                    </div>
                  </div>
            </router-link>
          </div>
        </div>
        
      </div>
    </div>

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
            sgdistrictcode:{ 
              'north': ['72','73','77','78','75','76','79','80'],
              'south': ['01','02','03','04','05','06','07','08','14','15','16','09','10','11','12','13','17','18','19','20','21','22','23','24','25','26','27','28','29','30','58','59'],
              'east': ['31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','81','51','52','53','54','55','82','56','57'],
              'west': ['60','61','62','63','64','65','66','67','68','69','70','71']
            },
            selectedlocation: '',
            usefilter: false,
            filterarray: [],
            
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

          filter(){ 
            var chosenlocation = this.selectedlocation
            var temparray = []
            if(chosenlocation != ''){ 
              this.usefilter = true
              console.log(chosenlocation);
              const allpostalcodes = this.sgdistrictcode[chosenlocation]
              console.log(allpostalcodes);
              //loop through events. if events postal code inside this all postal codes, i add
              const events = this.events
              for(const event of events){ 
                // console.log(event);
                var postalcode = event['primary_venue']['address']['postal_code']
                if(postalcode != null){
                  postalcode = postalcode.substring(0,2)
                  if(Object.values(allpostalcodes).indexOf(postalcode) > -1){ 
                    temparray.push(event)
                  }
                }
              }
            }
            this.filterarray = temparray
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

          filterevents(){ 
            return this.filterarray
          }
          }
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