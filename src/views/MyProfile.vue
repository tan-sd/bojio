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
                <div v-if="countPublic() == 0" class="text-center p-5 card">
                    <div style="font-size:3rem"><i class="orange-icon bi bi-balloon-fill"></i></div>
                    <div>You currently do not have any public jios.</div>
                </div>
                <template v-for="jioObj,value in friendObj.createdjios" :key="jioObj">          
                    <template v-if="jioObj.type=='public'">
                        <div class="profile-event-card card border-0 col-12 mx-auto p-3 pb-5">
                            <div class="profile-event-title">{{jioObj.eventname}}</div>
                            <div class="profile-event-location mt-2 orange-icon">
                                {{ convertDate(jioObj.date.split("T")[0]) }}, {{convert24(jioObj.date.split("T")[1]) }}
                            </div>
                            <div class="profile-event-location">Starts @ {{jioObj.activities[0].location}}</div>
                            <div class="tagContainer mt-3">
                                <div class="badge text-bg-secondary">
                                    {{ jioObj.category }}
                                </div>
                            </div>
                            <router-link :to="{ name: 'eachjioevent', params: { idx: value }}" >
                                <div class="profile-view-more">
                                    click for more details
                                </div>
                            </router-link>
                        </div>
                    </template>
                </template>
            </div>
            <!-- public jios section end -->

            <!-- private jios section start -->
            <div class="profile-public-header text-center my-4">Private Jios</div>
            <div class="row">
                <!-- check if user is a friend, show private jios -->
                <!-- if user is friend but has no private jios -->
                <div v-if="countPrivate() == 0" class="text-center p-5 card">
                    <div><i style="font-size:3rem" class="orange-icon bi bi-balloon-fill"></i></div>
                    <div>You currently do not have any private jios.</div>
                </div>
                <template v-for="jioObj,value in friendObj.createdjios" :key=jioObj>                 
                    <div v-if="jioObj.type=='private' && countPrivate() > 0">
                        <!-- <img class="card-img-top" src="../../../wallpaper1.jpg" alt=""> -->
                        <div class="profile-event-card card border-0 col-12 mx-auto p-3 pb-5">
                            <div class="profile-event-title">{{jioObj.eventname}}</div>
                            <div class="profile-event-location mt-2 orange-icon">
                                {{ convertDate(jioObj.date.split("T")[0]) }}, {{convert24(jioObj.date.split("T")[1]) }}
                            </div>
                            <div class="profile-event-location">Starts @ {{jioObj.activities[0].location}}</div>
                            <div class="tagContainer mt-3">
                                <div class="badge text-bg-secondary">
                                    {{ jioObj.category }}
                                </div>
                            </div>
                            <router-link :to="{ name: 'eachjioevent', params: { idx: value }}" >
                                <div class="profile-view-more">
                                    click for more details
                                </div>
                            </router-link>
                        </div>
                    </div>
                </template>
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

    title: 'BOJIO – My Profile',
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
        convert24(time) {
            // console.log(time);
            time = time.split(":");
            return (
                (time[0] >= 12 &&
                    (time[0] - 12 || 12) + ":" + time[1] + " PM") ||
                (Number(time[0]) || 12) + ":" + time[1] + " AM"
            );
        },
        convertDate(fullDate) {
            // console.log(fullDate);
            fullDate = fullDate.split("-");
            var months = [
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
            var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            var eventD = new Date(fullDate);
            const date = eventD.getDay();
            return (
                days[date] +
                ", " +
                months[parseInt(fullDate[1], 10)] +
                " " +
                fullDate[2]
            );
        },
    },
    computed: {
        latestnames(){
            // console.log('in here');
            // console.log(this.myFriends);
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
            (value) => {
                const temparray = []
                this.allusers = value
            }
        ),
        displayfriends().then(
            (value) => { 
                this.myFriends = value
                // console.log(this.myFriends)
                this.getfriendnames()
            }
        ),
        getfriendrequests().then(
            (value) => { 
                this.allrequests = value
            }
        )
    },
    mounted() {
        // console.log(this.myFriends)
    }
}

</script>