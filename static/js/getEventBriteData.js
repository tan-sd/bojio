//to get event brite data
var eventName = document.getElementById('eventName');
console.log(eventName);
fetch(`https://www.eventbriteapi.com/v3/events/366597933287/?token=BXCX5BYSZT4CNPNSUFE2`)
.then((response) => response.json())
.then ((data) => {
  eventName.innerText = data.name.text;
})

// var objectCount = document.getElementById('objectCount');
fetch(`json/raw_response_(3).json`)
.then((response) => response.json())
.then((data) => {
  // objectCount.innerText = data.pagination.object_count
  // var count = data.pagination.object_count;

  // var inner_div = document.createElement('div')
  // inner_div.setAttribute('class', 'inner-slider')

  var inner_div = document.getElementsByClassName('inner-slider')[0]
  console.log(inner_div);
  
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
    // console.log(organiser);
    addthis += `<img src='${image}' class='card-img-top'>
    <div class='card-body'>
    <h5 class='card-title'>${name}</h5>
    <p class='card-text'>${startdate} 
    <br><br>
    </p>
    <a href='${organiser}' target = '_blank' class='btn btn-primary'>Original website</a>

    `
    console.log(name, image, startdate, organiser);
    card.innerHTML = addthis
    console.log(card);
    inner_div.appendChild(card)
  }

  
  // var addthis = ''
  // var tbody = document.getElementsByTagName('tbody')[0]
  // //loop through object to find key
  // for( i in objectname){
  //    var tr = document.createElement('tr')
  //    var cellone = i
  //    var celltwo= objectname[i]key
  //    var cell3 = objectname[i]key
  //    var cell4 = objectname[i]key
  //    //var percentage = fit/popln * 100
  //    //percentage = percentage.toFixed(1)
  //    tbody.appendChild(tr)
     
  //    addthis += ` <tr> 
  //        <td>${{2:cellone}}</td>
  //        <td>${celltwo}</td>
  //        <td>${cell3}</td>
  //        </tr>`
  //    tr.innerHTML = addthis 
  //    tbody.appendChild(tr)
  //    addthis = ''
  // console.log(inner_div.innerHTML);

  
  // console.log(image);
  // console.log(count)
  // for (i=0; i < count-1; i++) {
  //   objectCount.innerText += data.events[i].name + '\n'
  // }
})

var div = document.getElementsByClassName('slider-container upper-carousel')[0]
console.log(div);


// inner_div.setAttribute('style', 'width??')
addthis = ''

