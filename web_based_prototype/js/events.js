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
	console.log(attendingEvents);
	
	$.each(attendingEvents, function(){
		console.log(attendingEvents[counter]);
		
		if(attendingEvents[counter]){
			console.log(counter);
			$('#event-scroll').prepend('<div class="event-card"><div class="card-left"><h1>'+ attendingEvents[counter].time +'</h1><h1 class="building">location</h1></div><div class="card-right"><h2>'+ attendingEvents[counter].eventName +'</h2><p>'+ attendingEvents[counter].description +'</p><img class="arrow" src="images/downArrow.png"></div></div>');
		}
		
		counter++;
	})
	
	
	//for(i=1; i < attendingEvents.length;
	/* $('#event-scroll').prepend('<div class="event-card"><div class="card-left"><h1>'+ attendingEvents[1].time +'</h1><h1 class="building">location</h1></div><div class="card-right"><h2>'+ attendingEvents[1].eventName +'</h2><p>'+ attendingEvents[1].description +'</p><img class="arrow" src="images/downArrow.png"></div></div>'); */
})

$(document).on('click','.event-card',function(){
	$(this).children('.card-right').children('p').slideToggle('slow');
	$(this).children('.card-left').children('.building').slideToggle('slow');
});

$('h1').on('click',function(){
	console.log("CLICKED");
})