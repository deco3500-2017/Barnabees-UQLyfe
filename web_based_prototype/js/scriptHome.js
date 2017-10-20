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

$(document).ready(function(){
	
	$('#date').append(day +"/" + month + "/" + year);
	
	attendingEvents = JSON.parse(sessionStorage.attending);
	
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
	
	
	setTime('#time1');
	setTime('#time2');
	setTime('#time3');
	setTime('#time4');
	
});

$('.event-card').on('click',function(){
	$(this).children('.card-right').children('p').slideToggle('slow');
	$(this).children('.card-left').children('.building').slideToggle('slow');
	$(this).children('.card-left').children('.mapButton').slideToggle('slow');
	
	
})
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

	
	console.log(minute);
	
	var newEvent = {"eventName": title, "description": descriptionClick, "minute":minute, "hour":hour, "day":day, "month":month ,"place": place, "location": 
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
	minute = minute + random;
	
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
	
}