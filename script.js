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