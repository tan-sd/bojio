<template>
    <div class="container">
        <div class="row">
            <div class="col d-flex justify-content-center">
                <img class="event-banner-card-image" id="goToTop" src="../../../wallpaper1.jpg" alt="">
            </div>
        </div>
    </div>

    <!-- scroll to top button -->
    <!-- <a id="event-scroll-top" href="#goToTop">
        scroll to top
    </a> -->

    <div class="container">
        <div class="text-center">
            <span class="event-header-details ">{{ event.eventname }}</span>
        </div>
        

        <div class="row mx-auto px-5">
        <div class="col-12 col-xl-6 mt-5 order-xl-first order-last" style="font-size:15px;background-color: ;">

            <div class="row mx-auto">
                <div class="public-section-header" >About</div>
                <div class="public-section-text" style="font-style:italic">{{event.activities[0].description}}</div>
            </div>

            <!-- creator -->
            <div class="row mx-auto my-3">
                <div class="public-section-header mb-1">Creator</div>
                <div>
                    <router-link class="routerLink" :to="{name:'individual profile', params:{idx: event.userid}}">
                        <div class="card border-0 friend-bar ps-3 " style="width: 13rem; height: 3.5rem;">
                                <div class="row">
                                    <div class="col-3 p-2">
                                        <div class="rounded-circle text-center" style="padding:3px 6px; font-size:20px; background: linear-gradient(90deg, #ef4136, #fbb040); color:white;">
                                            <span>{{event.username[0].toUpperCase()}}</span>
                                        </div>   
                                    </div>
                                    <div class="col-9 my-auto p-0">
                                        <span class="float-start p-0" style="color:black; font-size:15px">{{event.username}}</span>
                                    </div>
                                </div>
                            </div>
                    </router-link>
                </div>
            </div>

            <div class="row mx-auto my-3">
                <div class="public-section-header">Category</div>
                <div class="public-section-text" >{{event.category}}</div>
            </div> 

            <div class="row mx-auto my-3">
                <div class='public-section-header'>Number of slots filled:</div>
                <div class="public-section-text">{{peoplegoing.length}} / {{event.maxnumber}}</div>
            </div>

            <!-- participants -->
            <div class="row mx-auto my-3">
                <span class="public-section-header">Participants</span>
                <div v-for="username,userid in names" :key="userid" class="my-2">
                    <router-link class="routerLink" :to="{name:'individual profile', params:{idx: userid}}">
                            <div class="card border-0 friend-bar ps-3 " style="width: 13rem; height: 3.5rem;">
                                <div class="row">
                                    <div class="col-3 p-2">
                                        <div class="rounded-circle text-center" style="padding:3px 6px; font-size:20px; background: linear-gradient(90deg, #ef4136, #fbb040); color:white;">
                                            <span>{{username[0].toUpperCase()}}</span>
                                        </div>   
                                    </div>
                                    <div class="col-9 my-auto p-0">
                                        <span class="float-start p-0" style="color:black; font-size:15px">{{username}}</span>
                                    </div>
                                </div>
                            </div>
                    </router-link>
                </div>
            </div>
    
    <div class="row mx-auto">
        <div class="public-section-header">Activities</div>

        <div v-for="act , index in event.activities" :key="index" class="my-3">
            <div class='card' style='width: 18rem;'>                      
                <div class='card-body'>
                    <h5 class='card-title public-section-text'>{{act.name}}</h5>
                    <div class="mt-2"><i class="bi bi-calendar2-week-fill eventDate" style="margin-right: 10px"></i>{{ act.location }}</div>
                    <div class="mt-2"><i class="bi bi-clock-fill eventDate" style="margin-right: 10px"></i>{{ act.duration }} minutes</div>
                </div>
            </div> <!-- card -->
            
        </div>
    </div>
</div>
        <!-- map -->
<div class="col-12 col-xl-6 mt-5 order-xl-last order-first" style="position:relative" id="">

  
<div class="container mb-3 border card p-4 create-map-container">

