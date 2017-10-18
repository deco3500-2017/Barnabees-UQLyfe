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


$(document).ready(function(){
	
	$('#date').append(day +"/" + month + "/" + year);
	
	setTime('#time1');
	setTime('#time2');
	setTime('#time3');
	setTime('#time4');
});

$('.event-card').on('click',function(){
	$(this).children('.card-right').children('p').slideToggle('slow');
	$(this).children('.card-left').children('.building').slideToggle('slow');
})
$('.attend').on('click', function(){
	var title = $(this).siblings('h2').html();
	var time = $(this).parent('.card-right').parent('.event-card').children('.card-left').children('h1').html();
	console.log(time);
	var testJSON = {'title':title,'time':time};
	console.log(testJSON);
	
	//would actually need to check if users is set in storage then reset if it is
	sessionStorage.setItem('attending', JSON.stringify(testJSON));
	
	//would also need to include a secont storage that holds all events
})

//time should be set so that it doesnt change once a new user looks.
//or should it change completely so that its never over?
function setTime(id){
	var random = (10* Math.random());
	minute = minute + random;
	console.log(minute);
	
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