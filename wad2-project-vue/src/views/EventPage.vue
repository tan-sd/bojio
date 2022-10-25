<template>
        <div id="event-page">

          <div id="event-page-banner" class="" v-bind:style="{ backgroundImage: 'url(' + imageurl + ')' }">

                <div class="row bg-light" id="event-page-card">
                    <div class="col-6 p-0">
                      <img :src=imageurl class="card-img">
                    </div>
                    <div class="col-6 m-0 my-auto ps-3" id="event-page-card-details">
                      <h3>{{ name }}</h3>
                    
                      <i class="bi bi-calendar2-week-fill eventDate" style="margin-right: 10px;"></i>{{displayDate()}}, {{convertTime()}}
                      <div>
                        <i class="bi bi-geo-alt-fill eventVenue" style="margin-right: 10px;"></i>{{getVenue()}}
                      </div>
                      <br>

                      Organised by:
                      <div v-html="organizerName"></div>
                      <div>
                      </div>
                      <div class="row mx-auto ">
                        <router-link to="/createajio" class="col-5"> <span id="event-page-button">Create a Jio for this event</span> </router-link>
                        <span class="col-1"></span>
                        <router-link to="/" class="col-5"> <span id="event-page-button">Join a group for this event</span> </router-link>
                      </div>
                    </div>
                </div>
          </div>
          <div id="event-page-body" class="container"> 
            <h1>About</h1>
            <div v-html="description"></div>

          </div>



        </div>
      
  </template>

<script>

import sourceData from'../data.json';
import axios from 'axios'
import { variableDeclarator } from '@babel/types';
// import { getIdToken } from '@firebase/auth';



export default {
        name: 'EventsButton',
        data(){
            return {
            events: sourceData.events, 
            description: '',
            eventId: '',
            url: '',
            eventImg: '',
            name: '',
            imageurl: '',
            eventdate: '',
            starttime:'',
            organizerID: '',
            organizerName: '',
            descriptionURL: '',
            venueURL: '',
            venueID: '',
            venueName: '',
            eventName:'',
            date: '',
            time: '',
            }
        },

        methods: {

          displayDate(){
            const eventDate = this.date
            let fullDate = eventDate.split('-');
            let months = ['','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let days = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            let eventD = new Date(fullDate);
            const date = eventD.getDay() 
            return days[date] + ', ' + months[fullDate[1]] + ' ' + fullDate[2];

          },

          convertTime(){
            let time = this.time
            time = time.split(':');
              return time[0] >= 12 && (time[0]-12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
          },

          getVenue(){
            return this.venueName
          },

          getImg(){
            return this.eventImg
          },

          getId(){ 
         
            this.eventId = this.$route.params.idx
            var eventId = this.$route.params.idx
            this.url = `https://www.eventbriteapi.com/v3/events/${eventId}/?token=PRFPTWCYQ4TUG6MWF7GF`
            this.descriptionURL = `https://www.eventbriteapi.com/v3/events/${eventId}/description/?token=PRFPTWCYQ4TUG6MWF7GF`

          }

        },
        
        computed: {
          get(){ 
            return this.$route.params.idx
          }
        },
        
        created() {
          this.getId()
          var url = this.url
          console.log(url);
          //use description
                axios.get(url)
                .then(response => { 
                  console.log(response);
                  // this.description = response.data.description.text
                  // this.eventName = response.data.name.html,
                  this.name = response.data.name.text    
                  this.imageurl = response.data.logo.original.url
                  this.eventdate = response.data.start.local
                  this.venueID = response.data.venue_id,
                  this.organizerID = response.data.organizer_id,
                  this.venueURL = `https://www.eventbriteapi.com/v3/venues/` + this.venueID + `/?token=PRFPTWCYQ4TUG6MWF7GF`,
                  this.organizerURL = `https://www.eventbriteapi.com/v3/organizers/` + this.organizerID + `/?token=PRFPTWCYQ4TUG6MWF7GF`,
                  // const eventdate = this.eventdate
                  this.date = this.eventdate.split('T')[0]
                  this.time = this.eventdate.split('T')[1]

                    axios.get(this.venueURL)
                    .then(response => (
                      console.log(response.data),
                      this.venueName = response.data.name
                    )),
                    
                    axios.get(this.descriptionURL)
                    .then(response => (
                      this.description = response.data.description
                    )),

                    axios.get(this.organizerURL)
                    .then(response => (
                      this.organizerName = response.data.name
                    ))
                }
                  
                ).catch( error =>{ 
                  console.log(error.message);
              
                })

          
        


        }
}


</script>
