var API_TOKEN = "b72fef8077d8741f511f929533291683";
var API_URL = "http://www.diffbot.com/api/article?token=" + API_TOKEN + "&url=";
var API_URL_APPENDIX = "&html=true";

var lastIndex = -1;
var lang;
var paragraphs;

document.addEventListener('keyup', onKeyUp, false);
fetchArticle();

var ANALYTICS = chrome.extensions.getBackgroundPage()._gaq;
ANALYTICS.push(['_trackEvent', 'url', getParameter('url')]);
ANALYTICS.push(['_trackEvent', 'lang', getParameter('lang')]);


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
    chrome.tts.speak("");
    if (!getParameter("warmedUp")) {
        window.location.href = window.location.href + "&warmedUp=true";
        return;
    }

    url = getParameter("url");
    if (url) {
        var request = new XMLHttpRequest();
        request.open('GET', API_URL + url + API_URL_APPENDIX, true);
        request.onreadystatechange = function(event) {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    article = JSON.parse(request.responseText);

                    displayArticle(article);
                } else {
                    var confirmReload = window.confirm("Something went wrong. :/ Do you want to reload and try again?");
                    if (confirmReload) window.location.reload(true);
                }
            }
        };
        request.send(null);
	} else {
		article = {html: "<p>" + unescape(getParameter("text")) + "</p>", title: unescape(getParameter("title"))};
		displayArticle(article);
	}
}

function displayArticle(article) {
    articleDiv = document.createElement("div");
    articleDiv.setAttribute("id", "div_article");
    articleDiv.innerHTML = article.html;
    document.body.appendChild(articleDiv);
    setTitle(article.title);
    hideLoading();
    speak();
}

function speak() {
    ANNOUNCIFY.announcify("You're now listening to: " + getTitle(), "en-US", onUtteranceCompleted);
    lang = getParameter("lang");
    paragraphs = document.getElementsByTagName("p");
}

function onUtteranceCompleted(event) {
    if (event.type == "end") {
        lastIndex++;

        var text = TAGSOUP.getText(paragraphs[lastIndex].innerHTML);
        ANNOUNCIFY.announcify(text, lang, onUtteranceCompleted);
        highlight(lastIndex);
    } else {
	ANALYTICS.push(['_trackEvent', 'error', event]);
}


window.onunload = function() {
   ANNOUNCIFY.stop();
};

function onKeyUp(e){
    console.log(e.keyCode);
    switch(e.keyCode){
        case 38:/*UP*/
            lastIndex--;
            ANNOUNCIFY.stop();
            var text = TAGSOUP.getText(paragraphs[lastIndex].innerHTML);
            ANNOUNCIFY.announcify(text, lang, onUtteranceCompleted);
            highlight(lastIndex);
	    ANALYTICS.push(['_trackEvent', 'key', 'up']);
        break;

        case 40:/*DOWN*/
            lastIndex++;
            ANNOUNCIFY.stop();
            var text = TAGSOUP.getText(paragraphs[lastIndex].innerHTML);
            ANNOUNCIFY.announcify(text, lang, onUtteranceCompleted);
            highlight(lastIndex);
	    ANALYTICS.push(['_trackEvent', 'key', 'down']);
        break;

        case 32: /*SPACE*/
                
        break;
    }
}
