var ANNOUNCIFICATIONS = (function() {
    var URL = SERVER_URL + "announcifications";
    var REQUEST = {
        'method': 'GET',
        'parameters': {
            // 'alt': 'json'
        }
    };

    var ONOPENED = function() {
        connected = true;
    };
    var ONMESSAGE = function(data) {
        ANNOUNCIFICATIONS.getAnnouncifications();
    };
    var ONERROR = function(error) {
        connected = false;

        socket.close();
    };
    var ONCLOSED = function() {
        socket = null;
        channel = null;
    };

    var connected;
    var channel;
    var socket;


    return {
        openChannel: function(token) {
            channel = new goog.appengine.Channel(token);
            socket = channel.open();
            socket.onopen = ONOPENED;
            socket.onmessage = ONMESSAGE;
            socket.onerror = ONERROR;
            socket.onclose = ONCLOSED;
        },

        sendMessage: function(message) {
            if (connected) {
                // TODO: implement
            }
        },

        getAnnouncifications: function() {
            OAUTH.sendSignedRequest(URL, function(resp, xhr) {
                var notification;
                for (notification in JSON.parse(resp)) {
                    if (!resp) return;
                    ANNOUNCIFY.announcify(temp[i]);
                }
            }, REQUEST);
        }
    };
})();

window.setInterval(SETTINGS.get("interval") * 1000, ANNOUNCIFICATIONS.getAnnouncifications);