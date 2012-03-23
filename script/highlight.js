var scrollDest;


function hideLoading() {
    var loading = document.getElementById("img_loading");
    document.body.removeChild(loading);
}

function setTitle(title){
    document.getElementById("heading").innerText=title;
    document.title = "Announcify - " + title;
}

function getTitle() {
    return document.getElementById("heading").innerText;
}

function removeBlurEffect(index){
	if (index < 0) return;

	var p = document.getElementsByTagName('p')[index];
	if(p.getAttribute("class").indexOf("blur_out") != -1){
		p.setAttribute("class","blur_in");
		var as = p.getElementsByTagName('a');
		for (var i = 0; i < as.length; i++) {
			as[i].setAttribute('class', 'blur_in');
		}
	}
}

function blurEverything(index){
	var pis = document.getElementsByTagName('p');
	for (var i = 0; i < pis.length; i++) {
		if(i != index){
			pis[i].setAttribute('class', 'blur_out');
			var as = pis[i].getElementsByTagName('a');
			for (var j = 0; j < as.length; j++) {
				as[j].setAttribute('class', 'blur_out');
			}
		}
	}
}

function done(length){
	for (var i = 0; i < length; i++) {
		removeBlurEffect(i);
		// scrollToParagraph(0);
	}
}

function scrollToParagraph(index){
	var node = document.getElementsByTagName('p')[index];
	var offtop = node.offsetTop;
	var height = (node.offsetHeight);
	var screenheight = (window.innerHeight);

	scrollDest = offtop + (height / 2) - (screenheight / 2);

	window.scrollTo(0, scrollDest);

}

function highlight(index){
	blurEverything(index);
	removeBlurEffect(index);
	scrollToParagraph(index);
}