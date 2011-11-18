window.onerror = function(msg, url, lineNumber) {
	chrome.extension.sendRequest({type: 'track', name: 'error', value: msg + "; " + url + "; " + lineNumber});
};
