<template>
        
        <div class="container">
            <h1>Find a Friend Page</h1>
            <div>I am {{myuid}}</div>
            <input type="text" name="searchfriend" v-model="searchedperson" placeholder="Search username">
        

            <button>Search</button>

            <!-- display friend requests here first -->
            <br><br>
            <div v-if="!norequests">
                friend req here
                <!-- {{requests}} -->
                <div v-for="request, index in requests" :key="request">
                    <div>{{request}} id: {{index}}</div>
                    <button @click="accept(request, index)">Accept request</button>
                </div>
            </div>

            <div v-else>
                No friend requests :(
            </div>

            <br><br>
<!--             
            <div class="ui icon input" style="width: 100%">
            <input type="text" placeholder="Search..." />
            <i class="search icon"></i>
            </div> -->

            <!-- need to remove my own id from this list after filtering -->
            <div class="ui cards">
            <div class="card ui fluid" v-for="(user, userid) in filtereddata" :key="user">
                <div class="content">
                    <router-link :to="{ name:'individual profile', params:{ idx: userid, createdjios: user.createdjios}}">
                        <p>{{user.username}}</p>
                    </router-link>
                </div>
                <span><button @click="add(userid)" :disabled="pressed==true">Add Friend</button></span>
            </div>
            </div>
        
        </div> 
</template> 

<script>

import {getusers, createfriendrequest, getfriendrequests, makefriends} from '../utils'

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
            searchedperson:'',
            allusers: [],
            pressed: false,
            allrequests: '',
            requests: '',
            norequests: false,
            // cannot disable button
        }
    },

    methods:{ 
        add(user){ 
            console.log(localStorage.getItem('uid'));
            console.log('hi i am receiver ' + user);
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
                console.log(sender);
                for (const receiver in friendrequests[sender]){ 
                    console.log(' this is receiver:' + receiver)
                    if(receiver == userid ){ 
                        console.log('here')
                        temparray.push(sender)
                    }
                }
            } //finish for loop

            console.log(temparray);
            if(temparray.length == 0){ 
                console.log('no friend requests');
                this.norequests = true
                
            }else{ 
                //make request as an object
                // {userid: username}
                console.log('there is at least 1 request');
                this.requests = temparray
                //find usernames of the users
                const allusers = this.allusers
                console.log(allusers);
                var usernames = {}
                for(const user in allusers){ 
                    //user is the key
                    // console.log(user);
                    if(temparray.includes(user)){
                
                        const username = allusers[user]['username']
                        usernames[user] = username
                        // usernames.push(username)
                    }
                }
                this.requests = usernames
                console.log(this.requests);
            }

        },

        //accept request
        accept(user, userid){ 
            console.log('retrieve friend id:' + userid);
            console.log(user);
            console.log(this.requests);
            console.log(this.requests[userid]);
            delete this.requests[userid]
            
            console.log(this.requests)
            
            makefriends(userid)
            var objectlen = Object.keys(this.requests).length
            if(objectlen === 0){
                console.log('now empty object');
                this.norequests = true
            }
            else{ 
                console.log(objectlen);
            }
        }
    },

    computed: {
        filtereddata(){ 
                //     return (this.allusers.value.filter((user) => { 
                //         return( user.username.toLowerCase().indexOf(this.searchedperson.toLowerCase()) != -1
                //         )
                //     }))
                // return this.allusers.filter(
                //     (search) =>this.allusers.length
                //     ? Object.keys(this.allusers[0])
                //     .some(key => '' + search[key]).toLowerCase().includes(this.searchedperson)
                //     : true
                // )
                // return Object.entries(this.allusers)     
                //     .filter(item => item.username == this.searchedperson)
                // return this.allusers
            var currentlist = this.allusers
            var temparray = []
            
            console.log(currentlist);
            //user gives the key 
            //currentlist[user] gives the user details
            for(const user in currentlist){
                const person = currentlist[user]
                const jios = currentlist[user]['createdjios']
                // console.log(jios);
                const username = currentlist[user].username
                if(username.includes(this.searchedperson)){
                    // console.log(user)
                    temparray.push(currentlist[user])
                }
            }

            if(this.searchedperson == ''){
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
                    const temparray = []
                    this.allusers = value
                    // for(const user in value){
                        // console.log(user);
                        // temparray.push(user)
                        // console.log(value[user].username);
                        // temparray.push(value[user].username)
                    // }
                    // console.log(temparray);
                    // this.allusers = temparray
                }
               
            ).then((value) => console.log('finish loading')),

            getfriendrequests().then(
                (value) =>
                { 
                    console.log(value);
                    this.allrequests = value
                    this.checkfriendrequest()
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