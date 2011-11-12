var ANNOUNCIFICATIONS = (function() {
    var ANNOUNCIFICATIONS_URL = SERVER_URL + "announcifications";
    var CHANNEL_URL = SERVER_URL + "channel";

    var GET_REQUEST = {
        'method': 'GET',
        'parameters': {
            // 'alt': 'json'
        }
    };
    var DELETE_REQUEST = {
        'method': 'DELETE'
    };
    var CHANNEL_REQUEST = {
        'method': 'GET'
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


    chrome.idle.onStateChanged.addListener(function(newState) {
        if (newState == "active") {
            getAnnouncifications();
        } else {
            // behave idle or locked...
        }
    });


    return {
        var createSocket = function(token) {
            channel = new goog.appengine.Channel(token);
            socket = channel.open();
            socket.onopen = ONOPENED;
            socket.onmessage = ONMESSAGE;
            socket.onerror = ONERROR;
            socket.onclose = ONCLOSED;
        }

        openChannel: function() {
            if (connected) return;

            OAUTH.sendSignedRequest(CHANNEL_URL, function(resp, xhr) {
                if (xhr.status == 200) {
                    var token = JSON.parse(request.responseText);

                    createSocket(token);
                } else {
                    setTimeout(openChannel, 1000);
                }
            }, CHANNEL_REQUEST);
        },

        sendMessage: function(message) {
            if (connected) {
                // TODO: implement
            }
        },

        getAnnouncifications: function() {
            OAUTH.sendSignedRequest(ANNOUNCIFICATIONS_URL, function(resp, xhr) {
                if (!resp || xhr.status != 200) return;

                var notifications = JSON.parse(resp);
                var announce = [];

                if (notifications.gmail > 0) {
                    announce.push(notifications.gmail + " new mails.");
                }
                if (notifications.twitter > 0) {
                    announce.push(notifications.twitter + " new mentions on Twitter.");
                }
                if (notifications.facebook > 0) {
                    announce.push(notifications.facebook + " new notifications on Facebook.");
                }

                for (var notification in announce) {
                    ANNOUNCIFY.announcify(notification);
                }
            }, GET_REQUEST);
        },

        resetAnnouncifications: function() {
            OAUTH.sendSignedRequest(ANNOUNCIFICATIONS_URL, function(resp, xhr) {
                if (xhr.status != 200) {
                    window.setTimeout(resetAnnouncifications, 1000);
                }
            }, DELETE_REQUEST);
        }
    };
})();