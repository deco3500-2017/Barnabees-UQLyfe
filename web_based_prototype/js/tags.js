var tags = [];
var tagString ="";

function addTag(tagName){
	tags.push(tagName);
	localStorage.setItem(tagString, tags.toString());
}

function displayTags(){
	document.getElementById("selectedTags").innerHTML = localStorage.getItem(tagString);
}