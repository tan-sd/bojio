<template>
        <div class="container">
            <!-- display friend requests here first -->
            <div class="banner-header-form d-flex justify-content-center">Your Friends</div>
            <div v-if="norequests">
                {{requests}}
                {{ username }}
                <div v-for="request, index in requests" :key="request">
                    <div>{{request}} id: {{index}}</div>
                    <button @click="accept(request, index)">Accept request</button>
                </div>
            </div>
        </div>

        <div class="container ">
            <div class="mb-3 d-flex justify-content-center" style="font-family:worksans-medium; font-size:1.5rem">Current Friends</div>
            <div class="row">
                <div class="input-group mb-3 w-25 mx-auto mb-5">
                    <input type="text" class="form-control" name="searchfriend" placeholder="Find a friend..." v-model="searchedfriends">
                </div>
            </div>

            <div class="row">
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
            </div>
            
            <div class="mb-3 d-flex justify-content-center" style="font-family:worksans-medium; font-size:1.5rem">Discover new friends</div>
            <span class="input-group mb-3 w-25 col-3 mx-auto mb-5">
                <input type="text" class="form-control" name="searchfriend" placeholder="Find a user..." v-model="searchedusers">
            </span>

            <div class="container-fluid text-center">
                <div class="row">
                    <div class="col-xl-4 col-md-6 mb-5 d-flex justify-content-center" v-for="(user,userid) in filtereddata" :key="userid">
                        <router-link class="routerLink" :to="{name:'individual profile', params:{idx: userid}}">
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
                </div>
            </div>    
        </div> 
</template> 

<script>

import {getusers, createfriendrequest, getfriendrequests, makefriends, displayfriends} from '../utils'

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
            myuid: '',
            searchedfriends:'',
            searchedusers:'',
            allusers: [],
            pressed: false,
            allrequests: '',
            requests: '',
            norequests: false,
            myFriends: '',
            // cannot disable button
        }
    },

    methods:{ 
        add(user){ 
            createfriendrequest(user)
            // this.pressed = true
            //need to disable specific button after clicking
        },

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
        accept(user, userid){ 
            delete this.requests[userid]
            makefriends(userid)
            var objectlen = Object.keys(this.requests).length
            if(objectlen === 0){
                this.norequests = true
            }
            else{ 
                // console.log(objectlen);
            }
        },

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
        }
    },

    computed: {
        filterfriends() {
            // console.log(this.myFriends)
            var friendList = {};
            var temparray = [];
            for (let user in this.myFriends) {
                var username = this.myFriends[user]
                console.log(user)
                friendList[username] = user;
            }
            
            if (this.searchedfriends == '') {
                temparray = friendList;
            }
            return friendList
        },
        filtereddata() { 
            var currentlist = this.allusers;
            console.log(this.allusers);
            var temparray = [];
            //user gives the key 
            for (let user in currentlist) {
                //user is the person uid
                let person = currentlist[user];
                console.log(person);
                var username = person.username;
                if (username.toLowerCase().includes(this.searchedusers.toLowerCase())) {
                    temparray.push(currentlist[user]);
                }
            }

            if(this.searchedusers == '') {
                // when search not used i get everyone 
                temparray = currentlist;
            }
            console.log(temparray)
            return temparray;
        },
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
            
        ).then((value) => console.log('finish loading')),

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

<script setup>
// var a= {'tom': 'val1', 'david': 'val2'}
// console.log('the keys are ' + Object.keys(a));
// console.log(Object.keys(a).length);

// console.log('val of first key' + a['tom']);
// delete a['tom']

// console.log(a); //true

// //why when object.keys(true).length itll give 0 for === and ==
// var objectlen = Object.keys(a).length
// console.log(objectlen);
// if(objectlen == 0){
// console.log('now empty object');
// this.norequests = true

// }
// else{ 
// console.log(objectlen);
// }
</script>