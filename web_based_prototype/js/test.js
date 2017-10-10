var person1 = {'name':'Perzon Wun', 'photo':'img/hass_gold.png', 'levelNumber':18,'date_created':"1 - 2 - 2017",'events_created':0,'events_attended':0,'events_missed':0, 'badges':{
	'sport':6,
	'study':7,
	'faculty':35,
	'food':25,
	'clubs':0,
	'misc':0,
	'hass':50,
	'bel':0,
	'eait':0,
	'habs':0,
	'med':0,
	'sci':14,
	'total_events':0,
	'events_in_period':0,
	'attendence_rate':0,
	'certain_level':0,
	'message_numbers':11,
	'share_number':0
	}
};

var person2 = {'name':'John Blow', 'photo':'img/hass_gold.png', 'levelNumber':10,'date_created':"1 - 5 - 2017",'events_created':0,'events_attended':0,'events_missed':0, 'badges':{
	'sport':6,
	'study':7,
	'faculty':35,
	'food':25,
	'clubs':0,
	'misc':0,
	'hass':50,
	'bel':0,
	'eait':0,
	'habs':0,
	'med':0,
	'sci':14,
	'total_events':0,
	'events_in_period':0,
	'attendence_rate':0,
	'certain_level':0,
	'message_numbers':11,
	'share_number':0
	}
};


var user = {'1': person1; '2': person2};

var userString = JSON.stringify(user);

$(document).ready(function(){
	
	sessionStorage.setItem("users", userString);
	console.log(JSON.parse(sessionStorage.users));
})
	
function 