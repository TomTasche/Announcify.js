var API_TOKEN = "b72fef8077d8741f511f929533291683";
var API_URL = "https://www.diffbot.com/api/article?token=" + API_TOKEN + "&url=";
var API_URL_APPENDIX = "&html=true";

var settings = new Store("settings", {});

var lastIndex = 0;


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
    url = getParameter("url");
    
    request = new XMLHttpRequest();
    request.open('GET', API_URL + escape(url) + API_URL_APPENDIX, true);
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
    
    document.appendChild(articleDiv);
    
    setDate(article.date);
    setTitle(article.title);
    
    hideLoading();
    
    announcify();
}

function announcify() {
    speak("You're now listening to: " + getTitle(), "en");
    
    paragraphs = document.getElementsByTagName("p");
    
    highlight(lastIndex++);
    
    lang = getParameter("lang");
    for (int i = 0; i < paragraphs.length; i++) {
        speak(paragraphs[i].innerText, lang);
	}
}

function speak(text, lang) {
    rate = settings.get("rate");
    pitch = settings.get("pitch");
    volume = settings.get("volume");
    voice = settings.get("voices");
    
    chrome.tts.speak(text, {"enqueue": enqueue, "lang": lang, "rate": rate, "pitch": pitch, "voiceName": voice, onEvent: function(event) {
		if (event.type == "end") {
			highlight(lastIndex++);
		} else if (event.type == "error") {
			console.log('error: ' + event.errorMessage);
			
			// TODO: handle error
		}
	}});
}


window.onunload = function() {
    stop();
}

window.onload = fetchArticle;