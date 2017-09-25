var createdEvent = {"eventName":"", "eventTime" : 0, "eventDay" : 0, "eventMonth" : 0, "eventYear"  : 0, "tag" : "Food" };

$(document).ready(function(){
	
	
	var testJSON = {"eventName":"Lunch Date", "eventTime" : 11, "eventDay" : 30, "eventMonth" : 2, "eventYear"  : 2017, "tag" : "Food" };
	
	
});

$('#testForm').submit(function(event){
	event.preventDefault();
	createdEvent.eventName = $('#userEvent').val();
	createdEvent.eventTime = $('#userTime').val();
	$("div").append(createdEvent.eventName + " at "+ createdEvent.eventTime + " <br>   DATE: " + createdEvent.eventDay + "/" + createdEvent.eventMonth + "/" + createdEvent.eventYear +"<br>");
});