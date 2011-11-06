if (localStorage.openedSettings === null) {
	window.open(chrome.extension.getURL("html/options/options.html"));

	localStorage.openedSettings = true;
}

/* chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.detectLanguage(tab.id, function (language) {
		url = chrome.extension.getURL("html/announcify.web.html") + "?url=" + escape(tab.url) + "&lang=" + language;

		window.open(url, "announcify.web");
	});
}); */