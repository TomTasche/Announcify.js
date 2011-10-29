package com.announcify.web.gwt.tts;


public class ChromeTtsEngine implements TtsEngine {

	UtteranceCompletedListener utteranceListener;
	TtsEngineInitializedListener listener;
	boolean supported;


	public ChromeTtsEngine(TtsEngineInitializedListener listener, UtteranceCompletedListener utteranceCompletedListener) {
		this.listener = listener;
		this.utteranceListener = utteranceCompletedListener;

		isSupported(this);
	}


	@Override
	public boolean isSupported() {
		return supported;
	}

	@Override
	public String getInstructionsUrl() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public native void speak(String text) /*-{
		chrome.tts.speak(text);
	}-*/;

	public native void speak(UtteranceCompletedListener completedListener, String text, boolean enqueue) /*-{
		chrome.tts.speak(text, {"enqueue": enqueue, onEvent: function(event) {
			if (event.type == "end") {
				completedListener.@com.announcify.web.gwt.tts.UtteranceCompletedListener::onUtteranceCompleted()();
			} else if (event.type == "error") {
				console.log('error: ' + event.errorMessage);
				
				// TODO: handle error
			}
		}});
	}-*/;


	private native boolean isSupported(ChromeTtsEngine engine) /*-{
		chrome.tts.getVoices(
		    function(voices) {
		    	var supported = voices.length > 0; 

				engine.@com.announcify.web.gwt.tts.ChromeTtsEngine::setSupported(Z)(supported);
		});
	}-*/;


	public void setSupported(boolean supported) {
		this.supported = supported;

		if (listener != null) listener.initialized(this);
	}
}
