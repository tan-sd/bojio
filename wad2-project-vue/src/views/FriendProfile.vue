<template>
    <div class="container">
        <div v-for="(user,userid) in filtereddata" :key="userid">
            {{user.firstname}}
        </div>

        {{friendname}}

        
        user id: {{friendid}}
        createdjios: {{jios}}
        <div>this is created jios too but show null{{ allusers[$route.params.createdjios]}}</div>
        <hr>
        
        
        My Events:
        <span>{{ allusers[$route.params.idx].createdjios }}</span>
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
        },

        friendname(){
            return this.$route.params
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