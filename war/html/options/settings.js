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
				["1", "voice 1" ],
				["2", "voice 2" ],
				["3", "voice 3" ],
				["4", "voice 4" ],
				["5", "voice 5" ]
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
		
		for (var i = 0; i < voicesToAdd.length; i++) {
			v = voicesToAdd[i];
			// console.log('  name: ' + v.voiceName);
			// console.log('  lang: ' + v.lang);
			// console.log('  gender: ' + v.gender);
			// console.log('  extension id: ' + v.extensionId);
			// console.log('  event types: ' + v.eventTypes);
			
			option = document.createElement("option");
			option.text = 'Voice ' + i;
			option.value = i;
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
	
	settings.manifest.load.addEvent("action", function () {
		chrome.tts.getVoices(addVoices);
	});
	
	console.log("loading voices");
	chrome.tts.getVoices(addVoices);

});
