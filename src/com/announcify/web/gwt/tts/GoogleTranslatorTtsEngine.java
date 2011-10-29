package com.announcify.web.gwt.tts;

import com.google.gwt.dom.client.Element;

public class GoogleTranslatorTtsEngine implements TtsEngine {

	private final Element audioElement;


	public GoogleTranslatorTtsEngine(Element audioElement) {
		this.audioElement = audioElement;
	}	


	@Override
	public boolean isSupported() {
		return true;
	}

	@Override
	public String getInstructionsUrl() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void speak(String text) {
		this.audioElement.setAttribute("src", "http://translate.google.com/translate_tts?tl=en&q=" + text);
	}
}
