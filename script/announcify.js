var ANNOUNCIFY = (function() {

    var listener = function(e){};

    var isSpeaking = false;
    var isPaused = false;
    var lastText = "";

    return {

        announcify: function(text, lang) {
            rate = SETTINGS.get("rate");
            pitch = SETTINGS.get("pitch");
            volume = SETTINGS.get("volume");
            voice = SETTINGS.get("voices");

            lastText = text;
            isSpeaking = true;
            isPaused = false;

            // TODO: use lang. at the moment it simply breaks everything, because current TTS-Engines expect "en-US" instead of "en"
            chrome.tts.speak(text, {"enqueue": true, "rate": rate, "pitch": pitch, "voiceName": voice, "onEvent": this.callback});
        },

        stop: function() {
            isSpeaking = false;
            isPaused = false;
            chrome.tts.stop();
        },

        pause: function(){
            isSpeaking = false;
            isPaused = true;
            chrome.tts.stop();
        },

        continue: function(){
            if(isPaused){
                rate = SETTINGS.get("rate");
                pitch = SETTINGS.get("pitch");
                volume = SETTINGS.get("volume");
                voice = SETTINGS.get("voices");

                isSpeaking = true;

                // TODO: use lang. at the moment it simply breaks everything, because current TTS-Engines expect "en-US" instead of "en"
                chrome.tts.speak(lastText, {"enqueue": true, "rate": rate, "pitch": pitch, "voiceName": voice, "onEvent": this.callback});
            }
            isPaused = false;
        },

        setEventListener: function(mycallback){
            listener = mycallback;
        },

        callback: function(e){57
            if (e.type == "end") {
            
            } else if(e.type == "interrupted"){
            
            }
            console.log(e.type);
            listener(e);
        },

        isSpeaking: function(){
            return isSpeaking;
        },

        isPaused: function(){
            return isPaused;
        }

    };
})();

