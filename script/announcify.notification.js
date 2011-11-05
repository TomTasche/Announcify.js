function getAnnouncifications() {
    if (localStorage.authorized === null) return;
    
    var url = SERVER_URL + "announcifications";
    var request = {
        'method': 'GET',
        'parameters': {
            // 'alt': 'json'
        }
    };
    
    oauth.sendSignedRequest(url, function(resp, xhr) {
        // TODO: use JSON instead
        temp = resp.split(";joppfm;");
        
        for (i = 0; i < temp.length; i++) {
            if (temp[i] === null) return;
            
            announcify(temp[i]);
        }
    }, request);
}

function startInterval() {
    window.setInterval(settings.get("interval") * 1000, getAnnouncifications);
}