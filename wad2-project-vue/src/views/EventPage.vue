<template>

        <div id="event-page">


          <div id="event-page-banner" class="">

                <div class="row bg-light" id="event-page-card">
                    <div class="col-6 p-0">
                      <img :src=events[$route.params.idx].image.url class="card-img">
                    </div>
                    <div class="col-6 m-0 my-auto ps-3" id="event-page-card-details">
                      <h3>{{ events[$route.params.idx].name }}</h3>
                      <li><i class="bi bi-calendar2-week-fill" style="margin-right: 10px;"></i>day date time</li>
                      <li><i class="bi bi-geo-alt-fill" style="margin-right: 10px;"></i>location</li>
                      <li><i class="bi bi-people-fill" style="margin-right: 10px;"></i>see who's going</li>
                      <div class="row mx-auto ">
                        <router-link to="/createajio" class="btn btn-primary col-5"> Create a Jio for this event </router-link>
                        <span class="col-1"></span>
                        <router-link to="/" class="btn btn-primary col-5"> Join a group for this event </router-link>
                      </div>
                    </div>
                </div>
          </div>
          <div id="event-page-body"> <!-- event page body-->
            <h1>About</h1>
            <div v-html="description"></div> {{getId()}}

          </div>



        </div>
  </template>

<script>

import sourceData from'../data.json';
import axios from 'axios'
// import { getIdToken } from '@firebase/auth';

export default {
        name: 'EventsButton',
        data(){
            return {
            events: sourceData.events, 
            description: '',
            eventid: '',
            url: ''
            }
        },

        methods: {

          getId() {
            const eventid = this.events[this.$route.params.idx].id
            this.url = `https://www.eventbriteapi.com/v3/events/${eventid}/description/?token=PRFPTWCYQ4TUG6MWF7GF`
            this.eventid = eventid
          }, 

          getImg() {
            const eventImg = this.events[this.$route.params.idx].image.url
            console.log(eventImg);
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