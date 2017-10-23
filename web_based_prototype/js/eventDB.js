//You can add any event here by copying the object and putting in the details. Anything you put in will show up on event


var event1 = {"eventName": 'Google Talks', "description": "The head engineer of Google corp comes in and discussed the world. Lets talk privacy!!","tag": "official", "minute":10, "hour":19, "day":20, "month":10 ,"place": "Schonell Theatre", "location": {"latitude": -27.496853,
"longitude": 153.015950}};

var event2 = {"eventName": 'Snags Gr8 Court', "description": "Snags are a bubbling, $2 for 1. Drinks $1. All funds go to cancer.","tag": "food", "minute":10, "hour":19, "day":22, "month":10 ,"place": "Great Court", "location": {"latitude": -27.497580,
"longitude": 153.013216}};

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