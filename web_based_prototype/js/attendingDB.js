var event1 = {"eventName": 'Dog', "description": "TEST", "minute":10, "hour":13, "day":20, "month":10 ,"place": "Sample", "location": {"latitude": -27.4974511,
"longitude": 153.0154073}}

var event2 = {'eventName': 'Cat', "description": "TEST", "minute":10, "hour":10, "day":29, "month":10 , "place": "Sample2", "location": {"latitude": -27.4974511,
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