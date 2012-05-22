

var sidebar;
var arrow;
window.addEventListener('load', loaded, false);

function loaded(){
	sidebar = document.getElementById("sidebar");
	sidebar.addEventListener("mouseover",mouseover);
	sidebar.addEventListener("mouseout",mouseover);
}


var isShown = false;

function mouseover(){
	if(isShown){
		sidebar.setAttribute("class","sidebar_hide");
	}else{
		sidebar.setAttribute("class","sidebar_show");
	}
	isShown = !isShown;
}

function disableAds() {
    if (window.confirm('So, you want to disable my ads? Y U NO support me?\nHowever, I respect your decision.')) {
        removeAds();
        
        localStorage.setItem('disableAds', true);
    }
}

function removeAds() {
    var adDiv = document.getElementById('div_ad');
    adDiv.parentNode.removeChild(adDiv);
}