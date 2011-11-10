var ANNOUNCIFY = (function() {
    return {
        announcify: function(text, lang, callback) {
            rate = SETTINGS.get("rate");
            pitch = SETTINGS.get("pitch");
            volume = SETTINGS.get("volume");
            voice = SETTINGS.get("voices");

            // TODO: use lang. at the moment it simply breaks everything, because current TTS-Engines expect "en-US" instead of "en"
            chrome.tts.speak(text, {"enqueue": true, "rate": rate, "pitch": pitch, "voiceName": voice, "onEvent": callback});
        },

        stop: function() {
            chrome.tts.stop();
        }
    };
})();