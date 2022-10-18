<template>
    <div id='event-container' class="container mt-5" style="font-family: worksans-medium">
      <div class="row" id ='app'>
        
        <div class="col-md-4 mb-5" v-for="(event, index) in publicevents" :key="index">          
                <div class="card" style="width:auto">
                  <!-- <img class="card-img-top" :src="event.image.url" alt="card image collar"> -->
                  <div class="card-body" style="width: auto;">
                  <div class="card-title pt-4"> {{event.eventname}}</div>
                   
                  </div>
                </div>
      
         </div>
        </div>
        <!-- <button id='view-more' class="btn mb-3" @click="loadMore" style="box-shadow: 0px 0px 14px -7px #f09819" >Load</button> -->
    </div>
</template>

<script>

import { onMounted } from 'vue';
import {getpublic, snapshotToArray} from '../utils/index.js'


// var events = getthis()
// getthis().then((value) =>{ 
//           // console.log(value);
//           eventsfromdb = value
//           console.log(value);
//           console.log(typeof(value));
//         }).catch((message)=>{
//           console.log('error');
//         })

export default {
  name: 'PublicButton',
  // publicevents: getthis(),

  data(){
    return{
      publicevents: 'hi',
      length: 1

    }
  },

  methods: {

        loadMore() {
        console.log(this.publicevents);
        if (this.length >= this.publicevents.length) {
            return
        }
        this.length = this.length + 1;   
        console.log(this.length);
    
      },

        // outerfunction(){ 

        //   getthis.then((value) =>{ 
        //     eventsfromdb = value
        //     console.log(value);
        //     console.log(typeof(value));
        //   })
        //   .catch((message)=> {
        //     console.log('error');
        //   })
        
        
        // },
        
  // events: localStorage.getItem('publicjios'),
        // mounted(){
        //     fetch(getpublic())
        //     .then( res => res.json())
        //     .then(data => this.jobs = data)
        //     .catch(err => console.log(err.message))

        // }
        // mounted(){
        //     getpublic()
        // }
    },

    computed: {
        eventsloaded() {
          // console.log('hi');
        return this.publicevents;
        },
        },

    created(){
      getpublic().then((value) =>{ 
            this.publicevents = value
            console.log(this.publicevents);
            console.log(typeof(value));
          })
          .catch((message)=> {
            console.log('error');
          })
    }
      }

    
</script>

<style scoped>

</style>