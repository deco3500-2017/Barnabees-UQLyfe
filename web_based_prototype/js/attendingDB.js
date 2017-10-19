//These are to store events that the person is ATTENDING
//Please follow the structure for all other events that are created
//Used by scriptHome.js and event.js


var event1 = {"eventName": 'Rick & Morty Trivia', "description": "Yo- You- You have to come to the red room Morty! There's trivia at the red room - bring you friends Morty!", "minute":00, "hour":19, "day":20, "month":10 ,"place": "Sample", "location": {"latitude": -27.4974511,
"longitude": 153.0154073}}

var event2 = {'eventName': 'Marketing & Memes', "description": "There's going to marketing, there's going to be memes, and there's going to be 15kg of illicit substances. Get Keen!", "minute":30, "hour":07, "day":29, "month":10 , "place": "Sample2", "location": {"latitude": -27.4974511,
"longitude": 153.0154073}}

var attending = {"1":event1,"2": event2};

$(document).ready(function(){
	console.log("linked to ATEENDINGDB");
	//if its already set, dont create
	if(sessionStorage.attending){
		console.log("session");
	}
	else{
		sessionStorage.setItem('attending', JSON.stringify(attending));
	}
	
})