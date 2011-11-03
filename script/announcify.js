var API_TOKEN = "b72fef8077d8741f511f929533291683";
var API_URL = "https://www.diffbot.com/api/article?token=" + API_TOKEN + "&url=";
var API_URL_APPENDIX = "&html=true";

var settings = new Store("settings", {
    "rate": 1
});

var lastIndex = -1;
var paragraphs;


// from http://www.netlobo.com/url_query_string_javascript.html
function getParameter(name) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

function fetchArticle() {
	chrome.tts.speak("");

	if (getParameter("warmedUp") == "") {
		window.location.href = window.location.href + "&warmedUp=true";

		return;
	}

    url = getParameter("url");
    
    request = new XMLHttpRequest();
    request.open('GET', API_URL + url + API_URL_APPENDIX, true);
    request.onreadystatechange = function (event) {
      if (request.readyState == 4) {
         if (request.status == 200) {
            article = JSON.parse(request.responseText);
            displayArticle(article);
         } else {
           console.log('Error', request.statusText);
         }
      }
    };
    request.send(null);
}

function displayArticle(article) {
    articleDiv = document.createElement("div");
    articleDiv.setAttribute("id", "div_article");
    articleDiv.innerHTML = article.html;
    
    document.body.appendChild(articleDiv);
    
    setDate(article.date);
    setTitle(article.title);
    
    hideLoading();
    
    announcify();
}

function announcify() {
    speak("You're now listening to: " + getTitle());
    
    paragraphs = document.getElementsByTagName("p");
}

function speak(text) {
	lang = getParameter("lang");
    rate = settings.get("rate");
    pitch = settings.get("pitch");
    volume = settings.get("volume");
    voice = settings.get("voices");
    
    // TODO: use lang. at the moment it simply breaks everything, because current TTS-Engines expect "en-US" instead of "en"
    chrome.tts.speak(text, {"enqueue": true, "rate": rate, "pitch": pitch, "voiceName": voice, "onEvent": onUtteranceCompleted});
}

function onUtteranceCompleted(event) {
        console.log('Event ' + event.type + ' at position ' + event.charIndex);
        if (event.type == "end") {
		lastIndex++;
		speak(paragraphs[lastIndex].innerText);
		highlight(lastIndex);
	}	
}

function stop() {
    chrome.tts.stop();
}


window.onunload = function() {
    stop();
}
