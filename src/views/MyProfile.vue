<template>
    <div class="container p-1 pb-1 pb-xl-5 px-xl-5 ">
        <div class="card mx-auto p-5 profile-outer-card">

        <!-- name and profile pic section start -->
        <div class="row">
            <!-- circle + big letter -->
            <div class="col-xl-3 col-12">
                <div class="rounded-circle profile-circle mx-auto">
                    {{friendObj.firstname[0].toUpperCase()}}
                </div>
            </div>

            
            <div class="col-xl-9 col-12 my-auto">

                <!-- full name -->
                <div class="profile-name text-xl-start text-center">
                    {{friendObj.firstname[0].toUpperCase() + friendObj.firstname.slice(1,friendObj.firstname.length) + ' ' + friendObj.lastname[0].toUpperCase() + friendObj.lastname.slice(1,friendObj.lastname.length) }}
                </div>

                <!-- user name -->
                <div class="text-xl-start text-center">
                    <span class="profile-username">@{{ friendObj.username }}</span>
                </div>


            </div>

        </div>
        <!-- name and profile pic section end -->


        <!-- public jios section start -->
        <div class="profile-public-header text-center my-4">Public Jios</div>
        <div class="row">
            

                <template v-for="jioObj in friendObj.createdjios" :key="jioObj">
                    <!-- <router-link :to="{ name: 'eachjioevent', params: { idx: jioId }}"> -->
                        <div v-if="countPublic() == 0" class="text-center p-5 card">
                            <div><h1><i class="orange-icon bi bi-balloon-fill"></i></h1></div>
                            <div>You currently do not have any public jios.</div>
                        </div>
                        <div v-else-if="ifPublic(jioObj)" class="profile-event-card card border-0 col-12 mx-auto p-3 pb-5">
                            <!-- <img class="card-img-top" src="../../../wallpaper1.jpg" alt=""> -->
                            <div class="profile-event-title">{{jioObj.eventname}}</div>
                            <div class="profile-event-location">Starts @ {{jioObj.activities[0].location}}</div>
                            <!-- slice to only show first three activities for the jio. users can click the event to see all -->
                            <div class="profile-activity-name card text-center p-2 m-1" v-for="activity in jioObj.activities.slice(0,3)" :key="activity">
                                {{activity.name}}
                            </div>
                            <div class="profile-view-more">
                                view more details
                            </div>
                        </div>
                    <!-- </router-link> -->
                </template>


        </div>
        <!-- public jios section end -->


        <!-- private jios section start -->
        <div class="profile-public-header text-center my-4">Private Jios</div>
        <div class="row">
            
            <!-- check if user is a friend, show private jios -->
            <div>
                <div v-if="countPrivate() == 0" class="text-center p-5 card">
                        <div><h1><i class="orange-icon bi bi-balloon-fill"></i></h1></div>
                        <div>You currently do not have any private jios.</div>
                </div>
                <template v-else>
                    <template v-for="jioObj in friendObj.createdjios" :key=jioObj>
                        <div v-if="jioObj.type == 'private'" class="profile-event-card card border-0 col-3 mx-auto p-3">
                            <!-- <img class="card-img-top" src="../../../wallpaper1.jpg" alt=""> -->
                            <div class="profile-event-title">{{jioObj.eventname}}</div>
                            <div class="profile-event-location">Starts @ {{jioObj.activities[0].location}}</div>
                            <!-- slice to only show first three activities for the jio. users can click the event to see all -->
                            <div class="profile-activity-name card text-center p-2 m-1" v-for="activity in jioObj.activities.slice(0,3)" :key="activity">
                                {{activity.name}}
                            </div>
                        </div>
                    </template>
                </template>
            </div>

        </div>
        <!-- private jios section end -->


        </div>
        <!-- end of outer card --> 
    </div> 
    <!-- end of container -->

</template>

<script>
import {getfriendrequests, deleteFriend, getusers, displayfriends, createfriendrequest} from '../utils'

export default{ 

    title: 'BOJIO – Friend List',
    name: 'friendpage',

    data(){
        return{
            searchedperson:'',
            allusers: [],
            viewDetails: null, //to show the view more button
            myFriends: '',
            showText: false,
            iconX: false,
            hover: false,
            deleteFriendPopUp: false,
            requested: false,
            allrequests: ''
        }
    },

    methods : {
        // checks if a given jio is public
        ifPublic(jioObj){
            if(jioObj.type == 'public'){
                return true
            }
            else {
                return false
            }
        },
        countPublic(){
            let count = 0
            for(let jioObj in this.friendObj.createdjios){
                if(this.friendObj.createdjios[jioObj].type == "public"){
                    count++
                }
            }
            return count
        },

        countPrivate(){
            let count = []
            for(let jioObj in this.friendObj.createdjios){
                if(this.friendObj.createdjios[jioObj].type == "private"){
                    count++
                }
            }
            return count

        },
    },
    computed: {


        latestnames(){

            console.log('in here');
            console.log(this.myFriends);
            return this.myFriends
        },
        // returns friend userid only
        friendId(){
            return this.$route.params.idx
        },

        // returns friend object with name,username and createdjios
        friendObj(){
            return this.allusers[this.$route.params.idx]
        },


        // check if current user is logged in
        isLoggedIn() {
            if(this.myuid.length>0){
                return true
            } else{
                return false
            }
        },

        // returns current user uid
        myuid(){
            return localStorage.getItem('uid')
        },

        // check if request still pending
        isRequesting(){
            if(Object.keys(this.allrequests).includes(this.myuid)){
                if(Object.keys(this.allrequests[this.myuid]).includes(this.friendId)){
                    return true
                }
            }
            return false
        }
        

    },

    created() {
       
        getusers().then(
            (value) => 
            {
                const temparray = []
                this.allusers = value
            }
        ),

        displayfriends().then(
            (value) =>
            { 
                this.myFriends = value
                console.log(this.myFriends)
                this.getfriendnames()
            }
        ),

        getfriendrequests().then(
            (value) =>
            { 
                this.allrequests = value
            }
        )
    },

    mounted() {
        console.log(this.myFriends)
    }
    
}

</script>