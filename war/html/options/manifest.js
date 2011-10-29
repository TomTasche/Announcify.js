this.manifest = {
    "name": "Announcify TTS",
    "icon": "../../img/icon_48.png",
    "settings": [
    	// general
    	/* button to reload voices
        {
            "tab": i18n.get("tts"),
            "group": i18n.get("general"),
            "name": "load",
            "type": "button",
            "text": "Reload voices"
        },*/
        
        {
            "tab": i18n.get("tts"),
            "group": i18n.get("general"),
            "name": "volume",
            "type": "slider",
            "label": i18n.get("volume"),
            "max": 1,
            "min": 0,
            "step": 0.01,
            "display": true,
            "displayModifier": function (value) {
                return (value * 100).floor() + "%";
            }
        },

        {
            "tab": i18n.get("tts"),
            "group": i18n.get("general"),
            "name": "test",
            "type": "button",
            "label": i18n.get("test_label"),
            "text": i18n.get("test")
        },

        {
            "tab": i18n.get("tts"),
            "group": i18n.get("general"),
            "name": "save_settings",
            "type": "button",
            "text": i18n.get("save_settings")
        },

        {
            "tab": i18n.get("tts"),
            "group": i18n.get("general"),
            "name": "reload_settings",
            "type": "button",
            "text": i18n.get("reload_settings")
        },

        // details
        {
            "tab": i18n.get("tts"),
            "group": i18n.get("details"),
            "name": "rate",
            "type": "slider",
            "label": i18n.get("rate"),
            "max": 10,
            "min": 0.1,
            "step": 0.05,
            "display": true,
            "displayModifier": function (value) {
                return (value * 10000).floor() / 10000 + "x";
            }
        },
        {
            "tab": i18n.get("tts"),
            "group": i18n.get("details"),
            "name": "rate-description",
            "type": "description",
            "text": i18n.get("rate_description")
        },
        {
            "tab": i18n.get("tts"),
            "group": i18n.get("details"),
            "name": "pitch",
            "type": "slider",
            "label": i18n.get("pitch"),
            "max": 2,
            "min": 0,
            "step": 0.01,
            "display": true,
            "displayModifier": function (value) {
                return (value * 100).floor() / 100 + "x";
            }
        }
    ]
        /*
    "alignment": [
        [
            "username",
            "password"
        ],
        [
            "noti_volume",
            "sound_volume"
        ]
    ]*/
};
