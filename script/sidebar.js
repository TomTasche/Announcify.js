

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
};
