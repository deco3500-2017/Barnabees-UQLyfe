var d = new Date();
var year = d.getFullYear();
var month = d.getMonth() + 1;
var day = d.getDate();

//hours is 24 hour time just hour ie 1:24 pm = 13
var hour = d.getHours();
var minute = d.getMinutes();

var originalMinute = d.getMinutes();
var originalHour = d.getHours();

var maxHour = originalHour +1;

var attendingEvents ='';
var nameArray = [];

var events;

var setTime;
var timeArray =[];


$(document).ready(function(){
	
	$('#date').append(day +"/" + month + "/" + year);
	
	attendingEvents = JSON.parse(sessionStorage.attending);
	events = JSON.parse(sessionStorage.events);
	
	$.each(attendingEvents, function(key, val){
		nameArray.push(val.eventName);
	});

	
	//Checks to see if evenet has already been attended
	for(i=2; i < 6 ; i++){
		for(j=0; j < nameArray.length; j++){
			
			if($('.event-card:nth-of-type('+ i +')').html().indexOf(nameArray[j]) != -1){
				
				$('.event-card:nth-of-type('+ i +') .attend').remove();
				$('.event-card:nth-of-type('+ i +')  .card-right').prepend("<img class='tick' src='images/tick.png'>")
				//could also add a tick in here.
			}
		}
	}
	console.log(sessionStorage.timeSet);
	
	if(!sessionStorage.timeSet){
		timeArray.push(setTime('#time1'));
		timeArray.push(setTime('#time2'));
		timeArray.push(setTime('#time3'));
		timeArray.push(setTime('#time4'));
		
		sessionStorage.setItem('homeTime',JSON.stringify(timeArray));
		
		addToEvents()
		sessionStorage.setItem('timeSet',true);
	}else{
		var newTimeArray = JSON.parse(sessionStorage.homeTime);
		for(i=0; i < newTimeArray.length; i++){
			
			if(newTimeArray[i][1] < 10){
				newTimeArray[i][1] = '0' + parseInt(newTimeArray[i][1]);
				console.log(newTimeArray[i][1]);
				
				$('#time'+(i+1)).append("<div class='hour'>" +newTimeArray[i][0] + "</div>:<div class='minute'>" + (newTimeArray[i][1]) + "</div>");
			}else{
				$('#time'+(i+1)).append("<div class='hour'>" +newTimeArray[i][0] + "</div>:<div class='minute'>" + parseInt(newTimeArray[i][1]) + "</div>");
			}
			console.log(newTimeArray[i][1]);
			
		}
	}


});

$('.event-card').on('click',function(){
	$(this).children('.card-right').children('p').slideToggle('slow');
	$(this).children('.card-left').children('.building').slideToggle('slow');
	$(this).children('.card-left').children('.mapButton').slideToggle('slow');
	
	
})
function addToEvents(){
	for(i=2; i<6; i++){
		var selector = $('.event-card:nth-of-type('+ i +')');
		
		var title = selector.children('div.card-right').children('h2').html();
		var descriptionClick = selector.children('div.card-right').children('p').html();
		var minute = selector.children('div.card-left').children('h1').children('div.minute').html();
		var hour = selector.children('div.card-left').children('h1').children('div.hour').html();
		var place = selector.children('div.card-left').children('.building').html();
		var latitude = selector.children('.lat').html();
		var longitude = selector.children('.long').html();
		var tag = selector.children('.tag').html();
		
		var newEvent = {"eventName": title, "description": descriptionClick,"tag": tag, "minute":minute, "hour":hour, "day":day, "month":month ,"place": place, "location": 
			{"latitude": latitude,
			"longitude": longitude}
		}
		
		console.log(newEvent);
		var currentSize = Object.keys(events).length +1;
		var currentSizeString = (currentSize.toString());
		
		events[currentSize] = newEvent;
		
		sessionStorage.removeItem('events');
		sessionStorage.setItem('events', JSON.stringify(events));
		
		
		//$(this).parent('.card-right').prepend("<img class='tick' src='images/tick.png'>");
	}
}

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

	var tag = $(this).parent('.card-right').parent('.event-card').children('div.tag').html();

	
	var newEvent = {"eventName": title, "description": descriptionClick,"tag": tag, "minute":minute, "hour":hour, "day":day, "month":month ,"place": place, "location": 
	{"latitude": latitude,
	"longitude": longitude}
	}
	
	
	var currentSize = Object.keys(attendingEvents).length +1;
	var currentSizeString = (currentSize.toString());
	
	attendingEvents[currentSize] = newEvent;
	
	sessionStorage.removeItem('attending');
	sessionStorage.setItem('attending', JSON.stringify(attendingEvents));
	
	$(this).parent('.card-right').prepend("<img class='tick' src='images/tick.png'>");
	//would also need to include a secont storage that holds all events
})

//time should be set so that it doesnt change once a new user looks.
//or should it change completely so that its never over?
function setTime(id){
	var random = (10* Math.random());
	minute = 10 + minute + random;
	
	if(minute > 59){
		minute = random;
		hour = hour + 1;
	}
	
	if(hour == maxHour && minute == originalMinute){
		minute = originalMinute;
		hour = maxHour;
	}
	
	if(minute <10 ){
		$(id).append("<div class='hour'>" +hour+ "</div>:<div>0</div><div class='minute'>" + parseInt(minute) + "</div>");
	}
	else{
		$(id).append("<div class='hour'>" +hour + "</div>:<div class='minute'>" + parseInt(minute) + "</div>");
	}
	
	var combined = [hour, minute];
	console.log(combined);
	return combined;
	//console.log(timeArray);
}