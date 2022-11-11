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
                    {{ friendObj.firstname + ' ' + friendObj.lastname }}
                    <!-- to add <button> -->
                        <i class="bi bi-person-plus-fill ms-3"></i><!-- friend add button-->
                    <!-- to add </button>  -->
                </div>

                <!-- user name -->
                <div class="text-xl-start text-center">
                    <span class="profile-username">@{{ friendObj.username }}</span>
                </div>

            </div>

        </div>
        <!-- name and profile pic section end -->


        <!-- public jios section start -->
        <div class="profile-public-header text-center my-4"> {{friendObj.firstname}}'s Public Jios</div>
        <!-- {{ allusers[$route.params.idx].createdjios }} -->
        <div class="row">
            
<!-- 
            <template v-for="jioObj,jioId in friendObj.createdjios" :key="jioObj"> -->
            <template v-for="jioObj in friendObj.createdjios" :key="jioObj">
                <!-- <router-link :to="{ name: 'eachjioevent', params: { idx: jioId }}"> -->
                    <div v-if="ifPublic(jioObj)" class="profile-event-card card col-12 mx-auto p-3" @mouseover="viewDetails = true" @mouseout="viewDetails = null">
                        <!-- <img class="card-img-top" src="../../../wallpaper1.jpg" alt=""> --> 
                        <div class="profile-event-title">{{jioObj.eventname}}</div>
                        <div class="profile-event-location">Starts @ {{jioObj.activities[0].location}}</div>
                        <!-- slice to only show first three activities for the jio. users can click the event to see all -->
                        <div class="profile-activity-name card text-center p-2 m-1" v-for="activity in jioObj.activities.slice(0,3)" :key="activity">
                            {{activity.name}}
                        </div>
                        <div v-if="viewDetails == true" class="text-center text-secondary"> view more </div>
                    </div>
                <!-- </router-link> -->
            </template>

        </div>
        <!-- public jios section end -->


        <!-- private jios section start -->
        <div class="profile-public-header text-center my-4"> {{friendObj.firstname}}'s Private Jios</div>
        <div class="row">

            <!-- check if user is logged in, if not, show lock symbol -->
            <div v-if="!authStatus" class="text-center p-5 card bg-secondary text-light">
                <i class="profile-lock-icon bi bi-lock-fill"></i>
                You are not logged in.
                <div class="d-inline">
                    Log in or sign up and add {{friendObj.firstname}} as a friend by clicking on the 
                    <i class="bi bi-person-plus-fill"></i>
                    above!
                </div>
            </div> 

            <!-- if user has no private jios -->
            <div v-else-if="friendObj.createdjios.length == 0" class="text-center p-5 card">
                {{friendObj.firstname}} currently does not have any private jios.
            </div>
            
            <!-- check if user is a friend, show private jios -->
            <div v-else-if="friendId in myFriends">
                <template v-for="jioObj in friendObj.createdjios" :key=jioObj>
                    <div v-if="!ifPublic(jioObj)" class="profile-event-card card col-12 mx-auto p-3">
                        <!-- <img class="card-img-top" src="../../../wallpaper1.jpg" alt=""> -->
                        <div class="profile-event-title">{{jioObj.eventname}}</div>
                        <div class="profile-event-location">Starts @ {{jioObj.activities[0].location}}</div>
                        <!-- slice to only show first three activities for the jio. users can click the event to see all -->
                        <div class="profile-activity-name card text-center p-2 m-1" v-for="activity in jioObj.activities.slice(0,3)" :key="activity">
                            {{activity.name}}
                        </div>
                    </div>
                </template>
            </div>

            <!-- if user is not a friend, show lock symbol -->
            <div v-else class="text-center p-5 card bg-secondary text-light">
                <i class="profile-lock-icon bi bi-lock-fill"></i>
                <br>
                Private jios are only available for {{friendObj.firstname}}'s friends. 
                <div class="d-inline">
                    Add them as a friend by clicking on the <i class="d-inline bi bi-person-plus-fill"></i> above!
                </div>
                
            </div>

        </div>
        <!-- private jios section end -->


        </div>
        <!-- end of outer card --> 
    </div> 
    <!-- end of container -->

</template>

<script>
import {getusers, displayfriends} from '../utils'


export default{ 

    title: 'BOJIO – Friend List',
    name: 'friendpage',

    data(){
        return{
            searchedperson:'',
            allusers: [],
            viewDetails: null,
            myFriends: ''
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

        isMyFriend(){
            
        }
    },
    computed: {

        // returns friend userid only
        friendId(){
            return this.$route.params.idx
        },

        // returns friend object with name,username and createdjios
        friendObj(){
            return this.allusers[this.$route.params.idx]
        },


        // check if user is logged in
        authStatus() {
          return this.$route.query.status == 'notAuth' ?  true : false
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
            }
        )
    },
    
}

</script>