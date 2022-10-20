<template>
    <div class="container">
        hi this is friend profile
        
        user id: {{friendid}}
        createdjios: {{jios}}
        <div>this is created jios too but show null{{ allusers[$route.params.createdjios]}}</div>
        
        My Events:
        <span>{{ allusers[$route.params.idx].createdjios }}</span>
        <br>
    
        First Name:
        <span>{{ allusers[$route.params.idx].firstname }}</span>
        <br>
        UserName:
        <span>{{ allusers[$route.params.idx].username }}</span>
        <br>
        Want to display out the events below
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