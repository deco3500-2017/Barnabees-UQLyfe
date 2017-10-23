
$(document).on('click', '.openChat', function(){
	sessionStorage.setItem('chatVisited', true);
	
	document.location.href = 'chat.html';
	
})

$(document).ready(function(){
	if(sessionStorage.chatVisited){
		$('#note').remove();
	}
})

