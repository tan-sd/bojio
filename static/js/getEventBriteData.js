//to get event brite data
// var eventName = document.getElementById('eventName');
// console.log(eventName);
// fetch(`https://www.eventbriteapi.com/v3/events/366597933287/?token=BXCX5BYSZT4CNPNSUFE2`)
// .then((response) => response.json())
// .then ((data) => {
//   eventName.innerText = data.name.text;
// })

// var objectCount = document.getElementById('objectCount');

// var div = document.getElementsByClassName('slider-container upper-carousel')[0]

function populateCards(){ 
  console.log('hi');
  count = 0
  for(var i = 3; i < 55; i++){
    url = `json/raw_response_(${i}).json`
    getCards('notmainpage')
  }
  
}


function getCards(main){

  var file3 = false
  if(main == 'frommainpage'){
    url = `json/raw_response_(3).json`
    var file3 = true
  }

  if(url == `json/raw_response_(3).json` ){ 
    var file3 = true
  }

  //else file3 remains false
  fetch(url)
  .then((response) => response.json())
  .then((data) => {

    var inner_div = document.getElementsByClassName('container')[0]
    var allevents = data.events
    
    //becuz other json files are diff from the first file so need to do differently
    if(!file3){
      allevents = data.events.results
    }

    for(indiv_event of allevents){
      count += 1
      var card = document.createElement('div')
      card.setAttribute('class', 'card col-4')
      card.setAttribute('style', 'width: 17rem; height:400px')  
      // console.log(indiv_event);
      addthis = ''
      var name = indiv_event.name
      if(indiv_event.hasOwnProperty('image')){
        var image = indiv_event.image.url
      }
      else{
        //when they nv provide image  
        var image = '#'
      }
      
      var startdate = indiv_event['start_date']
      var organiser = indiv_event['primary_organizer']['website_url']

      //if file 3
      //this create card for each event
      // console.log(main);
      if(main == 'frommainpage'){
        if(typeof(organiser) === 'string' ){
          addthis += `<img src='${image}' class='card-img-top'>
        <div class='card-body'>
        <h5 class='card-title'>${name}</h5>
        <p class='card-text'>${startdate} 
        <br><br>
        </p>
        <a href='${organiser}' target = '_blank' button type ='button' class='btn btn-primary'>Original website</button>
        
        `
        }else{
          addthis += `<img src='${image}' class='card-img-top'>
        <div class='card-body'>
        <h5 class='card-title'>${name}</h5>
        <p class='card-text'>${startdate} 
        <br><br>
        </p>
        <a href='#'>No link for this event :( </a>
        
        `
        }
  
        card.innerHTML = addthis
  
        inner_div.appendChild(card)
      }
      else{ 
        //not file 3 then we need to make it row and col
        // var div = document.createElement('div')
        console.log(count);
        if(count % 4 == 0){
          row = document.createElement('div')
          // console.log(row)
          row.setAttribute('class', 'row')
          // row = `<div class ='row'>`
        }

        
        if(typeof(organiser) === 'string' ){
          addthis += `<img src='${image}' class='card-img-top'>
        <div class='card-body'>
        <h5 class='card-title'>${name}</h5>
        <p class='card-text'>${startdate} 
        <br><br>
        </p>
        <a href='${organiser}' target = '_blank' button type ='button' class='btn btn-primary'>Original website</button>
        
        `
        }else{
          addthis += `<img src='${image}' class='card-img-top'>
        <div class='card-body'>
        <h5 class='card-title'>${name}</h5>
        <p class='card-text'>${startdate} 
        <br><br>
        </p>
        <a href='#'>No link for this event :( </a>
        
        `
        }

        card.innerHTML = addthis
        row.appendChild(card) 
        console.log(row);
        if(count % 4 == 0){
        inner_div.appendChild(row)
        }
     

        console.log(inner_div);
       

      }
      


    }


  })
}




