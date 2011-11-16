if (!localStorage.openedSettings) {
    window.open(chrome.extension.getURL("html/options.html"));

    localStorage.openedSettings = true;
}

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.detectLanguage(tab.id, function (language) {
		chrome.tabs.executeScript(tab.id, {code: "(" + getSelectionAndAnnouncify.toString() + ")('" + language + "');"});
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
        trackEvent(request);
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
	_gaq.push(['_trackEvent', 'announcify.web.domain', request.hostname]);
    _gaq.push(['_trackEvent', 'announcify.web.url', request.url]);
    _gaq.push(['_trackEvent', 'announcify.web.selected', request.selected]);
}

function trackEvent(event) {
	_gaq.push(['_trackEvent', 'announcify.web.' + event.name, event.value]);
}
