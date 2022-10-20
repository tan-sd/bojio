<template>
        
        <div class="container">
            <h1>Find a Friend Page</h1>
            
            <input type="text" name="searchfriend" v-model="searchedperson" placeholder="Search username">
            {{searchedperson}}

            <button>Search</button>
                
                <div>
                    <ul v-for="(user, userid) in allusers" :key="user">
                        <router-link :to="{ name:'individual profile', params:{ idx: userid}}">
              
                            <li>{{user.username}}</li>

                        </router-link>
                    </ul>
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
   
    components: {
    
    },
  
    data(){
        return{
            searchedperson:'',
            allusers: [],
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