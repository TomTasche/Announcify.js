window.addEvent("domready", function () {
    var settings = new FancySettings(manifest.name, manifest.icon);
	settings.manifest = {};

	// create list of voices	
	voiceSettings = settings.create({
		"tab": i18n.get("tts"),
		"group": i18n.get("general"),
		"name": "voices",
		"type": "popupButton",
		"label": i18n.get("voice"),
		"options": {
			values: [
				["1", "default" ]
			],
		},
	});
	
	manifest.settings.each(function (params) {
		output = settings.create(params);
		if (params.name !== undefined) {
			settings.manifest[params.name] = output;
		}
	});
    
	ttsVoices = [];
	
	var addVoices = function(voicesToAdd) {
		ttsVoices = voicesToAdd;
		select = voiceSettings.element;
		
		// reset current options
		select.length = 0;
        
        if (voicesToAdd.length === 0) {
            install = confirm("There's no Text-To-Speech engine installed on your system. Do you want to install one from Chrome Web Store?");
            if (install === true) {
                window.location.href = "https://chrome.google.com/webstore/detail/jcabofbhfighebggomnamjankeaplmhn";
            } else {
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
				console.log("added: " + result);
			} catch (e){
				console.log(e);
			}
		}
	};
	
	// button to reload voices
	//settings.manifest.load.addEvent("action", function () {
	//	chrome.tts.getVoices(addVoices);
	//});
	
	settings.manifest.save_settings.addEvent("action", function () {
		for (var f in settings.manifest) {
			var s = settings.manifest[f]; 
			console.log("storing value: " + s);
			try {
				localStorage[f] = s.get();
			} catch (e) {
				console.log(e);
			}
		}	
	});

	settings.manifest.test.addEvent("action", function () {
		chrome.tts.speak("Thanks for using Announcify!", {
				"rate": settings.manifest["rate"].get(),
				"pitch": settings.manifest["pitch"].get(),
				"volume": settings.manifest["volume"].get()
		});
	});
	
	console.log("loading voices");
	chrome.tts.getVoices(addVoices);

});