<div class="row mb-3">
    <div class="public-section-header">Details</div>
    <div class="mt-2 public-section-text'"><i class="bi bi-calendar2-week-fill eventDate" style="margin-right: 10px"></i>{{ displayDate() }}, {{ convertTime() }}</div>
    <div class="mt-2 public-section-text'"><i class="bi bi-geo-alt-fill eventDate" style="margin-right: 10px"></i>{{ getVenue() }}</div>
</div>

<div class="col text-center">
  <GMapMap
    :center="center"
    :zoom="12"
    map-type-id="roadmap"
    style="width: 85; height: 40vmin"
    :options="options"
    ref="map"
  >
    <!-- <GMapMarker
      :key="marker.id"
      v-for="marker in markers"
      :position="marker.position"
    /> -->
  </GMapMap>
</div>
<div id="event-card-buttons" class="text-center row mt-3">

    <div class="col-12 col-md-6 mx-auto">
    <a :href="routeLink" target="_blank" id="event-route" class="col-12">
        <span id="howToGetThere">How To Get There</span>  
    </a>
    </div>
    <!-- need another section for max -->
    <div class="col-12 col-md-6 mx-auto">
        <div v-if="myuid == event.userid || peoplegoing.includes(myuid)">
            <button style="background-image: none; background-color:rgba(220,53,69,255); border:none;" type="button" class="btn btn-primary col-12" >
                Leave this event
            </button>
        </div>
        <div v-else-if="peoplegoing.length == event.maxnumber">
            <button type="button" class="btn btn-primary col-12" disabled>
                No Slots Left
            </button>
        </div>
        <div v-else>
            <button type="button" class="btn btn-primary col-12" @click="joinjio(event.userid)">
                Join Jio +
            </button>
        </div>
    </div>
</div>
</div>
</div>

