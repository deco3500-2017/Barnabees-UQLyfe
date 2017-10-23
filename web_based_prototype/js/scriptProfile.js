var users = '';
var person1 = {};

//this objects holds the results from the score, returning an array -> [badgeColour,progressPercentage,badge,[high, currentScore, low]]
var medal = {};

var noneArray = [];
var bronzeArray = [];
var silverArray = [];
var goldArray = [];

var displayCount = 1;
var selectionCount = 1;

$(document).ready(function(){
	
	users = JSON.parse(sessionStorage.users);
	person1 = users[1];
	medal = {
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
	
	$('#username').html(person1.name);
	

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
	
	//if the user doesnt have a picture, adds the highest value
	if(person1.photo == ''){
		if(goldArray.length > 0){
			person1.photo = "images/badges/" + goldArray[0][2]+ "_gold.png";
		}
		else if(silverArray.length > 0){
			person1.photo = "images/badges/" + silverArray[0][2]+ "_silver.png";
		}
		else if(bronzeArray.length > 0){
			person1.photo = "images/badges/" + bronzeArray[0][2]+ "_bronze.png";
		}
		else{
			person1.photo = 'images/badges/clubs_none.png';
		}
	}
	$('#userPhoto').attr('src', person1.photo);
	
	var levelArray = getLevel(person1);
	$('#testBox').colorbox({height:"80%"});

 	$('#level').append(levelArray[0]);
	var levelPercent = levelArray[1] *100;

	$('#user-level .progress-inside').css('width', levelPercent+"%");
	$("#user-level .progress-inside").prepend("<div class='percent'>"+ parseInt(levelPercent) +"%</div>");
	
	var total_attendence_rate = (parseFloat(person1.events_rsvp) - parseFloat(person1.events_missed))/parseFloat(person1.events_rsvp);
	
	$('#stat1').append('<br>' + person1.events_created);
	$('#stat2').append('<br>' + total_attendence_rate*100 +"%");
	$('#stat3').append('<br>' + person1.date_created);
	
	if(sessionStorage.newBadge){
		$('#message_numbers').append("<img id='notification' src='images/notification.png'>");
		
	}
});



$(document).on('click', '#badgebox-wrap .badgebox', function(){
	$('#progress').empty();
	var id = $(this).attr('id');
	var image = $(this).children('img').attr('src');
	var medalStats = medal[id];
	
	console.log(medalStats[2]);
	//[name, description]
	var details = medalDetails(medalStats[2]);
	
	var high = medalStats[3][0];
	var current = medalStats[3][1];
	var low = medalStats[3][2];
	
	//should put a switch in here to get description and real name
	$.colorbox({
        height:"90%" , 
        width:"90%" , 
        html: "<h2>" + details[0] + "</h2>" + '<img id="displayMedal" src="'+ image +'">' + '<p id="progress-badge" class="center"> '+ current+'/'+high +' </p><br><div id="medalProgress" class="progress-outside"><div class="progress-inside"></div></div><div id="description">Description<div>'+ details[1] +'</div></div>'
    });
	$("#medalProgress .progress-inside").css('width', medalStats[1]+"%");
	$("#medalProgress .progress-inside").prepend("<div class='percent'>"+ parseInt(medalStats[1]) +"%</div>");
	
	if(medalStats[1] < 15){
		$('#medalProgress .percent').css('padding-right','0');
	}
	
	
});

$(document).bind('cbox_cleanup', function(){
	if(sessionStorage.newBadge){
		$('#notification').remove();
		sessionStorage.removeItem('newBadge');
		sessionStorage.setItem('goldSet', true);
	}
})

//sets images
$(document).on('click', '#selectionChoices .badgebox', function(){
	
	//sets photo for person1 to the clicked on image
	person1.photo  = ($(this).children('img').attr('src'));
	
	$('#userPhoto').attr('src', person1.photo);
	
	sessionStorage.removeItem("users");
	sessionStorage.setItem('users', JSON.stringify(users));
	
	$.colorbox.close();
});

$('#changeProfile').on('click', function(){
	var totalNumber = goldArray.length  + silverArray.length + bronzeArray.length;
	
	if ($('#profileChoices .badgebox').length == 0){
		for(i=0; i< totalNumber; i++){
			$('#profileChoices').append('<div class="badgebox"><img class="badge" /></div>');
		}
		displaySelectArray(goldArray, "gold");
		displaySelectArray(silverArray, "silver");
		displaySelectArray(bronzeArray, "bronze");
	}
	
	var displayReady = $('#profileChoices').html();
	displayReady = '<div id = "selectionChoices">' + displayReady + '</div>' ;
	console.log(displayReady);
	
//	$.colorbox({height:"80%" , width: '80%', html :displayReady + '</div>'});
	$.colorbox({
        height:"80%", 
        width: '80%', 
        html: "<h2>SET YOUR ICON</h2>" + displayReady + '</div>'
    });
    
	//$('#profileChoices').css('display', 'flex');

})

function medalDetails(name){
	var description ='';
	var realName ='';
	
	switch(name){
		case 'sport':
			description = "Sport description";
			realName = 'Sport';
			break;
		case 'study':
			description = "Study description";
			realName = 'Study';
			break;
		case 'faculty':
			description = "faculty description";
			realName = 'Faculty';
			break;
		case 'food':
			description = "food description";
			realName = 'Food';
			break;
		case 'clubs':
			description = "clubs description";
			realName = 'Clubs';
			break;
		case 'misc':
			description = "misc description";
			realName = 'Miscellaneous';
			break;
		case 'hass':
			description = "hass description";
			realName = 'Humanities and Social Sciences';
			break;
		case 'bel':
			description = "bel description";
			realName = 'Business, Economics and Law';
			break;
		case 'eait':
			description = "eait description";
			realName = 'Engineering, Architecture and Information Technology';
			break;
		case 'habs':
			description = "habs description";
			realName = 'Health and Behavioural Sciences';
			break;
		case 'med':
			description = "med description";
			realName = 'Medicine';
			break;
		case 'sci':
			description = "sci description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur facilisis velit a efficitur. Nullam ullamcorper tellus in mattis fermentum. Pellentesque varius augue quis mauris efficitur, at fermentum mauris aliquet. ";
			realName = 'Science';
			break;
		case 'total_events':
			description = "Total events description";
			realName = 'Total Events Attended';
			break;
		case 'total_events':
			description = "Total events description";
			realName = 'Total Events Attended';
			break;
		case 'events_in_period':
			description = "Events in a Period description";
			realName = 'Events in a Period';
			break;
		case 'attendence_rate':
			description = "Attendence Rate description";
			realName = 'Attendence Rate';
			break;
		case 'certain_level':
			description = "Certain level description";
			realName = 'Certain Level';
			break;
		case 'message_numbers':
			description = "Message numbers description";
			realName = 'Messages Sent';
			break;
		case 'share_number':
			description = "Share numbers description";
			realName = 'Total Share';
			break;
	}
	return [realName, description];
}

function getLevel(user){
	console.log(user);
	var rawLevel = Math.cbrt(user.levelRaw);
	var level = parseInt(rawLevel);
	
	return [level, rawLevel % level];
}

function displaySelectArray(medalArray, medal){
	for(i=0; i <  medalArray.length; i++){
		$('#profileChoices .badgebox:nth-of-type('+ (selectionCount) +')').attr("id", medalArray[i][2]);
		 
		$('#profileChoices .badgebox:nth-of-type('+ (selectionCount) +') .badge').attr("src","images/badges/" + medalArray[i][2]+ "_" + medal + ".png");
		selectionCount++;
	}
}

function displayArray(medalArray, medal ){
	for(i=0; i < medalArray.length ; i++){
		$('#badgebox-wrap .badgebox:nth-of-type('+ (displayCount) +')').attr("id", medalArray[i][2]);
		 
		$('#badgebox-wrap .badgebox:nth-of-type('+ (displayCount) +') .badge').attr("src","images/badges/" + medalArray[i][2]+ "_" + medal + ".png");
		displayCount++;
		
	}
}

function displayMedals( ){
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
			progressPercentage = calculatePercentage(currentScore, currentScore, gold);
			
			return [badgeColour,progressPercentage,badge,[currentScore, currentScore, gold]];
			
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