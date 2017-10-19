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

var attendingEvents ='';
var counter = 1;
$(document).ready(function(){
	
	attendingEvents = JSON.parse(sessionStorage.attending);

	//to be used to sort the array
	var arrayAttendingEvents = makeArray(attendingEvents);
	
	arrayAttendingEvents.sort(function(a, b){
		//sorts shortest month first
		
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
	console.log(arrayAttendingEvents[0]);
	
	for(i=0 ; i<arrayAttendingEvents.length ; i++){
		$('#event-scroll').append('<div class="event-card"><div class="card-left"><h1>'+ arrayAttendingEvents[i].hour+':'+arrayAttendingEvents[i].minute +'</h1><h1 class="building">'+ arrayAttendingEvents[i].place +'</h1></div><div class="card-right"><h2>'+ arrayAttendingEvents[i].eventName +'</h2><p>'+ arrayAttendingEvents[i].description +'</p><img class="arrow" src="images/downArrow.png"></div></div>');
	}
	
	/* $.each(attendingEvents, function(){
		
		
		if(attendingEvents[counter]){
			
			$('#event-scroll').prepend('<div class="event-card"><div class="card-left"><h1>'+ attendingEvents[counter].time +'</h1><h1 class="building">'+ attendingEvents[counter].place +'</h1></div><div class="card-right"><h2>'+ attendingEvents[counter].eventName +'</h2><p>'+ attendingEvents[counter].description +'</p><img class="arrow" src="images/downArrow.png"></div></div>');
		}
		
		counter++;
	}) */
	
})

$(document).on('click','.event-card',function(){
	$(this).children('.card-right').children('p').slideToggle('slow');
	$(this).children('.card-left').children('.building').slideToggle('slow');
});

function makeArray(json){
	
	var arr =[];
	
	for(var x in json){
		arr.push(json[x]);
	}
	
	return arr;
}