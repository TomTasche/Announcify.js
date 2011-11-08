if (localStorage.openedSettings == null) {
	window.open(chrome.extension.getURL("html/options.html"));

	localStorage.openedSettings = true;
}

function getSelectionAndAnnouncify() {
	url = chrome.extension.getURL("html/announcify.web.html") + "?lang=" + lang;

	if (!window.getSelection().anchorNode) {
		url += "&url=" + escape(window.location.href);
	} else {
		url += "&text=" + escape(window.getSelection().toString()) + "&title=" + escape(document.title);
	}

	window.open(url, "announcify.web");
}

chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.detectLanguage(tab.id, function (language) {
		chrome.tabs.executeScript(tab.id, {code: "var tabId = " + tab.id + "; var lang = '" + language + "'; " + getSelectionAndAnnouncify.toString() + " getSelectionAndAnnouncify();"});
	});
});
