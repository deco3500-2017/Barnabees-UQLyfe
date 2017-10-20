
var map;
var marker;
var markers=[];
var map, infoWindow;
	
  function initMap() {
	myLatLng = new google.maps.LatLng(-27.4974511, 153.0154073);
	map = new google.maps.Map( document.getElementById( 'map' ), {
		zoom: 17,
		center: myLatLng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	infoWindow = new google.maps.InfoWindow;

	// Try HTML5 geolocation.
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(function(position) {
		var pos = {
		  lat: position.coords.latitude,
		  lng: position.coords.longitude
		};

		infoWindow.setPosition(pos);
		infoWindow.setContent('Your Location is Here!');
		infoWindow.open(map);
		map.setCenter(pos);
	  }, function() {
		handleLocationError(true, infoWindow, map.getCenter());
	  });
	} else {
	  // Browser doesn't support Geolocation
	  handleLocationError(false, infoWindow, map.getCenter());
	}
   
   loadEvents();
    
	}
	
      // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.


      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

	function loadEvents(){
		for (var i=0; i<events.length; i++){
       		var myLatLng = new google.maps.LatLng( events[i].location.latitude, events[i].location.longitude);
       		var description = events[i].description;
       		var title = events[i].eventName;
       		
       		marker = new google.maps.Marker( {position: myLatLng, map: map} );
       		markers.push(marker);
       		marker.setVisible(false);
       		console.log(markers);
       }
	}
	
	function changeMarker(marker, latitude, longitude){
		hideMarkers();
		revealMarker(marker, latitude, longitude);
	}
	
	function hideMarkers(){
		for (var i=0; i<markers.length; i++){
			markers[i].setVisible(false);
		}
	}
	
	function revealMarker(marker, latitude, longitude){
		marker.setVisible(true);
		map.panTo( new google.maps.LatLng( latitude, longitude ) );
	}

function moveMarker(latitude, longitude) {
    
    //delayed so you can see it move
    setTimeout( function(){ 
    
        marker.setPosition( new google.maps.LatLng( latitude, longitude ) );

        
    }, 1500 );

};



    