//These are to store events that the person is ATTENDING
//Please follow the structure for all other events that are created
//Used by scriptHome.js and event.js


var attending1 = {"eventName": 'Rick & Morty Trivia', "description": "Yo- You- You have to come to the red room Morty! There's trivia at the red room - bring you friends Morty!","tag": "tag2", "minute":40, "hour":19, "day":26, "month":10 ,"place": "Egypt", "location": {"latitude": 29.9792,
"longitude": 31.1342}}
var attending2 = {"eventName": 'DECO3500 Showcase', "description": "Meet the students from the Social & Mobile Computing subject and explore the projects they have created in response to challenges identified within the domains of Active Communities, Technology in Education and Supporting an Aging Population.","tag": "official", "minute":30, "hour":16, "day":26, "month":10 ,"place": "49-316", "location": {"latitude":-27.499407,
"longitude":153.015217}}


/* var attending2 = {'eventName': 'Marketing & Memes', "description": "There's going to marketing, there's going to be memes, and there's going to be 15kg of illicit substances. Get Keen!","tag": "tag2", "minute":30, "hour":07, "day":29, "month":10 , "place": "Sample2", "location": {"latitude": -27.4974511,
"longitude": 153.0154073}} */

var attending = {"1":attending1, "2":attending2};

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