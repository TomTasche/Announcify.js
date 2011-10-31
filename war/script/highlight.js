
window.onload = function(){
	
}

function hideLoading() {
    loading = document.getElementById("img_loading");
    document.removeChild(loading);
}

function setIconPath(path){
	//document.getElementById("favico").setAttribute("src",path);
}

function setDate(date){
	var node = document.getElementById("date");
}

function setTitle(title){
	document.getElementById("heading").innerText=title;
}

var index = 0;

function removeBlurEffect(index){
	var p = document.getElementsByTagName('p')[index];
	p.setAttribute("class","blur_in");
	var as = p.getElementsByTagName('a');
		for (var i = 0; i < as.length; i++) {
			as[i].setAttribute('class', 'blur_in');
		};	
}

function blurEverything(){
	var pis = document.getElementsByTagName('p');
	for (var i = 0; i < pis.length; i++) {
		pis[i].setAttribute('class', 'blur_out');
		var as = pis[i].getElementsByTagName('a');
		for (var j = 0; j < as.length; j++) {
			as[j].setAttribute('class', 'blur_out');
		};
	};

}

var interval;
var speed = 10;
var scrollDest;

function scrollToParagraph(index){
	var node = document.getElementsByTagName('p')[index];
	var offtop = node.offsetTop;
	var height = (node.offsetHeight);
	var screenheight = (window.innerHeight);
	
	scrollDest = offtop + (height / 2) - (screenheight / 2);
	
	window.scrollTo(0,scrollDest);
	
}


function highlight(index){
	blurEverything();
	removeBlurEffect(index);
	scrollToParagraph(index);
}

