<template>
    <div class="container">
        <div class="row">
            <div class="col d-flex justify-content-center">
                <img class="event-banner-card-image" id="goToTop" src="../../../wallpaper1.jpg" alt="">
            </div>
        </div>
    </div>

    <a id="event-scroll-top" href="#goToTop">
        scroll to top
    </a>

    <div class="container">
        <div class="event-header-details text-center">
            {{ event.eventname }}
        </div>

        <div class="row mx-auto">
            <div class="col-12 col-xl-6 mt-5 order-xl-first order-last">
                <div class="row mx-auto">
                    <div class="" style="font-family:worksans-semibold">Details</div>
                    <div class="mt-2"><i class="bi bi-person-circle" style="margin-right: 10px"></i>{{event.username}}</div>
                    <div class="mt-2"><i class="bi bi-calendar2-week-fill eventDate" style="margin-right: 10px"></i>{{ displayDate() }}, {{ convertTime() }}</div>
                    <div class="mt-2"><i class="bi bi-geo-alt-fill eventVenue" style="margin-right: 10px"></i>{{ getVenue() }}</div>
                </div>

        <div class="row mx-auto">
            <div class="mt-5" style="font-family:worksans-semibold">About</div>
            <div class='mb-5' id="event-about-section">{{event.activities[0].description}}</div>
        </div>

        <div class="row mx-auto">
            <div>Activity/Activities</div>
     
            <div v-for="act , index in event.activities" :key="index">
                Activity {{index + 1}}
                <table>
                    <tr>
                        <td>name:</td> <td>{{act.name}}</td>
                    </tr>
                        <td>location:</td> <td>{{act.location}}</td>
                    
                    <tr>
                        <td>duration(min):</td> <td>{{act.duration}}</td>
                    </tr>
                </table>
                <br>
            </div>
        </div>
        </div>
                <!-- map -->
                <div class="col-12 col-xl-6 mt-5 order-xl-last order-first" id="event-right-column">
      
          
      <div class="container mb-3">

        <div class="col text-center">
          <GMapMap
            :center="center"
            :zoom="16"
            map-type-id="roadmap"
            style="width: 85; height: 40vmin"
            :options="options"
            ref="map"
          >
            <GMapMarker
              :key="marker.id"
              v-for="marker in markers"
              :position="marker.position"
            />
          </GMapMap>

      </div>
      <div id="event-card-buttons" class="text-center row mt-3">

        <div class="col-12 col-md-6 mx-auto">
          <a :href="route" target="_blank" id="event-route" class="col-12">
              <span id="howToGetThere">How To Get There</span>  
          </a>
        </div>
        <div class="col-12 col-md-6 mx-auto">
          <button type="button" class="btn btn-primary col-12" @click="joinjio(event.userid)">
              Join Jio +
            </button>
            <p style="color:red">{{errormsg}}</p>
        </div>
      </div>
    </div>
  </div>
        
    </div>
    </div>

    <!-- {{event}}

        <h1>Welcome to {{event.username}}'s JIO!</h1>
        <h2>
            {{event.eventname}}
        </h2>

        {{event.userid}}
        <div>Description: {{event.activities[0].description}}</div>

        <div>Date: {{event.date.split('T')[0]}}</div>
        <div>Time start: {{event.date.split('T')[1]}}</div>

        <div>Activity/Activities</div>
     
            <div v-for="act , index in event.activities" :key="index">
                Activity {{index + 1}}
                <table>
                    <tr>
                        <td>name:</td> <td>{{act.name}}</td>
                    </tr>
                        <td>location:</td> <td>{{act.location}}</td>
                    
                    <tr>
                        <td>duration(min):</td> <td>{{act.duration}}</td>
                    </tr>
                </table>
                <br>
            </div>

            <button type='button' class='btn btn-primary col-6' @click="joinjio(event.userid)">Join Jio +</button>
            <p style="color:red">{{errormsg}}</p>

            <div>
                Participants (INSERT COUNT)
                <ul>
                    <li v-for="person in names" :key="person">
                        {{person}}
                    </li>
                </ul>

            </div> -->

</template>

