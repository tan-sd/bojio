<template>
    <main class="home">
    <!-- Welcome message -->
    <div class="container">
      <div class="row mb-5">
        <div id = 'personname' style="display:none"></div>
      </div>
    </div>

    <div class="container">
        <div class="row d-flex align-content-center justify-content-center">
        <div class="col-sm-3 col-4 d-flex align-content-center justify-content-center">
          <button class="btn" id="events">EVENTS</button>
        </div>
        <div class="col-sm-3 col-4 d-flex align-content-center justify-content-center">
          <button class="btn" id="public">PUBLIC JIOS</button>
        </div>
        <div class="col-sm-3 col-4 d-flex align-content-center justify-content-center">
          <button class="btn" id="private">PRIVATE JIOS</button> 
        </div>
      </div>
      </div>
    
    <div id='event-container' class="container mt-5" style="font-family: worksans-medium">
    </div>

    <div class="container">
        <div class="row">
          <div class="col-3"></div>
          <div class="col-sm-6 col-12">
            <button id="view-more" class="mb-3">View More</button>
          </div>
          <div class="col-lg-3 col-12 d-flex justify-content-lg-end justify-content-center mb-5">
            <span>Showing 
              <span id="card-count"></span> of 
              <span id="card-total"></span> events      
            </span>
          </div>
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