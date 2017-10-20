var event1 = {"eventName": 'Test1', "description": "Yo- You- You have to come to the red room Morty! There's trivia at the red room - bring you friends Morty!","tag": "tag2", "minute":00, "hour":19, "day":20, "month":10 ,"place": "Egypt", "location": {"latitude": 29.9792,
"longitude": 31.1342}};

var event2 = {"eventName": 'REST2', "description": "Yo- You- You have to come to the red room Morty! There's trivia at the red room - bring you friends Morty!","tag": "tag2", "minute":00, "hour":19, "day":20, "month":10 ,"place": "Egypt", "location": {"latitude": 29.9792,
"longitude": 31.1342}};

var events = {"1":event1,"2": event2};

$(document).ready(function(){
	console.log("linked to EVENTDB");
	//if its already set, dont create
	if(sessionStorage.events){
		console.log("session");
	}
	else{
		sessionStorage.setItem('events', JSON.stringify(events));
	}
	
})