<script>
import { getusers, getprivate, getpublic, getjiodetails, createjiolist, replacejiolist, displaypplgoing } from '../utils/index.js'


export default { 
    name :'jio details for both public and private',

    data(){
        
        return{
            eventId:'',
            event: '',
            errormsg:'',
            creatorid: '',
            peoplegoing: '',
            allusers:'',
            names:''
        }

    },

    methods:{
        getId() { 
            this.eventId = this.$route.params.idx
            var eventId = this.$route.params.idx
        },

        joinjio(creatorid) { 
            //check if key is empty, if empty then use create jiolist
            //aft tat both will call func to get the value with key=peoplegoing 
            //var array = value
            // array.push(myown uid)
            //call another function to put array as the new value

            var pplgoing = []
            getjiodetails(creatorid,this.eventId).then((value)=>{
                //means theres alr people going
                // console.log(value);
               
            }).catch((value)=>{
                console.log(value);
                if(value == 'empty'){
                    //then i js add this person in
                    createjiolist(creatorid,this.eventId).then((value)=>{
                        // js continue;
                    })
                }
            })
            //now confirm peoplegoing got some value, ill put this as pplgoing
            getjiodetails(creatorid,this.eventId).then((value)=>{
                //means theres alr people going
                // console.log(value);
                pplgoing = value

                if(pplgoing.length > 10){
                console.log('hit the max, cannot be more than 10 please pay premium');
            }
                if(pplgoing.length >= 1  && !pplgoing.includes(uid)){
                    this.errormsg = ('u alr in the party');
                }
                else{
                    //means i hvn push the person in so here push

                    // console.log('added');
                    var uid = localStorage.getItem("uid")
                    pplgoing.push(uid)
                    replacejiolist(creatorid,this.eventId,pplgoing)
                }
            }).catch((value)=>{
                console.log(value);  
            })
        },

        getnames(){ 
            var uidarray = this.peoplegoing
   
            // find usernames of the users
            const allusers = this.allusers
            //object with userid as keys
    
            console.log('in get names');
            console.log(allusers);
            var usernames = {}
            for(const user in allusers){ 
                //user is the key
                if(uidarray.includes(user)){
            
                    const username = allusers[user]['username']
                    usernames[user] = username
 
                }
            }
            this.names = usernames
        },

        displayDate() {
            const eventDate = this.event.date.split('T')[0];
            let fullDate = eventDate.split("-");
            let months = [
                "",
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ];
            let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            let eventD = new Date(fullDate);
            const date = eventD.getDay();
            return days[date] + ", " + months[parseInt(fullDate[1])] + " " + fullDate[2];
        },

        convertTime() {
            let time = this.event.date.split('T')[1];
            time = time.split(":");
            return (
                (time[0] >= 12 && (time[0] - 12 || 12) + ":" + time[1] + " PM") ||
                (Number(time[0]) || 12) + ":" + time[1] + " AM"
            );
        },

        getVenue() {
            return this.event.activities[0].location;
        },
    },

    created(){ 
        this.getId()
        //get public events
        getusers().then(
                (value) => 
                {
                    this.allusers = value
                }
               
            ).then((value) => console.log('finish loading')),

        getpublic().then((value) =>{ 
            
            const publickeys = Object.keys(value)

            if(publickeys.includes(this.eventId)){
                console.log('in get public');
                this.event = value[this.eventId]
            }

            this.creatorid = this.event.userid

            displaypplgoing(this.creatorid,this.eventId).then((value)=>{
                this.peoplegoing = value
                this.getnames()            
            })
            
        })
        .catch((message)=> {
            console.log(message);
            console.log('error');
        })
        
        //get private events 
        
        getprivate().then((value) => {
            
            const privatekeys = Object.keys(value) 
            if(privatekeys.includes(this.eventId)){
                this.event = value[this.eventId]
                this.creatorid = this.event.userid

                displaypplgoing(this.creatorid,this.eventId).then((value)=>{
                    this.peoplegoing = value
                    this.getnames()
                })
            }
            
            
        })
        
    }


}

</script>

<style lang="scss" scoped>

</style>