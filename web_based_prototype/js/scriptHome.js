$(document).ready(function(){
	var d = new Date();
	console.log(d);
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	
	//hours is 24 hour time just hour ie 1:24 pm = 13
	var hour = d.getHours();
	console.log(month);
	
	$('#time').append("Time: " + hour + " Date: " + day +" " + month + " " + year);
});