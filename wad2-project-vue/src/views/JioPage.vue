<template>
    <div>
        <h1>Welcome to {{event.username}}'s JIO!</h1>
        <h2>
            {{event.eventname}}
        </h2>

        {{event.userid}}
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

            <button type='button' class='btn btn-primary col-6' @click="joinjio(event.userid)">Join Jio +</button>
            <p style="color:red">{{errormsg}}</p>

            <div>
                People going are:
                <ul>
                    <li v-for="person in names" :key="person">
                        {{person}}
                    </li>
                </ul>

            </div>
    </div>

</template>

<script>
import { TroisJSVuePlugin } from 'troisjs'
import { getusers, getprivate, getpublic, getjiodetails, createjiolist, replacejiolist, displaypplgoing } from '../utils/index.js'


export default { 
    name :'jio details for both public and private',

    data(){
        
        return{
            eventId:'',
            event: '',
            errormsg:'',
            creatorid: '',
            peoplegoing: '',
            allusers:'',
            names:''
        }

    },

    methods:{
        getId(){ 
            this.eventId = this.$route.params.idx
            var eventId = this.$route.params.idx
        },

        joinjio(creatorid){ 
            //check if key is empty, if empty then use create jiolist
            //aft tat both will call func to get the value with key=peoplegoing 
            //var array = value
            // array.push(myown uid)
            //call another function to put array as the new value

            var pplgoing = []
            getjiodetails(creatorid,this.eventId).then((value)=>{
                //means theres alr people going
                // console.log(value);
               
            }).catch((value)=>{
                console.log(value);
                if(value == 'empty'){
                    //then i js add this person in
                    createjiolist(creatorid,this.eventId).then((value)=>{
                        // js continue;
                       
                    })
                }
            })

            //now confirm peoplegoing got some value, ill put this as pplgoing
            getjiodetails(creatorid,this.eventId).then((value)=>{
                //means theres alr people going
                // console.log(value);
                pplgoing = value

                if(pplgoing.length > 10){
                console.log('hit the max, cannot be more than 10 please pay premium');
            }


                if(pplgoing.length >= 1  && !pplgoing.includes(uid)){
                    this.errormsg = ('u alr in the party');
                }
                else{
                    //means i hvn push the person in so here push

                    // console.log('added');
                    var uid = localStorage.getItem("uid")
                    pplgoing.push(uid)
                    replacejiolist(creatorid,this.eventId,pplgoing)
                }

               
            }).catch((value)=>{
                console.log(value);
                
            })

            

        },

        getnames(){ 
            var uidarray = this.peoplegoing
   
            // find usernames of the users
            const allusers = this.allusers
            //object with userid as keys
    
            var usernames = {}
            for(const user in allusers){ 
                //user is the key
                if(uidarray.includes(user)){
            
                    const username = allusers[user]['username']
                    usernames[user] = username
 
                }
            }
            this.names = usernames
        }
    },

    created(){ 
        this.getId()
        //get public events
        getusers().then(
                (value) => 
                {
                    this.allusers = value
                }
               
            ).then((value) => console.log('finish loading')),

        getpublic().then((value) =>{ 
            
            const publickeys = Object.keys(value)

            if(publickeys.includes(this.eventId)){
                console.log('in get public');
                this.event = value[this.eventId]
            }

            this.creatorid = this.event.userid

            displaypplgoing(this.creatorid,this.eventId).then((value)=>{
                console.log(value);
            })
            
        })
        .catch((message)=> {
            console.log(message);
            console.log('error');
        })
        
        //get private events 
        
        getprivate().then((value) => {
            
            const privatekeys = Object.keys(value) 
            if(privatekeys.includes(this.eventId)){
                this.event = value[this.eventId]
                this.creatorid = this.event.userid

                displaypplgoing(this.creatorid,this.eventId).then((value)=>{
                    this.peoplegoing = value
                    this.getnames()
                })
            }
            
            
        })
        
    }


}

</script>

<style lang="scss" scoped>

</style>