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
	
	console.log(nameArray);
	
	/* console.log($('.event-card:nth-of-type(3)').html());
	console.log($('.event-card:nth-of-type(3)').html().indexOf('Ideas Hub Talk')); */
	
	//first for loop goes through every position
	for(i=2; i < 6 ; i++){
		for(j=0; j < nameArray.length; j++){
			console.log($('.event-card:nth-of-type('+ i +')').html().indexOf(nameArray[j]));
			
			if($('.event-card:nth-of-type('+ i +')').html().indexOf(nameArray[j]) != -1){
				$('.event-card:nth-of-type('+ i +') .attend').remove();
				$('.event-card:nth-of-type('+ i +')  .card-right').prepend("<img class='tick' src='images/tick.png'>")
				//could also add a tick in here.
			}
		}
	}
	/* if($('.event-card:nth-of-type(2)').html().indexOf('Ideas Hub Talk') != 1){
		$('.event-card:nth-of-type(2) .attend').remove();
		
		//could also add a tick in here.
	} */
	
	setTime('#time1');
	setTime('#time2');
	setTime('#time3');
	setTime('#time4');
});

$('.event-card').on('click',function(){
	$(this).children('.card-right').children('p').slideToggle('slow');
	$(this).children('.card-left').children('.building').slideToggle('slow',function(){
		var bottom = $(this).offset().top + $(this).outerHeight();
		var windowBottom = $('body').offset().top + $(this).outerHeight();
	});
	
	
})
$('.attend').on('click', function(){
	var title = $(this).siblings('h2').html();
	var time = $(this).parent('.card-right').parent('.event-card').children('.card-left').children('h1').html();
	var descriptionClick= $(this).siblings('p').html();
	
	var newEvent = {"eventName": title, "description": descriptionClick, "time":time, "location": {"latitude": -27.4974511,
	"longitude": 153.0154073}
	}
	
	//this cant be set to 3. it has to be able to be changed
	//console.log(Object.keys(attendingEvents).length); use this to get current JSON size!
	var currentSize = Object.keys(attendingEvents).length +1;
	var currentSizeString = (currentSize.toString());
	
	//console.log(currentSizeString);
	
	//tester[currentSize] = newEvent;
	
	//console.log(tester);
	
	//would actually need to check if users is set in storage then reset if it is
	
	attendingEvents[currentSize] = newEvent;
	
	//attendingEvents = $.extend(attendingEvents, tester);
	
	console.log(attendingEvents);
	
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
		$(id).append(hour + ": 0" + parseInt(minute));
	}
	else{
		$(id).append(hour + ": " + parseInt(minute));
	}
	
}