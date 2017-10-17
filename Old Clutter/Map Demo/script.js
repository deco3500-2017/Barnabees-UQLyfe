function initMap() {
        var adveng = {lat: -27.499678, lng: 153.015603};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 19,
          center: adveng
        });
        var marker = new google.maps.Marker({
          position: adveng,
          map: map
        });
      }
    

function updateMap(latitude, longitude){
	marker.setPosition( new google.maps.LatLng( latitude, longitude ) );
    map.panTo( new google.maps.LatLng( latitude, longitude ) );
}

initMap();