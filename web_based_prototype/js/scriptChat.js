

$(document).ready(function(){
	setHeight('#2', '#1');
	setHeight('#3', '#2');
	setHeight('#4', '#3');
	setHeight('#5', '#4');
	setHeight('#6', '#5');
	setHeight('#7', '#6');
});

$('#chatBox').on('submit', function(e){
	e.preventDefault();
	
	var message = $('#message').val();
	$('#1').css('display', 'block');
})


function setHeight(element, above){
	var bottom = $(above).offset().top + $(above).outerHeight(true);
	$(element).css('top', bottom);
}