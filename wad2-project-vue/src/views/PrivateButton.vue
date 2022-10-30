
<template>
  <div v-if="uid.length <= 1" class=" h1 container text-center" >
    <br><br>
    <!-- <Modal v-if="showmodal" v-on:closepopup="close()" ></Modal> -->
    <div style="padding-bottom: 10vmin; font-size: 4vmin; font-family: worksans-medium;">
      Please <span class="privateJio"><router-link to="/login">login</router-link></span> / <span class="privateJio"><router-link to="/signup">sign up</router-link></span> to view private jios

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

        <div v-else class="col-md-4 mb-5" v-for="(event, index) in privateevents" :key="index">
          <div class="card" style="width:auto">
            <!-- <img class="card-img-top" :src="event.image.url" alt="card image collar"> -->
            <div class="card-body" style="width: auto;">
              <div class="card-title pt-4"> {{ event.eventname }}</div>

            </div>
          </div>

        </div>
      </div>
      <!-- <button id='view-more' class="btn mb-3" @click="loadMore" style="box-shadow: 0px 0px 14px -7px #f09819" >Load</button> -->
    </div>
  </div>
</template>

<script>

import { onMounted } from 'vue';
import { getprivate, snapshotToArray, getusername, displayfriends } from '../utils/index.js'
// import Modal from './Modal.vue'
import {ref} from 'vue'

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
      // modalVisible: true,
      // showmodal: true

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
    close(){ 
      console.log('this clicked');
      // this.modalVisible = false
      // this.showmodal = false
    }

  },

  computed: {
    eventsloaded() {
      // console.log('hi');
      return this.privateevents;
    },
  },

  created() {
    var friendsjios = {}
    var myfriends = this.myfriends
    // get my friends out first
    displayfriends().then((value) => {
      this.hasfriends = true

      for (let personuid in value) {
        // console.log(personuid);
        getusername(personuid).then((value) => {
          let username = value
          myfriends.push(username)

          //then i check if the these friends got any private events created

          getprivate().then((value) => {
            // value will get an object with keys thats the event unique id
            const keys = Object.keys(value) 
            // keys is a list with the event unique ids
            for(let i in value){ 
              let data = value[i]
              console.log(i);
              let individual_username = data.username
              console.log(individual_username);
              console.log(myfriends);
              // if current person is my friend and i has not add the activity in
              if((myfriends.includes(individual_username)) && !(Object.prototype.hasOwnProperty.call(friendsjios,data)) ){
                console.log(individual_username);
                friendsjios[i] = data
                console.log(friendsjios);
              }

            }
            console.log(friendsjios);
            this.privateevents = friendsjios
            this.myfriends = myfriends

          })
            .catch((message) => {
              console.log('error');
            })

        })
      }

    })
  }
}


</script>

