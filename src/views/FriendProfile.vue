<template>
    <div class="container p-1 pb-1 pb-xl-5 px-xl-5 ">
        <!-- darken the entire page -->
        <Transition name="fade">
            <div v-if="deleteFriendPopUp" class="profile-dark-background">
            </div>
        </Transition>
        <div class="card mx-auto p-5 profile-outer-card">
            <!-- pops up when you try to delete friend -->
            <Transition name="fade">
            <template v-if="deleteFriendPopUp">
                <div class="card container p-4 profile-delete-popup text-center">
                    <div class="row mb-3 ">
                        <h5 style="font-family:worksans-semibold">Delete Friend?</h5>
                        <span>Are you sure you want to delete {{friendObj.firstname[0].toUpperCase() + friendObj.firstname.slice(1,friendObj.firstname.length)}} as a friend?</span>
                    </div>
                    <div class="row">
                        <div class="col"><button class="profile-popup-button w-100" @click="removeFriend()">Yes</button></div>
                        <div class="col"><button class="profile-popup-button w-100" @click="deleteFriendPopUp=false">No</button></div>
                    </div>
                </div>
                
            </template>
            </Transition>

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

                    
                    <!-- if user is not logged in -->
                    <template v-if="!isLoggedIn">
                        <i class="profile-person-icon bi bi-person-plus-fill ms-3" @click="addError"></i>
                    </template>

                    <!-- if user is not a friend and is not being -->
                    <template v-else-if="!(Object.keys(myFriends).includes(friendId)) && !requested && !isRequesting">
                        <i class="profile-person-icon bi bi-person-plus-fill ms-3" @click="addFriend"></i>
                    </template>

                    <!-- if user is a friend -->
                    <template v-else-if="(Object.keys(myFriends).includes(friendId))">
                            <!-- allow to delete on hover -->
                            <span @mouseover="iconX=true" @mouseleave="iconX=false">
                                <i v-if="!iconX" class="profile-person-icon bi bi-person-check-fill ms-3"></i>
                                <i v-else class="profile-person-icon bi bi-person-x-fill ms-3" @click="deleteFriendPopUp=true"></i>
                            </span>
                        
                    </template>

                    <!-- if user is requesting -->
                    <template v-else-if="isRequesting || requested">
                        <i class="orange-icon bi bi-person-fill ms-3"></i> <span class="profile-side-text">requested</span>
                    </template>
                    

                </div>

                <!-- user name -->
                <div class="text-xl-start text-center">
                    <span class="profile-username">@{{ friendObj.username }}</span>
                </div>

                <!-- show error if not logged in and want to add -->
                <div v-if="showText" class="profile-error-div text-xl-start text-center mt-2">
                    <span class="profile-add-error text-danger" style="font-size: 1rem;"> please log in to add friend!</span>
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
                            <div><i class="orange-icon bi bi-balloon-fill"></i></div>
                            <div>{{friendObj.firstname[0].toUpperCase() + friendObj.firstname.slice(1,friendObj.firstname.length)}} currently does not have any public jios.</div>
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

            <!-- check if user is logged in, if not, show lock symbol -->
            <div v-if="!isLoggedIn" class="text-center p-5 card border-0 bg-secondary text-light">
                <i class="profile-lock-icon bi bi-lock-fill"></i>
                You are not logged in.
                <div class="d-inline">
                    Log in or sign up and add {{friendObj.firstname}} as a friend by clicking on the 
                    <i class="bi bi-person-plus-fill"></i>
                    above!
                </div>
            </div> 

            <!-- if user has no private jios -->
            <div v-else-if="countPrivate() == 0" class="text-center p-5 card">
                <div><i class="orange-icon bi bi-balloon-fill"></i></div>
                <div>{{friendObj.firstname[0].toUpperCase() + friendObj.firstname.slice(1,friendObj.firstname.length)}} currently does not have any private jios.</div>
            </div>
            
            <!-- check if user is a friend, show private jios -->
            <div v-else-if="Object.keys(myFriends).includes(friendId)">
                <template v-for="jioObj in friendObj.createdjios" :key=jioObj>
                    <div v-if="!ifPublic(jioObj)" class="profile-event-card card border-0 col-3 mx-auto p-3">
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
                    Add {{friendObj.firstname}} as a friend by clicking on the <i class="d-inline bi bi-person-plus-fill"></i> above!
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

        // notifies user if not logged in, cant add
        addError(){
            if(!this.showText){
                this.showText = true
            }
        },
        // change friend icon on hover (for current friends)
        changeIcon(){
            if(this.iconNormal){
                this.iconNormal = false
            }
            else {
                this.iconNormal = true
            }
        },
        // add friend (send them a request)
        addFriend(){
            createfriendrequest(this.friendId)
            this.requested = true

        },
        // delete friend
        removeFriend(){
            deleteFriend(this.friendId,this.myuid)
            this.deleteFriendPopUp = false
            delete this.myFriends[this.friendId]
        },

        // using after retreive user id, from this object change into user name. returns an objects with mulitple user names key== userid, value== username
        getfriendnames(){ 
            var friendsobj = this.myFriends
            console.log(this.myFriends)
            var temparray = []

            for( const personid in friendsobj ){ 
                temparray.push(personid)
            }
            // find usernames of the users
            const allusers = this.allusers
            var usernames = {}
            for(const user in allusers){
                //user is the key
                if(temparray.includes(user)){
                    const username = allusers[user]['username']
                    usernames[user] = username
                    // usernames.push(username)
                }
            }
            this.myFriends = usernames
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