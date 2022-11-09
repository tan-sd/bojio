<template>
        <div class="container">
            <!-- display friend requests here first -->
            <div class="banner-header-form d-flex justify-content-center">Your Friends</div>
            <div v-if="!norequests">
                {{requests}}
                <div v-for="request, index in requests" :key="request">
                    <div>{{request}} id: {{index}}</div>
                    <button @click="accept(request, index)">Accept request</button>
                </div>
            </div>
        </div>
        <!-- v-if="Object.keys(myFriends).length == 0 " -->
        <div  class="container ">
            <div class="mb-3 d-flex justify-content-center" style="font-family:worksans-medium; font-size:1.5rem">Current Friends</div>
            <div class="row">
                <!-- <div class="friends-card card text-white m-2 col-lg-3 col-sm-6 col-12" v-for="friend, key in myFriends" :key="key">
                    <img src="../assets/images/defaultperson.jpg" class="card-img" alt="...">
                    <div class="card-img-overlay p-0">
                        <h5 class="card-title text-dark">{{friend}}</h5>
                    </div>
                </div> -->

                <!-- if no friends -->
                <div v-if="Object.keys(myFriends).length == 0" class="text-center">
                    It seems like you haven't added anyone. <br>
                    Add some friends below!
                    <hr>
                </div>

                <!-- if have friends -->
                <div v-else class="col-lg-4 col-md-6 mb-5 d-flex justify-content-center" v-for="friend, key in myFriends" :key="key">
                        <router-link class="routerLink" :to="{ name:'individual profile', params:{idx: userid, createdjios: user.createdjios}}">
                            <div class="card border-0 friend-bar p-2 ps-3" style="width: 20rem; height: 5rem;">
                                <div class="row">
                                    <div class="col-3">
                                    <div class="rounded-circle" style="padding:7px 15px; font-size:30px; background: linear-gradient(90deg, #ef4136, #fbb040); color:white;">
                                        <span>{{user.username[0].toUpperCase()}}</span>
                                    </div>   
                                    <!-- <img class="rounded-circle border border-1" src="../assets/images/defaultperson.jpg" style="height: 60px; width:60px; display: inline;"> -->
                                    </div>
                                    <div class="col-9 my-auto">
                                        <span class="float-start" style="color:black;">{{user.username}}</span>
                                    </div>
                                </div>
                                    <!-- <img class="rounded-circle border border-1" src="../assets/images/defaultperson.jpg" style="height: 60px; width:60px; display: inline;">
                                    <span style="color:black; display: inline;">{{user.firstname}}</span> -->
                                <!-- <div class="card-body">
                                    
                                </div> -->
                                    <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
                                    <!-- <button type="button" style="background-color: rgb(255, 127, 45); color: white; padding: 1rem; font-family: worksans-semibold;" @click="add(userid)" :disabled="pressed==true" class="btn orange border border-3 mt-4 w-75">Add Friend</button> -->
                            </div>
                        </router-link>
                    </div>
            </div>

       
            <div class="row">
                
            </div>
            
            <div class="mb-3 d-flex justify-content-center" style="font-family:worksans-medium; font-size:1.5rem">Discover new friends</div>
            <span class="input-group mb-3 w-25 col-3 mx-auto mb-5">
                <input type="text" class="form-control" name="searchfriend" placeholder="Start typing to find a user..." v-model="searched">
            </span>
            <div class="container-fluid text-center">
                
                <div class="row">
                    <div class="col-lg-4 col-md-6 mb-5 d-flex justify-content-center" v-for="(user,userid) in filtereddata" :key="userid">
                        <router-link class="routerLink" :to="{ name:'individual profile', params:{idx: userid, createdjios: user.createdjios}}">
                            <div class="card border-0 friend-bar p-2 ps-3" style="width: 20rem; height: 5rem;">
                                <div class="row">
                                    <div class="col-3">
                                    <div class="rounded-circle" style="padding:7px 15px; font-size:30px; background: linear-gradient(90deg, #ef4136, #fbb040); color:white;">
                                        <span>{{user.username[0].toUpperCase()}}</span>
                                    </div>   
                                    <!-- <img class="rounded-circle border border-1" src="../assets/images/defaultperson.jpg" style="height: 60px; width:60px; display: inline;"> -->
                                    </div>
                                    <div class="col-9 my-auto">
                                        <span class="float-start" style="color:black;">{{user.username}}</span>
                                    </div>
                                </div>
                                    <!-- <img class="rounded-circle border border-1" src="../assets/images/defaultperson.jpg" style="height: 60px; width:60px; display: inline;">
                                    <span style="color:black; display: inline;">{{user.firstname}}</span> -->
                                <!-- <div class="card-body">
                                    
                                </div> -->
                                    <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
                                    <!-- <button type="button" style="background-color: rgb(255, 127, 45); color: white; padding: 1rem; font-family: worksans-semibold;" @click="add(userid)" :disabled="pressed==true" class="btn orange border border-3 mt-4 w-75">Add Friend</button> -->
                            </div>
                        </router-link>
                    </div>
                            <!-- <div class="d-flex">
                                <img src="../assets/images/defaultperson.jpg" class="card-img rounded-pill border border-1" style="height: 50px; width:auto" alt="...">
                                <h5>
                                    {{user.firstname}}
                                    <button @click="add(userid)" :disabled="pressed==true">Add Friend</button>
                                </h5>
                            </div>     -->
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
            searched:'',
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
                
            }else{ 
                //make request as an object
                // {userid: username}
                this.requests = temparray
                //find usernames of the users
                const allusers = this.allusers
                var usernames = {}
                for(const user in allusers){ 

                    //user is the key
                    console.log(user);
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
                console.log(objectlen);
            }
        },

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
            this.myfriends = usernames
        }
    },

    computed: {
        filtereddata(){ 
            var currentlist = this.allusers
            var temparray = []

            //user gives the key 
            for(let user in currentlist){
                //user is the person uid
                let person = currentlist[user]
                var username = person.username
                console.log(this.searched);
                if(username.toLowerCase().includes(this.searched.toLowerCase())){
                    temparray.push(currentlist[user])
                }
            }

            if(this.searched == ''){
                // when search not used i get everyone 
                temparray = currentlist
            }
            return temparray
        },
    },

    created() {
        
            // console.log('hi');
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