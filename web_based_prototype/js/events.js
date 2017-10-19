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

$(document).ready(function(){
	
	attendingEvents = JSON.parse(sessionStorage.attending);
	
	//puts JSON into array so it can be sorted
	var arrayAttendingEvents = makeArray(attendingEvents);
	
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

		$('#event-scroll').append('<div class="event-card"><div class="card-left"><h1>'+ arrayAttendingEvents[i].hour+':'+arrayAttendingEvents[i].minute +'</h1><h1 class="building">'+ arrayAttendingEvents[i].place +'</h1></div><div class="card-right"><h2>'+ arrayAttendingEvents[i].eventName +'</h2><p>'+ arrayAttendingEvents[i].description +'</p><img class="arrow" src="images/downArrow.png"></div></div>');
		
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
	$(this).children('.card-left').children('.building').slideToggle('slow');
});

function makeArray(json){
	
	var arr =[];
	
	for(var x in json){
		arr.push(json[x]);
	}
	
	return arr;
}