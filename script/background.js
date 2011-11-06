window.onload = function() {
	var settings = new Store("settings", {
	    "rate": 1,
		"volume": 1,
        "interval": 60
	});

	chrome.browserAction.onClicked.addListener(function (tab) {
		chrome.tabs.detectLanguage(tab.id, function (language) {
			url = chrome.extension.getURL("html/announcify.web.html") + "?url=" + escape(tab.url) + "&lang=" + language;

			window.open(url, "announcify.web");
		});
	});

	if (localStorage.openedSettings === null) {
		window.open(chrome.extension.getURL("html/options/options.html"));

		localStorage.openedSettings = true;
	}
};