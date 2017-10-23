var users = '';
var person1 = {};

var displayCount = 2;

$(document).ready(function(){
	users = JSON.parse(sessionStorage.users);
	person1 = users[1];
	console.log(person1);
	$('img.chatBadge.badgeRight').attr('src', person1.photo);
	
	setHeight('#2', '#1');
	setHeight('#3', '#2');
	setHeight('#4', '#3');
	setHeight('#5', '#4');
	setHeight('#6', '#5');
	setHeight('#7', '#6');
});

$('form').submit(function(event){

	$('#'+displayCount).css('display','block');
	$('input#message').val("");
	window.scrollTo(0,document.body.scrollHeight);
	
	if(displayCount == 4){
		
		//need to increase message by 2 in sessionStorage
		person1.badges.message_numbers  =  20;
		sessionStorage.removeItem("users");
		sessionStorage.setItem('users', JSON.stringify(users));
		
		if(!sessionStorage.goldSet){
			$('#newMedal').slideDown('slow', function(){
				$('#newMedal').delay(1500).slideUp('slow');
			
				sessionStorage.setItem('newBadge', true);
			});
			
		}
		
		
	}
	
	displayCount++;
	event.preventDefault(event);
	
	
})


function setHeight(element, above){
	var bottom = $(above).offset().top + $(above).outerHeight(true);
	$(element).css('top', bottom);
}