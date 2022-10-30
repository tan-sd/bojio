<template>
    <div id="event-banner-div">
        <img id="event-banner-background" v-bind:style="{ backgroundImage: 'url(' + imageurl + ')' }" alt="">
        <div class="row">
            <div id="event-banner-card" class="col-11 col-sm-10 col-md-8 col-lg-6">
                <img id="event-banner-card-image" class='card-img' :src=imageurl  alt=''>
                <div id="event-banner-card-body">
                    <div class="row">
                        <div class="col-12 col-md-6 mb-2">
                            <h5>{{ name }}</h5>
                            <p><i class="bi bi-calendar2-week-fill eventDate" style="margin-right: 10px;"></i>{{displayDate()}}, {{convertTime()}}</p>
                            <p><i class="bi bi-geo-alt-fill eventVenue" style="margin-right: 10px;"></i>{{getVenue()}}</p>
                            <!-- <p>Organised by</p> -->
                        </div>
                        <div id="event-card-buttons" class="col-12 col-md-6 text-center">
                            <button type='button' class='btn btn-primary col-12'>Find Out More</button>
                            <button type='button' class='btn btn-primary col-12'>Create a Jio for this event</button>
                            <button type='button' class='btn btn-primary col-12'>Join a Jio for this event</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container mt-3">
      {{getlat}} {{getlng}} 
        <h1>{{ name }}</h1>
        <h1>About</h1>
    </div>

    <div class="container">
      <div class="row">
        <div class="col d-flex align-item-center justify-content-center mx-auto">
          <GMapMap
              :center="center"
              :zoom="16"
              map-type-id="roadmap"
              style="width: 80vmin; height: 50vmin"
              :options="options"
              >
            <GMapMarker
                :key="marker.id"
                v-for="marker in markers"
                :position="marker.position"
            />
            
            </GMapMap>
        </div>
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
            latitude: '',
            longitude: '',
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
            center: { lat: this.latitude, lng: this.longitude },
            markers: [
              {
                position: {
                  lat: this.latitude, lng: this.longitude
                }
              }
            ],
            options: {
              zoomControl: false,
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              rotateControl: false,
              fullscreenControl: false,

              styles: [
              ]
            },
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
          },
        },
        
        computed: {
          get(){ 
            return this.$route.params.idx
          },

          getlat(){ 
            var obj = this.center
            obj.lat = this.latitude

            var array = this.markers
            array[0].position.lat = this.latitude

            return ''
          },

          getlng(){ 
            var obj = this.center
            obj.lng= this.longitude

            var array = this.markers
            array[0].position.lng = this.longitude
            
            return ''
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
                      this.venueName = response.data.name,
                      this.latitude = parseFloat(response.data.latitude),
                      this.longitude = parseFloat(response.data.longitude),
                      console.log(this.longitude)
                    )),
                    
                    axios.get(this.descriptionURL)
                    .then(response => 
                      this.description = response.data.description
                    ),

                    axios.get(this.organizerURL)
                    .then(response => (
                      this.organizerName = response.data.name
                    ))

                }
                  
                ).catch( error =>{ 
                  console.log(error.message);
              
                })

        },

}


</script>
