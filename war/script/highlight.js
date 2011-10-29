
window.onload = function(){
	
}

function setIconPath(path){
	document.getElementById("favico").setAttribute("src",path);
}

function setDate(date){
	var node = document.getElementById("date");
}

function setTitle(title){
	document.getElementById("heading").innerText=title;
}

var index = 0;

function removeBlurEffect(index){
	document.getElementsByTagName('p')[index].setAttribute("class","blur_in");	
}

function blurEverything(){
	pis = document.getElementsByTagName('p');
	for (var i = 0; i < pis.length; i++) {
		pis[i].setAttribute('class', 'blur_out');
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

function makeScroll(){
	window.scrollTo(0,scrollpoint);

}

function highlight(index){
	blurEverything();
	removeBlurEffect(index);
	scrollToParagraph(index);
}

function setDate(date) {
	
}



// ------ KEY CONTROL --------
function handleArrowKeys(evt) {
    evt = (evt) ? evt : ((window.event) ? event : null);
    if (evt) {
        switch (evt.keyCode) {
            case 38://up
                highlight(index);
                index--;
                break;    
            case 40://down
                highlight(index);
                index++;
                break;    
         }
    }
}

document.onkeyup = handleArrowKeys;