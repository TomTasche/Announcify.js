

var sidebar;
var arrow;
window.addEventListener('load', loaded, false);

function loaded(){
	document.getElementById("arrow").addEventListener("click",arrowClick);
	sidebar = document.getElementById("sidebar");
	arrow = document.getElementById("arrow_img");
}


var isShown = false;

function arrowClick(){
	if(isShown){
		sidebar.setAttribute("class","sidebar_hide");
		arrow.setAttribute("class","arrow_right");
	}else{
		sidebar.setAttribute("class","sidebar_show");
		arrow.setAttribute("class","arrow_left");
	}
	isShown = !isShown;
};
