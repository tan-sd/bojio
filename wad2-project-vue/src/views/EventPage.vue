<template>
    <div>
      <section class="wrapper">
        <!-- IMAGE -->
        <img :src=events[$route.params.idx].image.url>

        <hr>

        <!-- EVENT NAME -->
        Event Name:
        <div>{{ events[$route.params.idx].name }}</div>

        <hr>

        <!-- EVENT VENUE -->
        Venue:
        <div>{{ events[$route.params.idx].primary_venue.name}}</div>

        <hr>

        <!-- EVENT ORGANIZER -->
        Organised by:
        <div>{{ events[$route.params.idx].primary_organizer.name}}</div>

        <hr>

        <!-- EVENT DESCRIPTION -->
        Description:
        <!-- <div v-html="description">{{ this.events[this.$route.params.idx].full_description}}</div> -->
        <div v-html="description"></div> {{getId()}}
        <hr>

        <br>
       
      </section>
    </div>
  </template>

<script>

import sourceData from'../data.json';
import axios from 'axios'
import { getIdToken } from '@firebase/auth';

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