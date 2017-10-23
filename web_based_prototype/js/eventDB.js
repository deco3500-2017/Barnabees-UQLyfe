//You can add any event here by copying the object and putting in the details. Anything you put in will show up on event


var event1 = {"eventName": 'Google Talks', "description": "The head engineer of Google corp comes in and discussed the world. Lets talk privacy!!","tag": "official", "minute":10, "hour":19, "day":29, "month":10 ,"place": "Schonell Theatre", "location": {"latitude": -27.496853,
"longitude": 153.015950}};

var event2 = {"eventName": 'Snags Gr8 Court', "description": "Snags are a bubbling, $2 for 1. Drinks $1. All funds go to cancer.","tag": "food", "minute":10, "hour":19, "day":27, "month":10 ,"place": "Great Court", "location": {"latitude": -27.497580,
"longitude": 153.013216}};

var event3 = {"eventName": 'Frisbee Toss', "description": "Looking for some people to come throw the frisbee. Nothing serious, only backhands.","tag": "sports", "minute":10, "hour":19, "day":26, "month":10 ,"place": "Grace Oval", "location": {"latitude": -27.494938,
"longitude": 153.007250}};

var events = {"1":event1,"2": event2, "3" :event3};

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