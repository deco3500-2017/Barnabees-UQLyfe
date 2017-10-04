var createdEvent = {"eventName":"", "eventTime" : 0, "eventDay" : 0, "eventMonth" : 0, "eventYear"  : 0, "tag" : "Food" };

//this is a test to understand the profile system with badges. not 100% that this is the best method, however we need to use an int to add show progress
var person1 = {'name':'TEMPLATE', 'photo':'path_to_photo', 'level':0,'date_created':0,'events_created':0,'events_attended':0,'events_missed':0, 'badges':{
	'sport':0,
	'study':0,
	'faculty':0,
	'food':0,
	'clubs':0,
	'misc':0,
	'hass':0,
	'bel':0,
	'eait':0,
	'habs':0,
	'med':0,
	'sci':0,
	'total_events':0,
	'events_in_period':0,
	'attendence_rate':0,
	'certain_level':0,
	'message_numbers':0,
	'share_number':0
	}
};
// To get level score - SQRT(level) will give you a number, than convert to int (drop the decimal) WOULD need to keep decimal as percent of progress.
var check= checkBadgeColour(person1, 'sport', false, 200, 100, 40);
var check2= checkBadgeColour(person1, 'food', false, 400, 200, 100);
$(document).ready(function(){
	
	$('#structure').append(JSON.stringify(person1, undefined, 2));

	quickDisplay(check, '#displayPerson', 'sport');
	quickDisplay(check2, '#displayPerson2', 'food');
	
});

/* $('#testForm').submit(function(event){
	event.preventDefault();
	createdEvent.eventName = $('#userEvent').val();
	createdEvent.eventTime = $('#userTime').val();
	$("div#add").append(createdEvent.eventName + " at "+ createdEvent.eventTime + " <br>   DATE: " + createdEvent.eventDay + "/" + createdEvent.eventMonth + "/" + createdEvent.eventYear +"<br>");
}) */
$('#addSport').submit(function(event){
	event.preventDefault();
	
	if(isNaN($('#numberSport').val()/2) == false){
		var addValue = parseInt($('#numberSport').val());
		console.log(addValue);
		
		//add to badge
		addBadge(person1, 'sport', false, addValue);
		
		$('#displayPerson').empty();
		
		check= checkBadgeColour(person1, 'sport', false, 200, 100, 40);
		 quickDisplay(check, '#displayPerson', 'sport');
		
		//$('#displayPerson').append('This is an example of what the current structure of the person JSON is. <br>Name: ' + person1.name + '<br> Badge for sport: ' + check[0] + '<br>Progress: ' + check[1] + '<br><br>THESE WOULD BE USED FOR DISPLAY <br> High Point: '+check[2][0] + '<br>Current: ' + check[2][1] + '<br>Low Point: ' +check[2][2]);
	}
	
})
$('#addFood').submit(function(event){
	event.preventDefault();
	
	if(isNaN($('#numberFood').val()/2) == false){
		var addValue = parseInt($('#numberFood').val());
		console.log(addValue);
		
		//add to badge
		addBadge(person1, 'food', false, addValue);
		
		$('#displayPerson2').empty();
		
		check2= checkBadgeColour(person1, 'food', false, 400, 200, 100);
		quickDisplay(check2, '#displayPerson2', 'food');
		//$('#displayPerson').append('This is an example of what the current structure of the person JSON is. <br>Name: ' + person1.name + '<br> Badge for sport: ' + check[0] + '<br>Progress: ' + check[1] + '<br><br>THESE WOULD BE USED FOR DISPLAY <br> High Point: '+check[2][0] + '<br>Current: ' + check[2][1] + '<br>Low Point: ' +check[2][2]);
	}
	
})
//used to check a badge status. gold etc refer to the level the badge must be on to recieve badge
function checkBadgeColour(user, badge, unique, gold, silver, bronze){
	var currentScore = user.badges[badge];
	var badgeColour = "";
	var progressPercentage = 0;
	
	//used to get unique score vs standard badge
	 if(unique == true){
		currentScore = user.uniqueBadges[badge];
	}
	else{
		currentScore = user.badges[badge];
	}
	
	if(currentScore >= bronze){
		if(currentScore < silver){
			//display bronze
			badgeColour = "bronze";
			progressPercentage = calculatePercentage(currentScore, silver, bronze);
			
			return [badgeColour,progressPercentage,[silver, currentScore, bronze]];
		}
		if(currentScore < gold){
			//display silver
			badgeColour = "silver";
			progressPercentage = calculatePercentage(currentScore, gold, silver);
			
			return [badgeColour,progressPercentage,[gold, currentScore, silver]];
			
		}
		else{
			//has to be gold ie >= gold
			badgeColour = "gold";
			progressPercentage = calculatePercentage(currentScore, 99999, gold);
			
			return [badgeColour,progressPercentage,[99999, currentScore, gold]];
			
		}
	}
	else{
		//no badge
		badgeColour = "none";
		progressPercentage = calculatePercentage(currentScore, bronze, 0);
			
		return [badgeColour,progressPercentage,[bronze, currentScore, 0]];
	}
}

//used to add exp to a badge when a user attends event
function addBadge(user, badge, unique, amount){
	var currentScore = 0;
	if(unique == true){
		currentScore = user.uniqueBadges[badge];
	}
	else{
		currentScore = user.badges[badge];
	}
	currentScore = currentScore + amount;
	
	if(unique == true){
		user.uniqueBadges[badge] = currentScore;
	}
	else{
		user.badges[badge] = currentScore;
		console.log(user.badges[badge]);
	}
}
//((currentScore - bronze)/(silver - bronze)) * 100;
function calculatePercentage(score, high, low){
	return ((score - low)/(high-low))*100;
}

function quickDisplay(results, where, badge){
	var image ="";
	if(badge == 'sport'){
		image = 'sport_';
	}
	if(badge == 'food'){
		image = 'food_';
	}
	$(where).append('<br><br><br>Name: ' + person1.name + '<br> Badge for '+badge+': ' + results[0] +' <img src="'+image+results[0]+'.png">' + '<br>Progress: ' + results[1] + '<br> <progress value="'+ results[1] +'" max="100"></progress><br><br>THESE WOULD BE USED FOR DISPLAY <br> High Point: '+results[2][0] + '<br>Current: ' + results[2][1] + '<br>Low Point: ' +results[2][2] );
	$('#structure').empty();
	$('#structure').append(JSON.stringify(person1, undefined, 2));
}