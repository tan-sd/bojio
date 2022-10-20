<template>
        
        <div class="container">
            <h1>Find a Friend Page</h1>
            
            <input type="text" name="searchfriend" v-model="searchedperson" placeholder="Search username">
        

            <button>Search</button>

<!--             
            <div class="ui icon input" style="width: 100%">
            <input type="text" placeholder="Search..." />
            <i class="search icon"></i>
            </div> -->

            <div class="ui cards">
            <div class="card ui fluid" v-for="(user, userid) in filtereddata" :key="user">
                <div class="content">
                    <router-link :to="{ name:'individual profile', params:{ idx: userid, createdjios: user.createdjios}}">
                        <p>{{user.username}}</p>
                    </router-link>
                </div>
                <span><button>Add Friend</button></span>
            </div>
            </div>
        
        </div> 
</template> 

<script>

import {getusers} from '../utils'

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
            searchedperson:'',
            allusers: [],
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
            var currentlist = this.allusers
            var temparray = []

            console.log(currentlist);
            //user gives the key 
            //currentlist[user] gives the user details
            for(const user in currentlist){
                const person = currentlist[user]
                const jios = currentlist[user]['createdjios']
                console.log(jios);
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
            // return Object.entries(this.allusers)     
            //     .filter(item => item.username == this.searchedperson)
            // return this.allusers
        }
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
               
            ).then((value) => console.log('finish loading'))

        
    }
    
}

</script>