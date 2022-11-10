
<template>
  <div v-if="uid.length <= 1" class=" h1 container text-center">
    <br><br>
    <!-- <Modal v-if="showmodal" v-on:closepopup="close()" ></Modal> -->
    <div style="padding-bottom: 10vmin; font-size: 4vmin; font-family: worksans-medium;">
      Please <span class="privateJio">
        <router-link to="/login">login</router-link>
      </span> / <span class="privateJio">
        <router-link to="/signup">sign up</router-link>
      </span> to view private jios

    </div>
  </div>

  <div v-else>
    <div id='event-container' class="container mt-5" style="font-family: worksans-medium">
      <div class="row" id='app'>

        <div v-if="!hasfriends">
          Try adding friends and jio them out!
          <br><br><br><br>
        </div>
        <div v-if="Object.keys(privateevents).length == 0">
          Your friends never create any jios leh. Why don't you create a jio?
          <br><br><br><br>
        </div>


        <!-- here onwards is when user logged in and has events to view -->
        <div v-else>

          selected: {{ selectedcategory }}
          <select v-model="selectedcategory" placeholder="select category" @click="filter">
            <option v-for="value in categories" :key="value"> {{ value }}</option>
          </select>

          <div v-if="selectedcategory == '' || selectedcategory == 'Select All'">
            <div class="col-md-4 mb-5" v-for="(event, index) in privateevents" :key="index">
              <router-link @click="scrollToTop" style="text-decoration: none; color: inherit;"
                :to="{ name: 'eachjioevent', params: { idx: index } }">
                <div class="card" style="width:auto">
             
                  <div class="card-body" style="width: auto;">
                    <div class="card-title pt-4"> {{ event.eventname }}</div>
                    <div class="card-content">
                      created by {{ event.username }}
                    </div>

                    <div>Activities:</div>
                    <div v-for="key in event.activities" :key="key">
                      <div>Name: {{ key.name }}</div>
                      <div>Location: {{ key.location }}</div>
              
                      <br>
          
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>

          <div v-else>
            <div v-if="filterevents.length > 0">

              <div class="col-md-4 mb-5" v-for="(event, index) in filterevents" :key="index">
                <router-link @click="scrollToTop" style="text-decoration: none; color: inherit;"
                  :to="{ name: 'eachjioevent', params: { idx: index } }">
                  <div class="card" style="width:auto">
      
                    <div class="card-body" style="width: auto;">
                      <div class="card-title pt-4"> {{ event.eventname }}</div>
                      <div class="card-content">
                        created by {{ event.username }}
                      </div>

                      <div>Activities:</div>
                      <div v-for="key in event.activities" :key="key">
                        <div>Name: {{ key.name }}</div>
                        <div>Location: {{ key.location }}</div>
                        <br>
               
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
            <div v-else>
              No events to see :(
            </div>

          </div>
        </div>
        <!-- end of display event  -->


      </div>
      <!-- <button id='view-more' class="btn mb-3" @click="loadMore" style="box-shadow: 0px 0px 14px -7px #f09819" >Load</button> -->
    </div>
  </div>
</template>

<script>

import { onMounted } from 'vue';
import { getprivate, snapshotToArray, getusername, displayfriends } from '../utils/index.js'
// import Modal from './Modal.vue'
import { ref } from 'vue'

export default {
  name: 'PrivateButton',
  // components: {Modal},
  // setup(){ 
  //   const popupTriggers =ref({
  //     buttonTrigger: false,
  //     timedTrigger: false
  //   })
  // },
  // privateevents: getthis(),

  data() {
    return {
      privateevents: {},
      length: 1,
      uid: localStorage.getItem("uid"),
      myfriends: [],
      hasfriends: false,
      categories: ['Business and Industry', 'Education', 'Entertainment', 'Fitness and Wellness', 'Food and Drinks', 'Hobbies and Activities', 'Others', 'Shopping and Fashion', 'Sports and Outdoor Activities', 'Select All'],
      selectedcategory: '',
      allevents: '',
      filterarray: []

    }
  },

  methods: {

    loadMore() {
      console.log(this.privateevents);
      if (this.length >= this.privateevents.length) {
        return
      }
      this.length = this.length + 1;
      console.log(this.length);

    },
    close() {
      console.log('this clicked');
      // this.modalVisible = false
      // this.showmodal = false
    },

    filter() {
      var category = this.selectedcategory
      var temparray = []
      const events = this.privateevents
      console.log(typeof (events));
      for (const event in events) {
        console.log(event);
        const eventcat = events[event]['category']
        if (eventcat == category) {
          temparray.push(events[event])
        }
      }
      this.filterarray = temparray
      console.log(temparray);
    }

  },

  computed: {
    eventsloaded() {
      // console.log('hi');
      return this.privateevents;
    },

    filterevents(){
      // this.allevents = this.filterarray
      this.filter()
      console.log(this.filterarray);
      return this.filterarray
    }
  },

  created() {
    var friendsjios = {}
    // var count = 0
    // var friendsuids = []
    // var myfriends = this.myfriends
    // console.log(myfriends);
    // get my friends out first
    displayfriends().then((value) => {
      this.hasfriends = true

      const myfriends = Object.keys(value)
      console.log(myfriends);

      // console.log(value);
      // for (let personuid in value) {
      //   console.log(' in priv button my fren is ' + personuid);
      //   friendsuids.push(personuid)
      // }
      // getusername(personuid).then((value) => {

      // let username = value
      // myfriends.push(username)

      //then i check if the these friends got any private events created

      getprivate().then((value) => {
        // value will get an object with keys thats the event unique id
        const keys = Object.keys(value)
        // console.log(keys);
        console.log(value);
        // keys is a list with the event unique ids
        for (let i in value) {
          let data = value[i]
          // console.log(i);
          let userid = data.userid
          // console.log(userid);
          console.log(myfriends);
          if (myfriends.includes(userid)) {
            console.log(userid + 'is my friend');
            //then want to get event details
            friendsjios[i] = data
            //cnot use count, must use i so can access eventid aft tat
            // count ++;
          }

          // let individual_username = data.username
          // console.log(individual_username);
          // console.log(myfriends);
          //my friends is array of usernames

          // if current person is my friend and i has not add the activity in
          // if((myfriends.includes(individual_username)) && !(Object.prototype.hasOwnProperty.call(friendsjios,data)) ){
          //   console.log(individual_username);
          //   friendsjios[i] = data
          //   console.log(friendsjios);
          // }

        }
        console.log(friendsjios);
        this.privateevents = friendsjios
        this.myfriends = myfriends

      })
        .catch((message) => {
          console.log('error');
        })

      // })


    })
  }
}


</script>

