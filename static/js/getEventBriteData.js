//to get event brite data
// var eventName = document.getElementById('eventName');
// console.log(eventName);
// fetch(`https://www.eventbriteapi.com/v3/events/366597933287/?token=BXCX5BYSZT4CNPNSUFE2`)
// .then((response) => response.json())
// .then ((data) => {
//   eventName.innerText = data.name.text;
// })

// var objectCount = document.getElementById('objectCount');


function populateCards(){ 
  console.log('hi');
  for(var i = 3; i < 50; i++){
    url = `json/raw_response_(${i}).json`
    // console.log(url);
    getCards('notmainpage')
  }
  
}


function getCards(main){
  // console.log('hi');
  if(main == 'frommainpage'){
    url = `json/raw_response_(3).json`
  }
  console.log(url);
  // url = `json/raw_response_(3).json`
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    // objectCount.innerText = data.pagination.object_count
    // var count = data.pagination.object_count;

    // var inner_div = document.createElement('div')
    // inner_div.setAttribute('class', 'inner-slider')

    var inner_div = document.getElementsByClassName('inner-slider')[0]
    // console.log(inner_div);
    
    var allevents = data.events

    for(indiv_event of allevents){
      var card = document.createElement('div')
      card.setAttribute('class', 'card col-4')
      card.setAttribute('style', 'width: 20rem; height:400px')  
      // console.log(indiv_event);
      addthis = ''
      var name = indiv_event.name
      var image = indiv_event.image.url
      var startdate = indiv_event['start_date']
      var organiser = indiv_event['primary_organizer']['website_url']
      
      // console.log(typeof(organiser));
      // console.log(organiser);
      // console.log(indiv_event['primary_organizer']);
      // console.log(organiser);

      if(typeof(organiser) == String ){
        addthis += `<img src='${image}' class='card-img-top'>
      <div class='card-body'>
      <h5 class='card-title'>${name}</h5>
      <p class='card-text'>${startdate} 
      <br><br>
      </p>
      <a href='${organiser}' target = '_blank' class='btn btn-primary'>Original website</a>
      
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
      
      // console.log(organiser);
      // console.log(name, image, startdate, organiser);
      card.innerHTML = addthis
      // console.log(card);
      inner_div.appendChild(card)
    }


  })
}

var div = document.getElementsByClassName('slider-container upper-carousel')[0]


