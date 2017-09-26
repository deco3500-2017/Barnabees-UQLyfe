var createdEvent = {"eventName":"", "eventTime" : 0, "eventDay" : 0, "eventMonth" : 0, "eventYear"  : 0, "tag" : "Food" };

//this is a test to understand the profile system with badges. not 100% that this is the best method, however we need to use an int to add show progress
var person1 = {'name':'John Wick', 'photo':'path_to_photo', 'level':0, 'badges':{
	'sport':50,
	'food':150,
	'misc':0,
	'faculty':0,
	'official':0,
	'something':0},
	'uniqueBadges':{
		//??? SHOULD THESE JUST GO IN THE ABOVE BADGE LIST TO MAKE FUNCTION EASIER (there is a check in function)???
		//badges that do not fit into the standard 6 tags will go here, the same function to test the colour (gold, silver, bronze) will work for this.
	}
};

$(document).ready(function(){
	
	//array would be used to show progress on a bar with currentScore and what img path (_name)
	var sportIcon = checkBadgeColour(person1, 'sport', false, 200, 100, 40);
	console.log(sportIcon);
	$('.name').html('SPORT BADGE: Current Level ' + sportIcon[1]);
	$('#low').html(sportIcon[3]);
	$('#high').html(sportIcon[2]);
	
	var progress1 = sportIcon [0] - sportIcon[3];
	var progress2 = (sportIcon[2] - sportIcon [0]);
	
	var percent1 = (progress1/(progress1+progress2)) *100;
	var percent2 = (progress2/(progress1+progress2)) *100;
	

	$('#extraProgress').css('width', percent2);
	$('#progressBar').css('width',percent1);
	
	var foodIcon = checkBadgeColour(person1, 'food', false, 200, 100, 40);
	console.log(foodIcon);
	
	
});

$('#testForm').submit(function(event){
	event.preventDefault();
	createdEvent.eventName = $('#userEvent').val();
	createdEvent.eventTime = $('#userTime').val();
	$("div#add").append(createdEvent.eventName + " at "+ createdEvent.eventTime + " <br>   DATE: " + createdEvent.eventDay + "/" + createdEvent.eventMonth + "/" + createdEvent.eventYear +"<br>");
})

//used to check a badge status. gold etc refer to the level the badge must be on to recieve badge
function checkBadgeColour(user, badge, unique, gold, silver, bronze){
	var currentScore = 0;

	
	//used to get unique score vs standard badge
	 if(unique == true){
		currentScore = user.uniqueBadges[badge];
	}
	else{
		currentScore = user.badges[badge];
	}
	
	if(currentScore >= bronze){
		if(currentScore < silver){
			//display bronze badge
			
			return [currentScore, '_bronze', silver, bronze];
		}
		if(currentScore < gold){
			//display silver
			return [currentScore, '_silver', gold, silver];
		}
		else{
			//has to be gold ie >= gold
			return [currentScore, '_gold', 9999, gold];
		}
	}
	else{
		//no badge
		return [currentScore, '_none', bronze, 0];
	}
}