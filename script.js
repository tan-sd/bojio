function initMap() {

var uluru = {
    lat: 1.2977912298757994,
    lng: 103.84941367049149
};

var map = new google.maps.Map (
    document.getElementById('map'), {
        zoom: 15, center: uluru
    });

var marker = new google.maps.Marker( {
        position: uluru, map: map
    });
}

var markers = [{
    "timestamp": 'Alibaug',
    "latitude": '18.641400',
    "longitude": '72.872200',
    "description": 'Alibaug is a coastal town and a municipal council in Raigad District in the Konkan region of Maharashtra, India.'
  },
  {
    "timestamp": 'Mumbai',
    "latitude": '18.964700',
    "longitude": '72.825800',
    "description": 'Mumbai formerly Bombay, is the capital city of the Indian state of Maharashtra.'
  },
  {
    "timestamp": 'Pune',
    "latitude": '18.523600',
    "longitude": '73.847800',
    "description": 'Pune is the seventh largest metropolis in India, the second largest in the state of Maharashtra after Mumbai.'
  },
  {
    "timestamp": 'Bhopal',
    "latitude": '23.2599',
    "longitude": '73.857800',
    "description": 'Pune is the seventh largest metropolis in India, the second largest in the state of Maharashtra after Mumbai.'
  },
  {
    "timestamp": 'Bhopal',
    "latitude": '26.9124',
    "longitude": '75.7873',
    "description": 'Pune is the seventh largest metropolis in India, the second largest in the state of Maharashtra after Mumbai.'
  }
];
window.onload = function() {
  var mapOptions = {
    center: new google.maps.LatLng(markers[0].latitude, markers[0].longitude),
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  var infoWindow = new google.maps.InfoWindow();
  var lat_lng = new Array();
  var latlngbounds = new google.maps.LatLngBounds();
  for (i = 0; i < markers.length; i++) {
    var data = markers[i]
    var myLatlng = new google.maps.LatLng(data.latitude, data.longitude);
    lat_lng.push(myLatlng);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: data.timestamp
    });
    // console.log(i)

    latlngbounds.extend(marker.position);
    (function(marker, data) {
      google.maps.event.addListener(marker, "click", function(e) {
        infoWindow.setContent(data.timestamp);
        infoWindow.open(map, marker);
      });
    })(marker, data);
  }
  map.setCenter(latlngbounds.getCenter());
  map.fitBounds(latlngbounds);

  // ***********ROUTING****************//


  //Initialize the Direction Service
  var service = new google.maps.DirectionsService();

  //Loop and Draw Path Route between the Points on MAP
  for (var i = 0; i < lat_lng.length; i++) {
    if ((i + 1) < lat_lng.length) {
      var src = lat_lng[i];
      var des = lat_lng[i + 1];
      // path.push(src);

      service.route({
        origin: src,
        destination: des,
        travelMode: google.maps.DirectionsTravelMode.WALKING
      }, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

          //Initialize the Path Array
          var path = new google.maps.MVCArray();
          //Set the Path Stroke Color
          var poly = new google.maps.Polyline({
            map: map,
            strokeColor: '#4986E7'
          });
          poly.setPath(path);
          for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
            path.push(result.routes[0].overview_path[i]);
          }
        }
      });
    }
  }
}

//to get event brite data
// var eventName = document.getElementById('eventName');
// console.log(eventName);
// fetch(`https://www.eventbriteapi.com/v3/events/366597933287/?token=BXCX5BYSZT4CNPNSUFE2`)
// .then((response) => response.json())
// .then ((data) => {
//   eventName.innerText = data.name.text;
// })

// var objectCount = document.getElementById('objectCount');

//this is for main.html only (upcoming events)
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
  console.log(allevents);

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
    // console.log(name, image, startdate, organiser);
    card.innerHTML = addthis
    // console.log(card); 
    inner_div.appendChild(card)
  }

  
})

//function to loop through all files
// const path = require('path');
// const fs = require('fs');
// //joining path of directory 
// const directoryPath = path.join(__dirname, 'Documents');
// //passsing directoryPath and callback function
// fs.readdir(directoryPath, function (err, files) {
//     //handling error
//     if (err) {
//         return console.log('Unable to scan directory: ' + err);
//     } 
//     //listing all files using forEach
//     files.forEach(function (file) {
//         // Do whatever you want to do with the file
//         console.log(file); 
//     });
// });

function filecheck ()
{

}
var div = document.getElementsByClassName('slider-container upper-carousel')[0]
console.log(div);


// inner_div.setAttribute('style', 'width??')
addthis = ''



// {/* <div class='card' style='width: 18rem;'>
// <img src='./img/emo.png' class='card-img-top'>
// <div class='card-body'>
//   <h5 class='card-title'>Card title</h5>
//   <p class='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//   <a href='http://sunjun.site' class='btn btn-primary'>Go somewhere</a>
// </div>
// </div> */}

// {/* <div class="slider-container upper-carousel">
//       <h1>Upcoming Events</h1>
//       <div class="inner-slider">
//         <div class="card"></div>
//         <div class="card"></div>
//         <div class="card"></div>
//         <div class="card"></div>
//         <div class="card"></div>
//         <div class="card"></div>
//         <div class="card"></div>
//       </div>
//     </div> */}
// })

// registration form validation

function securityCheck(){
  msg='';
  var username=document.getElementById('name').value;
  var password=document.getElementById('password').value;
  var checkpassword=document.getElementById('checkpassword').value;

  console.log(username)
  console.log(password)
  console.log(checkpassword)

  function containsSpecialChars(str) {
  const specialChars =
    '[`!@#$%^&*()_+-=[]{};\':"\\|,.<>/?~]/';
  return specialChars
    .split('')
    .some((specialChar) => str.includes(specialChar));
  }
  
  

  if(username.length<8 || containsSpecialChars(username)){
    msg+='Please enter a valid username \n'
  }
  if(password!=checkpassword){
    msg+='Password and confirm password mismatch\n';
  }
  console.log(msg);
  if(msg!=''){
    alert(msg);
  }

}

// adding event
var count=0;
var activityTable=`<table><tr><th>No.</th><th>Activity</th><th>location</th><th>Duration</th></tr>`
function update(){
  var name=document.getElementById('activityName').value;
  var location=document.getElementById('location').value;
  var duration=document.getElementById('activityDuration').value;
  if(name=='' && location=='' && duration==''){
    alert('Please do not leave any fields empty');
  }
  if (isNaN(duration)){
    alert('Please enter a valid duration');
  }
  else{
    count+=1;
    activityTable+=`<tr><td>${count}</td><td>${name}</td><td>${location}</td><td>${duration}</td></tr>`
  }
  var placeholder=document.getElementById('result');
  placeholder.innerHTML=activityTable+`</table>`;
}



