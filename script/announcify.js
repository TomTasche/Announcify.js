function announcify(text, lang, callback) {
    rate = settings.get("rate");
    pitch = settings.get("pitch");
    volume = settings.get("volume");
    voice = settings.get("voices");
    
    // TODO: use lang. at the moment it simply breaks everything, because current TTS-Engines expect "en-US" instead of "en"
    chrome.tts.speak(text, {"enqueue": true, "rate": rate, "pitch": pitch, "voiceName": voice, "onEvent": callback});
}

function stop() {
    chrome.tts.stop();
}