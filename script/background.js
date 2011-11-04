window.onload = function() {
	var settings = new Store("settings", {
	    "rate": 1,
		"volume": 1
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
    
    if (localStorage.authorized === null) {
        window.setInterval(100000, getAnnouncifications);
    }
};


function getAnnouncifications() {
    var url = SERVER_URL + "announcifications";
    var request = {
        'method': 'GET',
        'parameters': {
            // 'alt': 'json'
        }
    };
    
    oauth.sendSignedRequest(url, function(resp, xhr) {
        announcify(resp);
    }, request);
}