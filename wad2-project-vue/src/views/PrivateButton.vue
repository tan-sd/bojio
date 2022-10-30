
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

        <div class="col-md-4 mb-5" v-for="(event, index) in privateevents" :key="index">
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
import { getprivate, snapshotToArray } from '../utils/index.js'
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
      privateevents: 'hi',
      length: 1,
      uid: localStorage.getItem("uid"),
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
    getprivate().then((value) => {
      const keys = Object.keys(value)
      console.log(keys);
      // for(let key in keys){

      //     for( let i in value){
      //         const value = i[key]
      //         console.log(value);
      //     }
      // }

      this.privateevents = value
      console.log(this.privateevents);
      console.log(typeof (value));
    })
      .catch((message) => {
        console.log('error');
      })
  }
}


</script>

