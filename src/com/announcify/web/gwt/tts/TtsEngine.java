package com.announcify.web.gwt.tts;

public interface TtsEngine {

	public boolean isSupported();
	
	public String getInstructionsUrl();
	
	public void speak(String text);
}
