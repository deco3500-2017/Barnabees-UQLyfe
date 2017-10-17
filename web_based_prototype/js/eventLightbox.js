$(document).on('click', '#event-card .badgebox', function(){
	
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
        height:"75%" , 
        width:"70%" , 
        html: "<h2>" + details[0] + "</h2>" + '<img id="displayMedal" src="'+ image +'">' + '<br><p id="progress-badge" class="center"> '+ current+'/'+high +' </p><br><div id="medalProgress" class="progress-outside"><div class="progress-inside"></div></div><div id="description">Description<div>'+ details[1] +'</div></div>'
    });
	$("#medalProgress .progress-inside").css('width', medalStats[1]+"%");
	$("#medalProgress .progress-inside").prepend("<div class='percent'>"+ parseInt(medalStats[1]) +"%</div>");
	
	if(medalStats[1] < 15){
		$('#medalProgress .percent').css('padding-right','0');
	}
});