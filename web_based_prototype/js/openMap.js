var arrayAttendingEvents;
var pos;
var infoWindow;
var currentLat;
var currentLat;

$(document).on('click','.mapButton',function(){
	var clickedName = $(this).parent('.card-left').parent('.event-card').attr('id');
	
	//if map is clicked on events else its home page
	if(arrayAttendingEvents){
		for(i=0 ; i<arrayAttendingEvents.length ; i++){

			if(arrayAttendingEvents[i].eventName == clickedName){
				
				currentLat = arrayAttendingEvents[i].location.latitude;
				currentLng = arrayAttendingEvents[i].location.longitude;
				
				console.log(currentLng);
			}
		}
	}
	else if(eventsArray){
		for(i=0 ; i<eventsArray.length ; i++){

			if(eventsArray[i].eventName == clickedName){
				
				currentLat = eventsArray[i].location.latitude;
				currentLng = eventsArray[i].location.longitude;
				
				console.log(currentLng);
			}
		}
	}
	else{
		currentLat = ($(this).parent('.card-left').parent('.event-card').children('.lat').html());
		
		currentLng = ($(this).parent('.card-left').parent('.event-card').children('.long').html());
	}
	
	$.colorbox({
        height:"95%", 
        width: '100%', 
        html: "<div id='myLocation'><img src='images/location.png'></div><div id='map'></div>",
		onLoad: true
    });
	
	$(document).bind('cbox_complete', function(){
		myMap();
		
		
		//need to change this LatLng to be the event location
		var myCenter = new google.maps.LatLng(currentLat, currentLng);
		var marker = new google.maps.Marker({position:myCenter});
		
		marker.setMap(map);
		marker.setVisible(true);
		
		map.setCenter(myCenter);
	});
	
});

$(document).on('click', '#myLocation', function(){
	currentLocation();
});

function myMap(){
	myLatLng = new google.maps.LatLng(-27.4974511, 153.0154073);
	
	map = new google.maps.Map( document.getElementById( 'map' ), {
		zoom: 16,
		center: myLatLng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	
	
	
	
	//put you position here
	infoWindow = new google.maps.InfoWindow;

	
	/* var myCenter = new google.maps.LatLng(-27.4974511, 153.0154073);
	var marker = new google.maps.Marker({position:myCenter});
	marker.setMap(map);
	marker.setVisible(true); */
}

function currentLocation(){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			infoWindow.setPosition(pos);
			infoWindow.setContent('Your Location is Here!');
			infoWindow.open(map);
			//map.setCenter(pos);
		},
		function() {
			handleLocationError(true, infoWindow, map.getCenter());
		});
	} else {
	  // Browser doesn't support Geolocation
	  handleLocationError(false, infoWindow, map.getCenter());
}
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
						  'Error: The Geolocation service failed.' :
						  'Error: Your browser doesn\'t support geolocation.');
	infoWindow.open(map);
}

