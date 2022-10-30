<template>
   
    <!-- Welcome message -->
    <!-- will be putting if person exist here but dont work yet -->
    <div class="container" v-if="uid.length > 0">
      <div class="row mb-5">
        <div id = 'personname' style="display:inline; font-family: worksans-extrabold; font-size: 4vmin;"> Welcome, {{fullname}}! 👋🏼</div>
      </div>
    </div> 

    {{filterchoice}}
  <!-- WORLD 3D MODEL -->
  <div class="container about-fadeup border border-1 mb-5" id="world-model">
    <Renderer
      ref="renderer"
      alpha antialias resize="window"
      :pointer="{ intersectRecursive: true }"
      >

      <Camera :position="{ x:0, y:0, z: 70 }" />
      <Scene>
        <!-- <AmbientLight
          :position="{x:0, y:0, z:0}"
          color="white"
        /> -->
        <AmbientLight />
        <PointLight
          color="white"
          :position="{ x: 100, y: 10000, z: 40 }"
          :intensity="0.5"
        />
        <Raycaster 
        />
        <GltfModel
          ref="gltf"
          src="/Model/singapore.glb"
          @load="onReady"
          @progress="onProgress"
          @error="onError"
          @pointerEnter="onPointerEvent"
          @click="onPointerLeave"

          
          >
          <!-- @pointerOver="onPointerOver" -->
          <!-- @pointerEnter = 'onPointerEvent' -->
      
          <!-- @mouseLeave = 'onPointerLeave'
          @pointerOver ='onPointerLeave'
          @pointerDown="onPointerLeave"
          @pointerOut="onPointerLeave"
          @pointerCancel="onPointerLeave"
          @pointerLeave="onPointerLeave" -->
          <!-- @pointerOver="onPointerEvent" -->
        </GltfModel>
      </Scene>
    </Renderer>
  </div>

    <div class="container">
        <div class="row d-flex align-content-center justify-content-center">
        <div class="col-sm-3 col-4 d-flex align-content-center justify-content-center">
          <button @click="activeTab = 'EventsButton'" class="btn" id="events">EVENTS</button>
          <!-- <button class="btn" id="events">EVENTS</button> -->
        </div>
        <div class="col-sm-3 col-4 d-flex align-content-center justify-content-center">
          <button @click="activeTab = 'PublicButton'" class="btn" id="public">PUBLIC JIOS</button>
          <!-- <button class="btn" id="public">PUBLIC JIOS</button> -->
        </div>
        <div class="col-sm-3 col-4 d-flex align-content-center justify-content-center">
          <button @click="activeTab = 'PrivateButton'" class="btn" id="private">PRIVATE JIOS</button>
          <!-- <button class="btn" id="private">PRIVATE JIOS</button>  -->
        </div>
      </div>
    </div>

    <div class="container" style="display:flex; justify-content:space-between;">

    <!-- <button @click="activeTab = 'EventsButton'">A</button> -->
    <!-- <button @click="activeTab = 'PublicButton'">B</button> -->
    <!-- <button @click="activeTab = 'PrivateButton'">C</button> -->
    

    </div>

    <!-- <span v-if="uid.length <=1">
      <EventsButton v-if="activeTab === 'EventsButton'" :data="filterchoice"/>
      <PublicButton v-if="activeTab === 'PublicButton'"/>
      <PrivateButton class="d-none" />
    </span> -->

    <span>
    <EventsButton v-if="activeTab === 'EventsButton'" :data="filterchoice"/>
    <PublicButton v-if="activeTab === 'PublicButton'"/> 
    <PrivateButton v-if="activeTab === 'PrivateButton'"/>
    </span>
<!--  
    <keep-alive>
    <component :is="activeTab" />
    </keep-alive> -->
    
    <!-- <div id='event-container' class="container mt-5" style="font-family: worksans-medium">
      <div class="row" id ='app'>
        <div class="col-md-4 mb-5" v-for="(event, index) in eventsloaded.slice(0, events.length)" :key="index">
      
                <div class="card" style="width:auto">
                  <img class="card-img-top" :src="event.image.url" alt="card image collar">
                  <div class="card-body" style="width: auto;">
                  <div class="card-title pt-4"> {{event.name}}</div>
                   
                  </div>
                </div>
      
         </div>
        </div> -->
        <!-- <button id="view-more" class="mb-3" @click="loadMore" style="box-shadow: 0px 0px 14px -7px #f09819">View More</button> -->
        <!-- <button id='view-more' class="btn mb-3" @click="loadMore" style="box-shadow: 0px 0px 14px -7px #f09819" >Load</button> -->
    <!-- </div> -->
    
    <!-- <div class="container" id="bottom">
        <div class="row">
          <div class="col-3"></div>
          <div class="col-sm-6 col-12">
          </div>
          <div class="col-lg-3 col-12 d-flex justify-content-lg-end justify-content-center mb-5">
            <span>Showing 
              <span id="card-count">{{length}}</span> of 
              <span id="card-total"></span> {{events.length}} events      
            </span>
          </div>
        </div>
      </div> -->

