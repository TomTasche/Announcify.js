package com.announcify.web.gwt.tts;

public class SpeakJsEngine implements TtsEngine {

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
	public native void speak(String text) /*-{
		$wnd.speak(text);
	}-*/;
}
