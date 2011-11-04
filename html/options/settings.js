window.addEvent("domready", function() {
    var settings = new FancySettings(manifest.name, manifest.icon);
    settings.manifest = {};
    manifest.settings.each(function(params) {
        output = settings.create(params);
        if (params.name !== undefined) {
            settings.manifest[params.name] = output;
        }
    });
    
    voiceSettings = settings.manifest.voices;
    ttsVoices = [];
    var addVoices = function(voicesToAdd) {
            ttsVoices = voicesToAdd;
            select = voiceSettings.element;
            
            select.length = 0;
            if (voicesToAdd.length === 0) {
                install = confirm("There's no Text-To-Speech engine installed on your system. Do you want to install one from Chrome Web Store?");
                if (install === true) {
                    window.location.href = "https://chrome.google.com/webstore/detail/jcabofbhfighebggomnamjankeaplmhn";
                }
                else {
                    window.alert("We can't make Announcify working for you if you don't have a Text-To-Speech engine installed. Sorry!");
                }
                return;
            }
            
            for (var i = 0; i < voicesToAdd.length; i++) {
                v = voicesToAdd[i];
                // console.log('  name: ' + v.voiceName);
                // console.log('  lang: ' + v.lang);
                // console.log('  gender: ' + v.gender);
                // console.log('  extension id: ' + v.extensionId);
                // console.log('  event types: ' + v.eventTypes);
                option = document.createElement("option");
                option.text = 'Voice ' + i;
                option.value = v.voiceName;
                if (v.voiceName !== undefined) {
                    option.text += ": " + v.voiceName;
                }
                try {
                    var result = select.add(option, null);
                }
                catch (e) {
                    console.log(e);
                }
            }
        };
        
    settings.manifest.save_settings.addEvent("action", function() {
        for (var f in settings.manifest) {
            var s = settings.manifest[f];
            
            try {
                localStorage[f] = s.get();
            }
            catch (e) {
                console.log(e);
            }
        }
    });
    settings.manifest.reload_settings.addEvent("action", function() {
        var store = new Store("settings");
        for (var name in settings.manifest) {
            var setting = settings.manifest[name];
            if (typeof setting.set === "function") {
                setting.set(store.get(setting.params.name));
            }
        }
    });
    settings.manifest.test.addEvent("action", function() {
        chrome.tts.speak("Thanks for using Announcify!", {
            "voiceName": settings.manifest["voices"].get(),
            "rate": settings.manifest["rate"].get(),
            "pitch": settings.manifest["pitch"].get(),
            "volume": settings.manifest["volume"].get()
        });
    });
    settings.manifest.auth.addEvent("action", function() {
        oauth.authorize(function() {
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
        });
    });
    
    chrome.tts.getVoices(addVoices);
});