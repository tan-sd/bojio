<script>

import { onMounted } from 'vue';
import { getpublic, getpublic2, snapshotToArray } from '../utils/index.js'
import {getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword} from 'firebase/auth';
import { useRouter } from 'vue-router' 
// import { initializeApp } from 'firebase/app'
// import { getDatabase, ref, child, push, update, set, get, onValue } from 'firebase/database'
// const firebaseConfig = {
//   apiKey: "AIzaSyDC4kZ-Ec-jP7dnlFEmvD5rW9bOIXRyT3Q",
//   authDomain: "wad2-project-d8ba0.firebaseapp.com",
//   databaseURL: "https://wad2-project-d8ba0-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "wad2-project-d8ba0",
//   storageBucket: "wad2-project-d8ba0.appspot.com",
//   messagingSenderId: "168248515824",
//   appId: "1:168248515824:web:bfcb3221af409131e07635"
// };

// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);

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

  data() {
    return {
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

    // firebaseevents() {
    //   getpublic().then((value) =>{ 
    //       console.log('inside this');
    //       console.log(value);
    //       this.publicevents = value
    //       // console.log("created - " + this.publicevents);
    //       // console.log(typeof(value));
    //       // console.log('end of .then');
    //     })
    //     .catch((message)=> {
    //       console.log(message);
    //       console.log('error');
    //     })

    // }

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

  created() {
  //   console.log('inside created');
    // this.publicevents = getpublic2();
    // console.log("this.publicevents: " + this.publicevents);
  
    getpublic().then((value) =>{ 
          console.log('inside this');
          console.log(value);
          this.publicevents = value
          console.log("created - " + this.publicevents);
          console.log(typeof(value));
          console.log('end of .then');
        })
        .catch((message)=> {
          console.log(message);
          console.log('error');
        })

    // this.firebaseevents()
    // console.log("getpublic2")
    // const dbRef = ref(getDatabase());
    // get(child(dbRef, `public events/`)).then((snapshot) => {
    //   console.log("getpublic2 - then")
    //   if (snapshot.exists()) {
    //     console.log("getpublic2 - snapshotexists")

    //     // console.log(snapshot.val());
    //     localStorage.setItem('publicjios', JSON.stringify(snapshot.val()))
    //     console.log("snapshot.val():" + snapshot.val());
    //     this.publicevents = snapshot.val();
    //     // localStorage.setItem('publicjios', JSON.stringify(snapshot.val())
    //   } else {
    //     console.log("No data available");
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });
  },

  // mounted() { 
  //   console.log('inside mounted');
  //   this.firebaseevents()
  //   console.log('end of mounted');
  // }
}


</script>

<style scoped>

</style>

<template>
  <div id='event-container' class="container mt-5" style="font-family: worksans-medium">
    <div class="row" id='app'>

      <div class="col-md-4 mb-5" v-for="(event, index) in publicevents" :key="index">
        <router-link @click="scrollToTop" style="text-decoration: none; color: inherit;" :to="{ name: 'eachjioevent', params: { idx: index }}">

        <div class="card" style="width:auto">
          <!-- <img class="card-img-top" :src="event.image.url" alt="card image collar"> -->
          <div class="card-body" style="width: auto;">
            <div class="card-title pt-4"> {{event.eventname}}</div>

            <div class="card-content">
                created by {{event.username}}
              </div>
              
            <div>Activities:</div>
                <div v-for="key in event.activities" :key="key">
                  <div>Name: {{key.name}}</div>
                  <div>Location: {{key.location}}</div>
                  <div>Date: {{event.date}}</div>

                  <br>
                  <!-- Eventinfo: {{key.description}} -->

            </div>
          </div>
        </div>
        </router-link>

      </div>
    </div>
    <!-- <button id='view-more' class="btn mb-3" @click="loadMore" style="box-shadow: 0px 0px 14px -7px #f09819" >Load</button> -->
  </div>
</template>

