if (localStorage.openedSettings) {
	window.open(chrome.extension.getURL("html/options.html"));

	localStorage.openedSettings = true;
}

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.detectLanguage(tab.id, function (language) {
		chrome.tabs.executeScript(tab.id, {code: "var tabId = " + tab.id + "; var lang = '" + language + "'; " + getSelectionAndAnnouncify.toString() + " getSelectionAndAnnouncify();"});
	});
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.type == 'announcify.web') {
        var url = chrome.extension.getURL("html/announcify.web.html") + "?lang=" + request.lang;
        url += '&url=' + request.url + '&title=' + request.title + '&selected=' + request.selected;

        if (request.selected) {
            url += '&text=' + request.text;
        }

        window.open(url, "announcify.web");

        trackPage(request);
    } else {
        trackEvent(request.event);
    }
});


function getSelectionAndAnnouncify(language) {
	var request = {type: 'announcify.web', selected: false, lang: language};
    request.hostname = window.location.hostname;
    request.url = window.location.href;
    request.title = escape(document.title);

	if (window.getSelection().toString()) {
		request.text = escape(window.getSelection().toString());
	}

    chrome.extension.sendRequest(request);
}

function trackPage(request) {
	analytics.push(['_trackEvent', 'announcify.web.domain', window.location.hostname]);
    analytics.push(['_trackEvent', 'announcify.web.url', window.location.href]);
    analytics.push(['_trackEvent', 'announcify.web.selected', selected]);
}

function trackEvent(event) {
	analytics.push(['_trackEvent', 'announcify.web.' + event.name, event.value]);
}