</template> 

<!-- <meta http-equiv="Content-Security-Policy" content="connect-src 'ws://localhost:8080';"> -->
<script>
//  const socket = new WebSocket('ws://localhost:8080')
// console.log(socket)
import sourceData from '../data.json'
import EventsButton from './EventsButton.vue'
import PublicButton from './PublicButton.vue'
import PrivateButton from './PrivateButton.vue'
import {getuserid, getdata} from '../utils/index.js'
import { onMounted } from 'vue'

export default {
    name:'App',
    title: 'BOJIO – Homepage',
    components: {
    EventsButton,PublicButton,PrivateButton
},
    data(){
        return {
            events: sourceData.events,
            length: 9, 
            uid: localStorage.getItem("uid"),
            // userid: '',
            activeTab : 'EventsButton',
            fullname: '',
            districtcode:{
              'north': [25,26,27,28],
              'south': [21,11,10,9,8,7,6,5,4,3,2,1],
              'east': [20,19,18,17,16,15,14,13,12],
              'west': [22,23,24]
            },

            sgdistrictcode:{ 
              'north': [72,73,77,78,75,76,79,80],
              'south': [1,2,3,4,5,6,7,8,14,15,16,9,10,11,12,13,17,18,19,20,21,22,23,24,25,26,27,28,29,30,58,59],
              'east': [31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,81,51,52,53,54,55,82,56,57],
              'west': [60,61,62,63,64,65,66,67,68,69,70,71]
            },
            selectedlocation: '',
            usefilter: false,
            currentIntersection: null,
            clicked: false,
            count: 0,
            filterchoice: '',
        }
    },

    methods: {
      onPointerEvent(event) {
        // if (this.currentIntersection === null) {
          console.log(event)
          // this.currentIntersection = event.intersect.object.material;
          // event.intersect.object.material.color.set(event.over ? 1 : 1000)
          console.log(event.over);
          console.log(this.currentIntersection)
          console.log('it is null')
        // }
        // console.log(currentIntersection)
        // currentIntersection.material.color.set(0xffff00);

        // console.log(event.over)
        // event.intersect.object.material.color.set(event.over ? 500 : 1000)

      },
      onPointerLeave(event) {

        //identify location
        var location = event.intersect.object.name
        if(location =='North'){ 
          this.filterchoice = 'north'
        }

        if(location == 'Central'){ 
          this.filterchoice = 'south'
        }

        if(location == 'East'){ 
          this.filterchoice = 'east'
        }

        if(location == 'West'){ 
          this.filterchoice = 'west'
        }

        this.count += 1
        if(this.count % 4 == 0){ 
          this.clicked = false
        }else{ 
        
          this.clicked = true
        }
       
        // if (this.clicked === true) {
        //   event.intersect.object.material.color.set(100)
        // } else {
        //   event.intersect.object.material.color.set(1000)
        // }

        console.log('i am clicked '+ this.clicked);
        return
      },
      filter() {
        // console.log(this.events);
        //   if (this.length >= this.events.length) {
        //       return
        //   }
        //   this.length = this.length + 9;   
        //   console.log(this.length);
        //   console.log(this.events.length);
        //   if (this.length == this.events.length) {
        //     var viewMoreBtn = document.getElementById('view-more');
        //     viewMoreBtn.classList.add('disabled');
        //   }
      },
      loadMore() {
        console.log(this.fullname);
        console.log(this.events);
        if (this.length >= this.events.length) {
          return
        }
        this.length = this.length + 9;   
        console.log(this.length);
    
      },

      updatefullname() { 
        this.fullname = localStorage.getItem('fullname')  
      }
    },
  computed: {
      eventsloaded() {
        return this.events.slice(0, this.length);
      },

  },

  mounted() {
        // const renderer = this.$refs.renderer;
        // const world = this.$refs.gltf.scene;
        // console.log(world)
        // const orbitCtrl = this.$refs.renderer.three.cameraCtrl
        // orbitCtrl.enableZoom = false;
      },

  created(){

    getuserid().then((value)=>{
      console.log('my value in created' + value);
      this.uid = value
      localStorage.setItem('uid', value)
      
    })
    console.log(localStorage.getItem('uid'));
    getdata().then((value) =>
      { 
        this.fullname = value
      }
      )
  },

  onMounted() { 
    this.updatefullname()
  }

}

</script>

<script setup>
  // var fullname = localStorage.getItem('fullname')
  // console.log(fullname);
  // console.log('uid is ' + localStorage.getItem('uid'));
</script>