</div>
</div>

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
            names:'',
            myuid:'',
            ownLat:'',
            ownLng:'',
            routeLink:'',
            locations:[],
            center: { lat: 1.3421, lng: 103.8198 },
            options: {
                zoomControl: false,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
                styles: [],
            },
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

            var myuid = localStorage.getItem('uid')

            console.log(this.event.userid);
            var pplgoing = []
            getjiodetails(creatorid,this.eventId).then((value)=>{
                //means theres alr people going
                console.log(value);
               
                if(myuid != creatorid){
                    
                    console.log('i am not the creator but i wan to join');
                    //enter here when empty is not returned from the promise
                    //and im not the creator
                    getjiodetails(creatorid,this.eventId).then((value)=>{
                        //means theres alr people going cuz not empty
                        console.log(value);
                        pplgoing = value
                            //replace this 10 with maxlimit 
                            if(pplgoing.length >= this.event.maxnumber){
                                this.errormsg = ('hit the max sorry!');
                            }
                            else if(pplgoing.length >= 1  &&  pplgoing.includes(myuid)){
                                console.log(' u alr inside ');
                                this.errormsg = ('u alr in the party');
                            }
                            else{
                                console.log('going to add u');
                                console.log(pplgoing);
                                console.log(myuid);
                                var uid = localStorage.getItem("uid")
                                pplgoing.push(uid)
                                replacejiolist(creatorid,this.eventId,pplgoing)
                                this.peoplegoing = pplgoing
                            }
                        }).catch((value)=>{
                            console.log(value);  
                        })
                    }
                    else{
                        console.log('i wont add to the key and wont add to peoplegoing array');
                    }
                }).catch((value)=>{
                    console.log(value);
                    // i wan to check if the creator is me if yes then idw to add
                    if(value == 'empty' && myuid != creatorid ){
                        //then i js add this person in
                        createjiolist(creatorid,this.eventId).then((value)=>{
                            // js continue;
                            // create list w my uid if no one has joined
    
                            //now confirm peoplegoing got some value, ill put this as pplgoing
                            getjiodetails(creatorid,this.eventId).then((value)=>{
                                //means theres alr people going
                                
                                //this will give the current array of ppl going
                                pplgoing = value
                                //replace this 10 with maxlimit 
                                if(pplgoing.length >= this.event.maxnumber){
                                    this.errormsg = ('hit the max sorry!');
                                }
                                else if(pplgoing.length > 1  && pplgoing.includes(myuid)){
                                    // means i alr prev joined before
                                    // need to be more than 1 because if prev no one inside then length is alr 1 
                                    console.log(' just added u in so array length 1 if js added so need > 1');
                                    this.errormsg = ('u alr in the party');
                                }
                            
                                else if(!pplgoing.includes(myuid)){
                                    // in else statement:
                                    // ppl going is 1 n its me 
                                    //means i hvn push the person in so here push
                
                                    // console.log('added');
                                    var uid = localStorage.getItem("uid")
                                    pplgoing.push(uid)
                                    replacejiolist(creatorid,this.eventId,pplgoing)
                                    this.peoplegoing = pplgoing
                                    //here means can push person in
                                }
                            }).catch((value)=>{
                                console.log(value);  
                            })
                        })
                    }
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

        userLocation() {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                this.ownLat=position.coords.latitude;
                this.ownLng=position.coords.longitude;
                this.routeLink+=this.ownLat+","+this.ownLng+"/"
                },
                (error) => {
                console.log(error.message);
                }
            );
            },
        allLocations(){

            console.log(this.event)
            for(var i=0;i<this.event.activities.length;i++){
                this.locations.push(this.event.activities[i].location);
            }
            return this.locations;
            }
    },

    computed:{
        eventloaded(){
            return this.event
        },

        numberofppl(){
            return this.peoplegoing
        }

    },
    // tempRoute(){
    //     var ans=""
    //     navigator.geolocation.getCurrentPosition(
            
    //         (position) => {
    //         this.ownLat=position.coords.latitude;
    //         this.ownLng=position.coords.longitude;
    //         ans= 'https://www.google.com/maps/dir/'+this.ownLat+","+this.ownLng+"/"

    //         console.log(ans)
    //         this.routeLink = ans
    //         return ans
    //         },
    //         (error) => {
    //         ans= error.message;
    //         },
    //         // console.log(ans)
            
    //     );
    //     return ''
    // }

 
    mounted(){
        var myuid = localStorage.getItem('uid')
        this.myuid = myuid
    },
    created(){ 
        
        // console.log(this.locations);
        // this.routeLink=this.tempRoute
        
       

                    
        
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
                var ans = ''
                
                if(publickeys.includes(this.eventId)){
                    
                    console.log('in get public');
                    this.event = value[this.eventId]
                    // console.log(this.event)
                    /////start

                    navigator.geolocation.getCurrentPosition(
                
                    (position) => {
                    this.ownLat=position.coords.latitude;
                    this.ownLng=position.coords.longitude;
                     ans= 'https://www.google.com/maps/dir/'+this.ownLat+","+this.ownLng+"/"

            
                    this.routeLink = ans

                    this.allLocations();
                    console.log(this.routeLink)
                    // console.log(this.locations)
                    for(var loc of this.locations){
                        this.routeLink+=loc+"/"
                        console.log(this.routeLink)
                    }
                
                    },
                    (error) => {
                    ans= error.message;
                    },
                    
                    
                    );

                    ///end
                   
                    
                    
                    
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
                var ans=""
                if(privatekeys.includes(this.eventId)){
                    this.event = value[this.eventId]
                    console.log(this.event)
                    navigator.geolocation.getCurrentPosition(
                
                    (position) => {
                    this.ownLat=position.coords.latitude;
                    this.ownLng=position.coords.longitude;
                    ans= 'https://www.google.com/maps/dir/'+this.ownLat+","+this.ownLng+"/"
    
            
                    this.routeLink = ans
    
                    this.allLocations();
                    console.log(this.routeLink)
                    // console.log(this.locations)
                    for(var loc of this.locations){
                        this.routeLink+=loc+"/"
                        console.log(this.routeLink)
                    }
                
                    },
                    (error) => {
                    ans= error.message;
                    },
                    
                    
                    );
    
                    this.creatorid = this.event.userid
                    
                    displaypplgoing(this.creatorid,this.eventId).then((value)=>{
                        this.peoplegoing = value
                        this.getnames()
                    })
                }
                
                
            })
            
        },
        
    

   

            
            
        }
        
        
    
    
</script>

<style lang="scss" scoped>

</style>