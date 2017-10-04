var person1 = {'name':'Perzon Wun', 'photo':'img/hass_gold.png', 'level':0,'date_created':"1 - 2 - 2017",'events_created':0,'events_attended':0,'events_missed':0, 'badges':{
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
	'sci':0,
	'total_events':0,
	'events_in_period':0,
	'attendence_rate':0,
	'certain_level':0,
	'message_numbers':11,
	'share_number':0
	}
};

//this objects holds the results from the score, returning an array -> [badgeColour,progressPercentage,badge,[high, currentScore, low]]
var medal = {
	'sport':checkBadgeColour(person1, "sport", 20, 10, 5),
	'study':checkBadgeColour(person1, "study", 20, 10, 5),
	'faculty':checkBadgeColour(person1, "faculty", 20, 10, 5),
	'food':checkBadgeColour(person1, "food", 20, 10, 5),
	'clubs':checkBadgeColour(person1, "clubs", 20, 10, 5),
	'misc':checkBadgeColour(person1, "misc", 20, 10, 5),
	'hass':checkBadgeColour(person1, "hass", 20, 10, 5),
	'bel':checkBadgeColour(person1, "bel", 20, 10, 5),
	'eait':checkBadgeColour(person1, "eait", 20, 10, 5),
	'habs':checkBadgeColour(person1, "habs", 20, 10, 5),
	'med':checkBadgeColour(person1, "med", 20, 10, 5),
	'sci':checkBadgeColour(person1, "sci", 20, 10, 5),
	'total_events':checkBadgeColour(person1, "total_events", 20, 10, 5),
	'events_in_period':checkBadgeColour(person1, "events_in_period", 20, 10, 5),
	'attendence_rate':checkBadgeColour(person1, "attendence_rate", 20, 10, 5),
	'certain_level':checkBadgeColour(person1, "certain_level", 20, 10, 5),
	'message_numbers':checkBadgeColour(person1, "message_numbers", 20, 10, 5),
	'share_number':checkBadgeColour(person1, "share_number", 20, 10, 5)
};

var noneArray = [];
var bronzeArray = [];
var silverArray = [];
var goldArray = [];

var displayCount = 1;

$(document).ready(function(){
	
	$('#username').html(person1.name);
	
	console.log(medal);
	$.each(medal, function(key, val){
		//key is the name of the badge
		//val is its values
		
		if (val[0] == "none"){
			noneArray.push(val);
		}
		if (val[0] == "bronze"){
			bronzeArray.push(val);
		}
		if (val[0] == "silver"){
			silverArray.push(val);
		}
		if (val[0] == "gold"){
			goldArray.push(val);
		}
	});
	
	sortAllArrays();
	displayMedals();
});

$(document).on('click', '.badgebox', function(){
	$('#progress').empty();
	var id = $(this).attr('id');
	var medalStats = medal[id];
	
	$('#progress').append(medalStats[2] + '<br>Progress %: ' + medalStats[1] + '<br>High: ' + medalStats[3][0] + '<br>Current: ' +medalStats[3][1] + '<br>Low: ' +medalStats[3][2]);
});





function displayArray(medalArray, medal){
	for(i=0; i < medalArray.length ; i++){
		
		console.log(i);
		console.log(displayCount);
		
		$('.badgebox:nth-of-type('+ (displayCount) +')').attr("id", medalArray[i][2]);
		 
		$('.badgebox:nth-of-type('+ (displayCount) +') .badge').attr("src","img/" + medalArray[i][2]+ "_" + medal + ".png");
		displayCount++;
		
	}
}

function displayMedals( ){
	
/* 	for(i=0; i < goldArray.length ; i++){
		
		console.log(i);
		console.log(goldArray[i][2]);
		
		$('.badgebox:nth-of-type('+ (i+1) +')').attr("id", goldArray[i][2]);
		 
		$('.badgebox:nth-of-type('+ (i+1) +') .badge').attr("src", goldArray[i][2]+"_gold");
		
	} */
	
	displayArray(goldArray, "gold");
	displayArray(silverArray, "silver");
	displayArray(bronzeArray, "bronze");
	displayArray(noneArray, "none");
};

//this function sorts all the arrays based on progess percent
//with the ones that are the closest to being complete first
function sortAllArrays(){
	noneArray.sort(function(a, b){
		return b[1] - a[1];
	});
	bronzeArray.sort(function(a, b){
		return b[1] - a[1];
	});
	silverArray.sort(function(a, b){
		return b[1] - a[1];
	});
	goldArray.sort(function(a, b){
		return b[1] - a[1];
	});
}

function checkBadgeColour(user, badge, gold, silver, bronze){
	var currentScore = user.badges[badge];
	var badgeColour = "";
	var progressPercentage = 0;

	currentScore = user.badges[badge];

	if(currentScore >= bronze){
		if(currentScore < silver){
			//display bronze
			badgeColour = "bronze";
			progressPercentage = calculatePercentage(currentScore, silver, bronze);
			
			return [badgeColour,progressPercentage,badge,[silver, currentScore, bronze]];
		}
		if(currentScore < gold){
			//display silver
			badgeColour = "silver";
			progressPercentage = calculatePercentage(currentScore, gold, silver);
			
			return [badgeColour,progressPercentage,badge,[gold, currentScore, silver]];
			
		}
		else{
			//has to be gold ie >= gold
			badgeColour = "gold";
			progressPercentage = calculatePercentage(currentScore, 99999, gold);
			
			return [badgeColour,progressPercentage,badge,[99999, currentScore, gold]];
			
		}
	}
	else{
		//no badge
		badgeColour = "none";
		progressPercentage = calculatePercentage(currentScore, bronze, 0);
			
		return [badgeColour,progressPercentage,badge,[bronze, currentScore, 0]];
	}
}
function calculatePercentage(score, high, low){
	return ((score - low)/(high-low))*100;
}