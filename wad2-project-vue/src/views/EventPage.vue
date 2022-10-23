<template>

        <div id="event-page">


          <div id="event-page-banner" class="" v-bind:style="{ backgroundImage: 'url(' + events[$route.params.idx].image.url + ')' }">>

                <div class="row bg-light" id="event-page-card">
                    <div class="col-6 p-0">
                      <img :src=events[$route.params.idx].image.url class="card-img">
                    </div>
                    <div class="col-6 m-0 my-auto ps-3" id="event-page-card-details">
                      <h3>{{ events[$route.params.idx].name }}</h3>
                      <div>
                        <i class="bi bi-calendar2-week-fill eventDate" style="margin-right: 10px;"></i>{{displayDate()}}, {{convertTime()}}
                      </div>
                      <div>
                        <i class="bi bi-geo-alt-fill eventVenue" style="margin-right: 10px;"></i>{{getVenue()}}
                      </div>
                      <div class="row mx-auto ">
                        <router-link to="/createajio" class="col-5"> <span id="event-page-button">Create a Jio for this event</span> </router-link>
                        <span class="col-1"></span>
                        <router-link to="/" class="col-5"> <span id="event-page-button">Join a group for this event</span> </router-link>
                      </div>
                    </div>
                </div>
          </div>
          <div id="event-page-body" class="container"> <!-- event page body-->
            <h1>About</h1>
            <div v-html="description"></div> {{getId()}}

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
            eventImg: ''
            }
        },

        methods: {

          getId() {
            const eventId = this.events[this.$route.params.idx].id
            this.url = `https://www.eventbriteapi.com/v3/events/${eventId}/description/?token=PRFPTWCYQ4TUG6MWF7GF`
            this.eventId = eventId
          },

          displayDate(){
            const eventDate = this.events[this.$route.params.idx].start_date
            let fullDate = eventDate.split('-');
            let months = ['','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let days = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            let eventD = new Date(fullDate);
            const date = eventD.getDay() 
            return days[date] + ', ' + months[fullDate[1]] + ' ' + fullDate[2];

          },

          convertTime(){
            let time = this.events[this.$route.params.idx].start_time
            time = time.split(':');
              return time[0] >= 12 && (time[0]-12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
          },

          getVenue(){
            return this.events[this.$route.params.idx].primary_venue.name
          },

          getImg(){
            return this.events[this.$route.params.idx].image.url
          }

        },
        mounted() {
          //use description
          axios.get(this.url)
          .then(response => (
            this.description = response.data.description            
          ))

          // //structured content
          // axios.get(`https://www.eventbriteapi.com/v3/events/403304202727/structured_content/?token=PRFPTWCYQ4TUG6MWF7GF`)
          // .then(response => (
          //   // console.log(response.data.modules[0].data.body.text)
          //   this.content = response.data.modules[0].data.body.text
          
          // ))

        }
}


</script>