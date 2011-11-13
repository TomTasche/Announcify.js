function getAnnouncifications() {
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
            if (!temp[i]) return;

            ANNOUNCIFY.announcify(temp[i]);
        }
    }, request);
}

window.setInterval(SETTINGS.get("interval") * 1000, getAnnouncifications);

