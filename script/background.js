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
    trackEvent(request.event);
});


function getSelectionAndAnnouncify() {
	var url = chrome.extension.getURL("html/announcify.web.html") + "?lang=" + lang;
    var selected = false;

	if (!window.getSelection().toString()) {
		url += "&url=" + escape(window.location.href);
	} else {
        selected = true;
		url += "&text=" + escape(window.getSelection().toString()) + "&title=" + escape(document.title);
	}

    chrome.extensions.getBackgroundPage().trackPage(selected);

	window.open(url, "announcify.web");
}

function trackPage(selected) {
	analytics.push(['_trackEvent', 'announcify.web.domain', window.location.hostname]);
    analytics.push(['_trackEvent', 'announcify.web.url', window.location.href]);
    analytics.push(['_trackEvent', 'announcify.web.selected', selected]);
}

function trackEvent(event) {
	analytics.push(['_trackEvent', 'announcify.web.' + event.name, event.value]);
}