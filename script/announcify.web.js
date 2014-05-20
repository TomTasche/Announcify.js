var API_TOKEN = "b72fef8077d8741f511f929533291683";
var API_URL = "http://www.diffbot.com/api/article?token=" + API_TOKEN + "&url=";
var API_URL_APPENDIX = "&html=true";

var highlightIndex = -1;
var lastIndex = -1;
var lang;
var paragraphs;
var toReadTags = ["P", "OL", "UL"]
var _done = false;

ANNOUNCIFY.setEventListener(onUtteranceCompleted);

fetchArticle();

document.addEventListener("keyup", onKeyUp, false);
document.getElementById("backward").addEventListener("click", previous, false);
document.getElementById("play").addEventListener("click", pause, false);
document.getElementById("forward").addEventListener("click", next, false);

chrome.extension.sendRequest({type: 'track', name: 'language', value: getParameter('lang')});

window.onunload = function() {
   ANNOUNCIFY.stop();
};


// from: http://stackoverflow.com/questions/4825295/javascript-onclick-get-the-id-of-the-button-clicked/4825339#4825339
function trackClick(event) {
	event = window.event;

	var element = event.target || event.srcElement;

	chrome.extension.sendRequest({type: 'track', name: 'click', value: element.alt});
}

// from http://www.netlobo.com/url_query_string_javascript.html
function getParameter(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    regexS = "[\\?&]" + name + "=([^&#]*)";
    regex = new RegExp(regexS);
    results = regex.exec(window.location.href);
    if (!results) {
        return "";
    } else {
        return results[1];
    }
}

function fetchArticle() {

    // TODO: ugly, but it seems to be necessary (onUtteranceCompleted not fired without warming up)
    chrome.tts.speak("");
    if (!getParameter("warmedUp")) {
        window.location.href = window.location.href + "&warmedUp=true";
        return;
    }

    // Using deprecated unescape due to non-UTF8 encoding (http://stackoverflow.com/a/19696946)
    setTitle(decodeURIComponent(unescape(getParameter("title"))));

    var article;
    var url = getParameter("url");
    var selected = getParameter("selected");
    if (selected == 'false') {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', API_URL + url + API_URL_APPENDIX, true);
        xhr.onreadystatechange = function(event) {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    article = JSON.parse(xhr.responseText);

                    displayArticle(article);
                } else {
                    var confirmReload = window.confirm(
                        "Something went wrong. :/ Do you want to reload and try again?");
                    if (confirmReload) window.location.reload(true);

                    return;
                }
            }
        };
        xhr.send(null);
    } else if (window.intent) {
    	var intent = window.intent;
    	// TODO: if (intent.type == 'text/html') {}

    	article = {html: intent.data};

        displayArticle(article);
    } else {
        article = {html: "<p>" + decodeURIComponent(unescape(getParameter("text"))) +
                   "</p>", title: decodeURIComponent(unescape(getParameter("title")))};
        
        displayArticle(article);
    }
}

function displayArticle(article) {
	article.html = article.html.replace(/&nbsp;/gi,'');
	
    articleDiv = document.createElement("div");
    articleDiv.setAttribute("id", "div_article");
    articleDiv.innerHTML = article.html;
    document.body.appendChild(articleDiv);
    hideLoading();
    speak();
}

function speak() {
    ANNOUNCIFY.announcify("You're now listening to: " + getTitle(), "en-US");
    lang = getParameter("lang");
    // Iterate through all elements with a tag matching in the toReadTags list.
    // pFound is a sentinel value so that the first element of 'paragraphs' will always have tag 'P'
    paragraphs = [];
    var allElements = document.getElementsByTagName("*");
    var pFound = false;
    for (var i= 0, max=allElements.length; i < max; i++){
        currentTag = allElements[i].tagName;
        if (currentTag == "P" || pFound) {
            pFound = true;
            if (toReadTags.indexOf(currentTag) != -1) {
                paragraphs.push(allElements[i])
            }
        }
    }
}

function onUtteranceCompleted(event) {
    if (event.type == "end") {
       next(false);
    } else {
        chrome.extension.sendRequest({type: 'track', name: 'error', value: event});
    }
}

function next(shouldStop){
	if(lastIndex < paragraphs.length-1){
    	if(shouldStop)
    	    ANNOUNCIFY.stop();

        // The highlightIndex moves only for P, this is so that highlight.js works correctly.
        // As a side effect, for a long list the page will not move until the next paragraph starts.
        lastIndex++;
        if (paragraphs[lastIndex].tagName == "P") {
            highlightIndex++;
        }

    	var text = TAGSOUP.getText(paragraphs[lastIndex].innerHTML);
    	ANNOUNCIFY.announcify(text, lang);
    	highlight(highlightIndex);
    }else{
    	done(paragraphs.length);
    	lastIndex = -1;
        highlightIndex = -1;
    	_done = true;
        document.getElementById("play").firstChild.setAttribute("src", "../img/controls/play.png");
    }
}

function previous(){
	if(lastIndex > 0){
    	lastIndex--;
    	var text = TAGSOUP.getText(paragraphs[lastIndex].innerHTML);

    	ANNOUNCIFY.stop();
    	ANNOUNCIFY.announcify(text, lang);
    	highlight(lastIndex);
	}
}

function pause(){
    if(!_done){
    	if(ANNOUNCIFY.isPaused()){
        	ANNOUNCIFY.continue();
            document.getElementById("play").firstChild.setAttribute("src",
                                                                    "../img/controls/pause.png");
    	}else{
        	ANNOUNCIFY.pause();
            document.getElementById("play").firstChild.setAttribute("src",
                                                                    "../img/controls/play.png");
        }
    }else{
    	speak();
        document.getElementById("play").firstChild.setAttribute("src", "../img/controls/pause.png");
    	_done = false;
    }
}

function onKeyUp(e) {
    switch(e.keyCode) {
        case 38:/*UP*/
            previous();
            chrome.extension.sendRequest({type: 'track', name: 'key', value: 'up'});
            break;

        case 40:/*DOWN*/
            next(true);
            chrome.extension.sendRequest({type: 'track', name: 'key', value: 'down'});
            break;

        case 32: /*SPACE*/
            pause();
            chrome.extension.sendRequest({type: 'track', name: 'key', value: 'space'});
            break;
    }
}

document.onkeydown = function(e) {
    //Prevent scrolling
    if(e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 32) {
          e.preventDefault();
          return false;
    }
    return true;
};
