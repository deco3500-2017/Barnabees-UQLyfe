var events;
var attendingEvents;
var nameAttendingArray = [];
var eventsSize = [];

$(document).ready(function(){
	//these function import the fake database
	events = JSON.parse(sessionStorage.events);
	attendingEvents = JSON.parse(sessionStorage.attending);
	
	//puts JSON into array so it can be sorted
	eventsArray = makeArray(events);

	//sorts all events in order
	eventsArray.sort(function(a, b){
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
	displayEvents(eventsArray);
	/* for(i=0 ; i<eventsArray.length ; i++){

		$('#event-container').append('<div id="'+eventsArray[i].eventName+'" class="event-card"><div class="lat">'+eventsArray[i].location.latitude+'</div><div class="long">'+eventsArray[i].location.longitude+'</div><div class="tag">'+ eventsArray[i].tag +'</div><div class="card-left"><h1><div class="hour">'+ eventsArray[i].hour+'</div>:<div class="minute">'+eventsArray[i].minute +'</div></h1><h1 class="building">'+ eventsArray[i].place +'</h1><p class="mapButton"><img src="images/map.png"></p></div><div class="card-right"><h2>'+ eventsArray[i].eventName +'</h2><p>'+ eventsArray[i].description +'</p><p class="attend">Attened</p><img class="arrow" src="images/downArrow.png"></div></div>');
		
		//if there is no date atm, add it at the top
		if($('.dayBreak').length == 0){
			$('#event-container').prepend("<div class='dayBreak' >" +eventsArray[i].day + "/" + eventsArray[i].month + "/17</div>");
		}
		
		//if the day changed, put in day break for display
		if(eventsArray[i+1]){
			if(eventsArray[i].day != eventsArray[i+1].day){
				$('#event-container').append("<div class='dayBreak' >" +eventsArray[i+1].day + "/" + eventsArray[i+1].month + "/17</div>");
			}
		}
		
	}
	
	
	$.each(attendingEvents, function(key, val){
		nameAttendingArray.push(val.eventName);
	});

	$.each(events, function(key, val){
		eventsSize.push(val.eventName);
	});
	
	
	for(i=0; i< nameAttendingArray.length; i++){
		for(j=0; j < eventsSize.length; j++){
			
			if(eventsSize[j] == nameAttendingArray[i]){

				//[id='content Module']
				$("[id='"+  nameAttendingArray[i] + "']").children('.card-right').children('.attend').remove();
				$("[id='"+  nameAttendingArray[i] + "']").children('.card-right').prepend("<img class='tick' src='images/tick.png'>");
				//$('#'+nameAttendingArray[i]+'  .card-right').prepend("<img class='tick' src='images/tick.png'>")
			}
			
		}

	} */
	
	
	
})
$(document).on('click', '#displayTag img', function(){
	console.log('test');
	$('#displayTag').slideUp('fast',function(){
		$('#displayTag').empty();
	})
	$('.tagButton').css('border','');
	$('.tagButton').css('border-radius','');
	
	$('#event-container').empty();
	displayEvents(eventsArray);
})
$(document).on('click', '.tagButton', function(){
	var tag = $(this).attr('id');
	var tagArray =[];
	
	console.log(tag);
	
	
	if($('#displayTag').length != 0){
		$('#displayTag').slideUp('fast',function(){
			$('#displayTag').empty();
			$('#displayTag').append(tag+"<img src='images/tag_icons/remove.png'>");
		});
		
		$('#displayTag').slideDown('fast');
	}else{
		$('#displayTag').empty();
		$('#displayTag').append(tag+"<img src='images/tag_icons/remove.png'>");
		$('#displayTag').slideDown('fast');
	}
	
	
	$('.tagButton').css('border','');
	$('.tagButton').css('border-radius','');
	
	$(this).css('border','solid 2px #db7ae2');
	$(this).css('border-radius','4px');
	
	$.each(events, function(key, value){
		if(value.tag == tag){
			tagArray.push(value);
		}
	})
	$('#event-container').empty();
	displayEvents(tagArray);
});

$(document).on('click', '.attend', function(){
	
	//removes attend button so it cant be attended twice
	$(this).slideUp('slow',function(){
		$(this).remove();
	});
	
	var title = $(this).siblings('h2').html();
	
	var time = $(this).parent('.card-right').parent('.event-card').children('.card-left').children('h1').html();
	
	var descriptionClick= $(this).siblings('p').html();
	
	var place = $(this).parent('.card-right').parent('.event-card').children('.card-left').children('.building').html();
	
	var hour = $(this).parent('.card-right').parent('.event-card').children('.card-left').children('h1').children('div.hour').html();
	
	var minute = $(this).parent('.card-right').parent('.event-card').children('.card-left').children('h1').children('div.minute').html();
	
	var latitude = $(this).parent('.card-right').parent('.event-card').children('div.lat').html();
	var longitude = $(this).parent('.card-right').parent('.event-card').children('div.long').html();

	
	var newEvent = {"eventName": title, "description": descriptionClick, "minute":minute, "hour":hour, "day":18, "month":12 ,"place": place, "location": 
	{"latitude": latitude,
	"longitude": longitude}
	}
	
	
	var currentSize = Object.keys(attendingEvents).length +1;
	var currentSizeString = (currentSize.toString());
	
	attendingEvents[currentSize] = newEvent;
	
	sessionStorage.removeItem('attending');
	sessionStorage.setItem('attending', JSON.stringify(attendingEvents));
	
	$(this).parent('.card-right').children('.tick').remove();
	$(this).parent('.card-right').prepend("<img class='tick' src='images/tick.png'>");
	//would also need to include a secont storage that holds all events
})

$(document).on('click','.event-card',function(){
	$(this).children('.card-right').children('p').slideToggle('slow');
	$(this).children('.card-left').children('.building, .mapButton').slideToggle('slow');
});
function displayEvents(fullArray){
	for(i=0 ; i<fullArray.length ; i++){
		
		if(fullArray[i].minute < 10){
			fullArray[i].minute = "0" + fullArray[i].minute;
		}
		
		$('#event-container').append('<div id="'+fullArray[i].eventName+'" class="event-card"><div class="lat">'+fullArray[i].location.latitude+'</div><div class="long">'+fullArray[i].location.longitude+'</div><div class="tag">'+ fullArray[i].tag +'</div><div class="card-left"><h1><div class="hour">'+ fullArray[i].hour+'</div>:<div class="minute">'+fullArray[i].minute +'</div></h1><p class="building">'+ fullArray[i].place +'</p><p class="mapButton"><img src="images/map.png"></p></div><div class="card-right"><h2>'+ fullArray[i].eventName +'</h2><p>'+ fullArray[i].description +'</p><p class="attend">Attened</p><img class="arrow" src="images/downArrow.png"></div></div>');
		
		//if there is no date atm, add it at the top
		if($('.dayBreak').length == 0){
			$('#event-container').prepend("<div class='dayBreak' >" +fullArray[i].day + "/" + fullArray[i].month + "/17</div>");
		}
		
		//if the day changed, put in day break for display
		if(fullArray[i+1]){
			if(fullArray[i].day != fullArray[i+1].day){
				$('#event-container').append("<div class='dayBreak' >" +fullArray[i+1].day + "/" + fullArray[i+1].month + "/17</div>");
			}
		}
		
	}
	
	
	$.each(attendingEvents, function(key, val){
		nameAttendingArray.push(val.eventName);
	});

	$.each(events, function(key, val){
		eventsSize.push(val.eventName);
	});
	
	
	for(i=0; i< nameAttendingArray.length; i++){
		for(j=0; j < eventsSize.length; j++){
			
			if(eventsSize[j] == nameAttendingArray[i]){

				//[id='content Module']
				$("[id='"+  nameAttendingArray[i] + "']").children('.card-right').children('.attend').remove();
				if($("[id='"+  nameAttendingArray[i] + "']").children('.card-right').children('.tick').length == 0){
					$("[id='"+  nameAttendingArray[i] + "']").children('.card-right').prepend("<img class='tick' src='images/tick.png'>");
				}
				
				//$('#'+nameAttendingArray[i]+'  .card-right').prepend("<img class='tick' src='images/tick.png'>")
			}
			
		}

	}
}
function makeArray(json){
	
	var arr =[];
	
	for(var x in json){
		arr.push(json[x]);
	}
	
	return arr;
}