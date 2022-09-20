// function initMap() {

// var uluru = {
//     lat: 1.2977912298757994,
//     lng: 103.84941367049149
// };

// var map = new google.maps.Map (
//     document.getElementById('map'), {
//         zoom: 15, center: uluru
//     });

// var marker = new google.maps.Marker( {
//         position: uluru, map: map
//     });
// }

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

  //***********ROUTING****************//


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

const eventName = document.getElementById('eventName');
fetch(`https://www.eventbriteapi.com/v3/events/366597933287/?token=BXCX5BYSZT4CNPNSUFE2`)
.then((response) => response.json())
.then ((data) => {
  eventName.innerText = data.name.text;
})

const objectCount = document.getElementById('objectCount');
fetch(`/raw_response_eventbrite.json`)
.then((response) => response.json())
.then((data) => {
  // objectCount.innerText = data.pagination.object_count
  var count = data.pagination.object_count;
  console.log(count)
  for (i=0; i < count-1; i++) {
    objectCount.innerText += data.events[i].name + '\n'
  }
})