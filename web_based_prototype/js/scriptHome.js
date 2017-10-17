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
});

$('.event-card').on('click',function(){
	console.log('clicked');
	$(this).children('.card-right').children('p').slideToggle('slow');
	$(this).children('.card-left').children('.building').slideToggle('slow');
})

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