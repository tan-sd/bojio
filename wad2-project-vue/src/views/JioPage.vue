<template>
    <div>
        <h1>Welcome to {{event.username}}'s JIO!</h1>
        <h2>
            {{event.eventname}}
        </h2>

        <div>Description: {{event.activities[0].description}}</div>

        <div>Date: {{event.date}}</div>

        <div>Activity/Activities</div>
     
            <div v-for="act , index in event.activities" :key="index">
                Activity {{index + 1}}
                <table>
                    <tr>
                        <td>name:</td> <td>{{act.name}}</td>
                    </tr>
                        <td>location:</td> <td>{{act.location}}</td>
                    
                    <tr>
                        <td>duration(min):</td> <td>{{act.duration}}</td>
                    </tr>
                </table>
                <br>
                
            </div>

            <button type='button' class='btn btn-primary col-6'>Join Jio +</button>

    </div>

</template>

<script>
import { getprivate, getpublic } from '../utils/index.js'


export default { 
    name :'jio details for both public and private',

    data(){
        
        return{
            eventId:'',
            event: ''
        }

    },

    methods:{
        getId(){ 
            this.eventId = this.$route.params.idx
            var eventId = this.$route.params.idx
        },
    },

    // computed:{ 
    //     get(){ 
    //         return this.$route.params.idx
    //       }
    // },

    created(){ 
        this.getId()
        //get public events

        getpublic().then((value) =>{ 
   
            const publickeys = Object.keys(value) 
            if(publickeys.includes(this.eventId)){
                console.log('in get public');
                this.event = value[this.eventId]
            }
     
        })
        .catch((message)=> {
          console.log(message);
          console.log('error');
        })


        //get private events 

        getprivate().then((value) => {

            const privatekeys = Object.keys(value) 
            if(privatekeys.includes(this.eventId)){
                console.log('in get private');
                this.event = value[this.eventId]
            }


        })
    }


}

</script>

<style lang="scss" scoped>

</style>