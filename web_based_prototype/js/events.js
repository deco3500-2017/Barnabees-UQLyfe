var events = [
	{
		eventName: "Rick and Morty Trivia Night",
		description: "Come to the red room",
		location: {
			latitude: -27.4974511,
			longitude: 153.0154073
		}
	},
	{
		eventName: "Marketing & Memes",
		description: "Study marketing or look at memes",
		location: {
			latitude: -27.500017,
			longitude: 153.015129
		}
	}
];

/* var arrayAttendingEvents;
var pos;
var infoWindow;
var currentLat;
var currentLat; */

$(document).ready(function(){
	
	attendingEvents = JSON.parse(sessionStorage.attending);
	
	//puts JSON into array so it can be sorted
	arrayAttendingEvents = makeArray(attendingEvents);
	
	//sorts all events in order
	arrayAttendingEvents.sort(function(a, b){
		if(a["month"] - b["month"] ==0){
			if(a["day"] - b["day"] == 0){
				if( a["hour"] - b["hour"] == 0){
					return a["minute"] - b["minute"];
				}
				else{
					return a["hour"] - b["hour"]
				}
			}
			else{
				return a["day"] - b["day"];
			}
		}
		else{
			return a["month"] - b["month"];
		}
		
	});
	
	//displays events in sorted array
	for(i=0 ; i<arrayAttendingEvents.length ; i++){

		$('#event-scroll').append('<div id="'+arrayAttendingEvents[i].eventName+'" class="event-card"><div class="card-left"><h1>'+ arrayAttendingEvents[i].hour+':'+arrayAttendingEvents[i].minute +'</h1><h1 class="building">'+ arrayAttendingEvents[i].place +'</h1><p class="mapButton"><img src="images/map.png"></p></div><div class="card-right"><h2>'+ arrayAttendingEvents[i].eventName +'</h2><p>'+ arrayAttendingEvents[i].description +'</p><img class="arrow" src="images/downArrow.png"></div></div>');
		
		//if there is no date atm, add it at the top
		if($('.dayBreak').length == 0){
			$('#event-scroll').prepend("<div class='dayBreak' >" +arrayAttendingEvents[i].day + "/" + arrayAttendingEvents[i].month + "/17</div>");
		}
		
		//if the day changed, put in day break for display
		if(arrayAttendingEvents[i+1]){
			if(arrayAttendingEvents[i].day != arrayAttendingEvents[i+1].day){
				$('#event-scroll').append("<div class='dayBreak' >" +arrayAttendingEvents[i+1].day + "/" + arrayAttendingEvents[i+1].month + "/17</div>");
			}
		}
		
	}

})

//displays lower parts or event
$(document).on('click','.event-card',function(){
	$(this).children('.card-right').children('p').slideToggle('slow');
	$(this).children('.card-left').children('.building, .mapButton').slideToggle('slow');
});

function makeArray(json){
	
	var arr =[];
	
	for(var x in json){
		arr.push(json[x]);
	}
	
	return arr;
}
/* Put into openMap.js. If you need to open a map use this!
$(document).on('click','.mapButton',function(){
	var clickedName = $(this).parent('.card-left').parent('.event-card').attr('id');
	
	
	for(i=0 ; i<arrayAttendingEvents.length ; i++){

		if(arrayAttendingEvents[i].eventName == clickedName){
			
			currentLat = arrayAttendingEvents[i].location.latitude;
			currentLng = arrayAttendingEvents[i].location.longitude;
			
			console.log(currentLng);
		}
	}
	$.colorbox({
        height:"95%", 
        width: '95%', 
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
	marker.setVisible(true); 
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

 */
    