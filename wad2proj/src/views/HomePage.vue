<template>
    <main class="home">
        <h1>Home</h1>
        <h1>
            All events
        </h1>
        <div class="container">
            <div class="row mb-5">
            <div id = 'personname' style="display:none"></div>
            </div>
        </div>


    <div class="container">
        <div class="row">
          <div class="col-3"></div>
          <div class="col-sm-6 col-12">
            <button id="view-more" class="mb-3">View More</button>
          </div>
          <!-- <div class="col-lg-3 col-12 d-flex justify-content-lg-end justify-content-center mb-5">
            <span>Showing 
              <span id="card-count"></span> of 
              <span id="card-total"></span> events      
            </span>
          </div> -->
        </div>
    </div>

        <div class="events">
            <div class="row">
                
                <router-link
                    v-for="event in events" :key="event['id']" :to="event['url']" >
                
                    <div class="col-3">
                        
                        <h1>{{event.name}}</h1>
                        <img :src="event.image.url" alt="">

                    </div>
                </router-link>
            </div>

        </div>
        

    </main>
</template> 

<script>
import sourceData from '../data.json'

export default {
    data(){
        return {
            events: sourceData.events
        }
    }
}
</script>