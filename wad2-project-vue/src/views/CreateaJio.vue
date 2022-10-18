<template>
    <main class="securepage">
        <!-- <h1>Secure Page</h1> -->
        
        <div id="content">
        <div class="container-fluid text-center ">
          <div class="row mb-1">
            <div class="banner-header col">
              <h1 style="color:black">Create a Jio</h1>
            </div>
          </div>
        </div>

        <div class="container" id="info">
        <form id="form1">
              <h2 class="title1">Step 1: Event Details</h2>
              <div class="row mb-3">
                <input type="text" class="form-control" id="name" placeholder="event name">
              </div>
              
              <div class="row mb-3">
                <input type="date" class="form-control" id="date" placeholder="date">
              </div>
              
              <div class="row ms-1 mb-1">
                Type of Event:
                <div class="form-check">   
                    
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="public" >
                    <label class="form-check-label" for="exampleRadios1">
                      Public
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="private">
                    <label class="form-check-label" for="exampleRadios2">
                      Private
                    </label>
                  </div>
              </div>
              <hr>
              <div class="row ms-1 mb-1">
              <button type="button" class="btn orange border border-3" id="next1">Next</button>
              </div>
            </form> 

                    <form id="form2">
              <h2>Step 2: Add Activities</h2>
  
              <label for="activityName">Activity Name</label>
              <div class="form-group row pb-1">
                <input type="text" class="form-control" id="activityName" placeholder="Name of activity" >
              </div>
              <label for="location" class ='pt-2'>Location</label>
              <div class="form-group row pb-1">
              <input type="text" class="form-control" id="location" placeholder="Location">
              </div>
              <label for="activityDuration" class ='pt-2'>Duration of activity</label>
              <div class="form-group row pb-1">
                <input type="text" class="form-control" id="activityDuration" placeholder="Duration (mins)">
              </div>
  
              <div class="row">
                <button type="button" class="btn orange border border-3" id="addEvent" onclick="update()">Add event!</button>
              </div>
  
              <div class="row mt-3 " id="result">      
              </div>
  
              <div class="row">
                <button type="button" class="btn orange border border-3 mb-3" id="back1">Back</button>
              </div>
              
              <div class="row">
                <button type="button" class="btn orange border border-3 mb-3" id="next2" >Next</button>
              </div>
            </form> 

            <form id="form3">
              <h2>Route Overview</h2>
              <div class="row">
                <div id="map" style="width: 100%;height: 350px;"></div>
              </div>
              
  
              <div class="row">
                <button type="button" class="btn orange border border-3 mt-3" id="back2">Back</button>
              </div>
              
              <div class="row">
                <button type="button" class="btn orange border border-3 mt-3" id="submit">Submit</button>
              </div>
            </form>
        </div>
        </div>
        
    </main>
</template> 

  <script>
    export default {
      title: 'BOJIO – Create a Jio',
    }
  </script>