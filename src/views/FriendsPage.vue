<template>
        <div class="container">
            <!-- display friend requests here first -->
            <div class="mb-3 d-flex justify-content-center" style="font-family:worksans-medium; font-size:1.5rem">Friend Requests</div>
            <div v-if="!norequests" class="">
                <div class="row">
                
                    <div class="col-xl-4 col-md-6 mb-5 d-flex justify-content-center" v-for="requester, requesterId in requests" :key="requester">    
                            <div class="card border-0 friend-bar p-2 ps-3" style="width: 20rem; height: 5rem;">
                                <div class="row">
                                    <div class="col-3">
                                        <!-- link to profile on the circle -->
                                        
                                        <router-link class="routerLink" :to="{name:'individual profile', params:{idx: requesterId}}">
                                            <div class="rounded-circle" style="padding:7px 15px; font-size:30px; background: linear-gradient(90deg, #ef4136, #fbb040); color:white;">
                                                <span class="d-flex justify-content-center">{{requester[0].toUpperCase()}}</span> 
                                            </div>   
                                        </router-link>
                                    </div>
                                    <div class="col-5 my-auto">
                                        <!-- link to profile on username -->
                                        <router-link class="routerLink" :to="{name:'individual profile', params:{idx: requesterId}}">
                                            <span class="float-start friend-requester my-auto" style="color:black;">{{requester}}</span>
                                        </router-link>
                                    </div>
                                    <div class="col-4 align-self-center">
                                        <span class="friend-request-icons row">
                                            <span class="col p-0 text-center"><i class="bi bi-check-circle friend-tick" @click="acceptRequest(requester, requesterId)"></i></span>
                                            <span class="col p-0 text-start"><i class="bi bi-x-circle friend-x" @click="deleteRequest(requesterId,myuid)"></i></span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        
                    </div>
                
                </div>
            </div>
            <div v-else class="text-center mb-5">
                <div  style="font-size:2rem"><i class="orange-icon bi bi-people-fill"></i></div>
                <div>No requests at the moment! </div>
            </div>
                
            <div class="mb-3 d-flex justify-content-center" style="font-family:worksans-medium; font-size:1.5rem">Current Friends</div>
            <div class="row">
                <div class="input-group mb-3 w-25 mx-auto mb-2 friend-search">
                    <input type="text" class="form-control" name="searchfriend" placeholder="Find a friend..." v-model="searchedfriends">
                </div>
            </div>
            <div class="row mb-5">
                
                <template v-if="Object.keys(filterfriends).length > 0">
                    <div class="col-xl-4 col-md-6 mb-5 d-flex justify-content-center" v-for="key, friend in filterfriends" :key="key">
                        <router-link class="routerLink" :to="{name:'individual profile', params:{idx: key}}">
                            <div class="card border-0 friend-bar p-2 ps-3" style="width: 20rem; height: 5rem;">
                                <div class="row">
                                    <div class="col-3">
                                        <div class="rounded-circle" style="padding:7px 15px; font-size:30px; background: linear-gradient(90deg, #ef4136, #fbb040); color:white;">
                                            <span class="d-flex justify-content-center">{{friend[0].toUpperCase()}}</span>
                                        </div>
                                    </div>
                                    <div class="col-9 my-auto">
                                        <span class="float-start" style="color:black;">{{friend}}</span>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </template>

                <div v-else class="text-center">
                    <div style="font-size:2rem"><i class="orange-icon bi bi-people-fill"></i></div>
                    <div>No friends found. <br> Add some users below. :) </div>
                </div>
            </div>
        </div>

            
            <div class="container">
                <div class="mb-3 d-flex justify-content-center" style="font-family:worksans-medium; font-size:1.5rem">Discover new friends</div>
                <div class="row">
                    <div class="input-group mb-3 w-25 mx-auto mb-5 friend-search">
                        <input type="text" class="form-control" name="searchfriend" placeholder="Find a user..." v-model="searchedusers">
                    </div>
                </div>
                <div class="container-fluid text-center">
                    <div class="row">
                        <template v-for="(user,userid) in filtereddata" :key="userid">
                            <div v-if="!(Object.keys(myFriends).includes(userid))" class="col-xl-4 col-md-6 mb-5 d-flex justify-content-center">
                                <router-link class="routerLink" :to="{name:'individual profile', params:{idx: user.userid}}">
                                    <div class="card border-0 friend-bar p-2 ps-3" style="width: 20rem; height: 5rem;">
                                        <div class="row">
                                            <div class="col-3">
                                            <div class="rounded-circle" style="padding:7px 15px; font-size:30px; background: linear-gradient(90deg, #ef4136, #fbb040); color:white;">
                                                <span>{{user.username[0].toUpperCase()}}</span>
                                            </div>
                                            </div>
                                            <div class="col-9 my-auto">
                                                <span class="float-start" style="color:black;">{{user.username}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </template>
                    </div>
                </div>
            </div> 
        
</template> 

<script>

import {removeRequest, getusers, createfriendrequest, getfriendrequests, makefriends, displayfriends} from '../utils'

// const data = {
//     name: 'to show users',
//     async setup(){
//         const information = await getusers()
//         return information 
//     },
//     template: `<div>{{information}}</div>`
// }


export default{ 

    title: 'BOJIO – Friend List',
    name: 'friendpage',
   
  
    data(){
        return{
            searchedfriends:'',
            searchedusers:'',
            allusers: [],
            pressed: false,
            allrequests: '',
            requests: '',
            norequests: false,
            myFriends: '',
            tick: true,
            // cannot disable button
        }
    },

    methods:{ 

        checkfriendrequest(){ 
            var friendrequests = this.allrequests
            var userid = localStorage.getItem('uid')
            this.myuid = userid
            var temparray = []

            for (const sender in friendrequests){ 
                //get sender id
                for (const receiver in friendrequests[sender]){ 

                    // if im the person that received, get all the req sent to me
                    if(receiver == userid ){ 
                        temparray.push(sender)
                    }
                }
            } //finish for loop

            if(temparray.length == 0){ 
                this.norequests = true
                
            } else { 
                //make request as an object
                // {userid: username}
                this.requests = temparray
                //find usernames of the users
                const allusers = this.allusers
                var usernames = {}
                for(const user in allusers){ 

                    //user is the key
                    // console.log(user);
                    if(temparray.includes(user)){
                
                        const username = allusers[user]['username']
                        usernames[user] = username
                    }
                }
                this.requests = usernames
            }
        },

        //accept request
        acceptRequest(requester, requesterId){ 
            delete this.requests[requesterId]
            makefriends(requesterId)
            this.filterfriends[requester] = requesterId
            var objectlen = Object.keys(this.requests).length
            if(objectlen === 0){
                this.norequests = true
            }
        },

        //delete request
        deleteRequest(requesterId, myuid){
            delete this.requests[requesterId]
            removeRequest(requesterId,myuid)
            var objectlen = Object.keys(this.requests).length
            if(objectlen === 0){
                this.norequests = true
            }

        },

        // using after retreive user id, from this object change into user name. returns an objects with mulitple user names key== userid, value== username
        getfriendnames(){ 
            var friendsobj = this.myFriends
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
        }
    },

    computed: {
        filterfriends() {

            var friendList = {};
            var temparray = {};
            for (let user in this.myFriends) {
                var username = this.myFriends[user]

                friendList[username] = user;
            }
            for (let friend in friendList) {
                if (friend.toLowerCase().includes(this.searchedfriends.toLowerCase())) {
                    temparray[friend] = friendList[friend]

                }
            }
            if (this.searchedfriends == '') {
                temparray = friendList;
            }

            return temparray
        },
        filtereddata() { 
            var currentlist = this.allusers;
            var temparray = [];
            //uid gives the key 
            for (let uid in currentlist) {
                let userDetails = currentlist[uid];
                userDetails['userid'] = uid
                var username = userDetails.username;
                if (username.toLowerCase().includes(this.searchedusers.toLowerCase())) {
                    temparray.push(userDetails);
                }
            }

            if(this.searchedusers == '') {
                // when search not used i get everyone 
                temparray = currentlist;
            }

            return temparray;
        },

        myuid(){
            return localStorage.getItem('uid')
        }
    },

    created() {
        getusers().then(
            (value) => 
            {
                var uid = localStorage.getItem('uid')
                
                //remove current user from being displayed
                delete value[uid]
                
                this.allusers = value
            }
            
        ).then((value) => console.log('loading complete!')),

        getfriendrequests().then(
            (value) =>
            { 
                this.allrequests = value
                this.checkfriendrequest()
            }
        )

        displayfriends().then(
            (value) =>
            { 
                this.myFriends = value
                this.getfriendnames()
            }
        )
    }
}

</script>