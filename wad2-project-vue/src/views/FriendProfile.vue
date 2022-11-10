<template>

    <div class="container">
        <!-- <div v-for="(user,userid) in filtereddata" :key="userid">
            {{user.firstname}}
        </div> -->

        <!-- name -->
        <!-- <div class="row">
            <div class="col-3">
                <div class="rounded-circle" id="profile-circle">
                    <span class="" id="profile-letter">{{allusers[$route.params.idx].firstname[0].toUpperCase()}}</span>
                </div>
            </div>
            <div class="col-9">
                <span id="profile-name">{{ allusers[$route.params.idx].firstname + ' ' + allusers[$route.params.idx].lastname }}</span>
                <br>
                <span id="profile-usernmae  ">{{ allusers[$route.params.idx].username }}</span>

            </div>
        </div> -->

        <div>
            <div class="rounded-circle" id="profile-circle">
                <span class="" id="profile-letter">{{allusers[$route.params.idx].firstname[0].toUpperCase()}}</span>
            </div>
            <div>
                <span id="profile-name">{{ allusers[$route.params.idx].firstname + ' ' + allusers[$route.params.idx].lastname }}</span>
                <br>
                <span id="profile-usernmae  ">{{ allusers[$route.params.idx].username }}</span>
            </div>
        </div>
       
        
        user id: {{friendid}}
        createdjios: {{jios}}
        <div>this is created jios too but show null{{ allusers[$route.params.createdjios]}}</div>
        <hr>
        
        
        My Events:
        {{ allusers[$route.params.idx].createdjios }}
        <hr>
        First Name:
        <span>{{ allusers[$route.params.idx].firstname }}</span>
        <hr>
        UserName:
        <span>{{ allusers[$route.params.idx].username }}</span>
        <hr>
        Want to display out the events below
        <button @click="check">check</button>
    </div>

</template>

<script>
import {getusers} from '../utils'


export default{ 

    title: 'BOJIO – Friend List',
    name: 'friendpage',
   
  
    data(){
        return{
            searchedperson:'',
            allusers: [],
        }
    },

    methods : {
        check(){
            console.log(this.friendid);
            return ''
        },  
    },
    computed: {

        filtereddata(){ 
            var currentlist = this.allusers
            var temparray = []

            console.log(currentlist);
            //user gives the key 
            //currentlist[user] gives the user details
            for(const user in currentlist){
                const person = currentlist[user]
                const username = currentlist[user].username
                if(username.includes(this.searchedperson)){
                    console.log(user)
                    temparray.push(currentlist[user])
                }
            }

            if(this.searchedperson == ''){
                temparray = currentlist
            }

            return temparray
 
        },

        friendid(){
            return this.$route.params.idx
        },

        jios(){
            console.log(this.$route.params.idx.createdjios);
            return this.$route.params.idx.createdjios
        }
    },

    created() {
       
        getusers().then(
            (value) => 
            {
                const temparray = []
                this.allusers = value
            }
            
        ).then((value) => console.log('finish loading'))
    }
    
}

</script>