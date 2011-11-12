var ANNOUNCIFICATIONS = (function() {
    var URL = SERVER_URL + "announcifications";
    var GET_REQUEST = {
        'method': 'GET',
        'parameters': {
            // 'alt': 'json'
        }
    };
    var DELETE_REQUEST = {
        'method': 'DELETE',
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


    chrome.idle.onStateChanged.addListener(function(newState) {
        if (newState == "active") {
            getAnnouncifications();
        } else {
            // behave idle or locked...
        }
    });


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
                var notifications = JSON.parse(resp);
                var announce = [];

                if (notifications.gmail > 0) {
                    announce.push(notifications.gmail + " new Mails.");
                }
                if (notifications.twitter > 0) {
                    announce.push(notifications.twitter + " new Mentions on Twitter.");
                }
                if (notifications.facebook > 0) {
                    announce.push(notifications.facebook + " new Notifications on Facebook.");
                }

                for (var notification in announce) {
                    ANNOUNCIFY.announcify(notification);
                }
            }, GET_REQUEST);
        },

        resetAnnouncifications: function() {
            OAUTH.sendSignedRequest(URL, function(resp, xhr) {
                window.setTimeout(resetAnnouncifications, 1000);
            }, DELETE_REQUEST);
        }
    };
})();