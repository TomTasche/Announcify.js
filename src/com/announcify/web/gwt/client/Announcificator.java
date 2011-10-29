package com.announcify.web.gwt.client;

import com.announcify.web.gwt.tts.ChromeTtsEngine;
import com.announcify.web.gwt.tts.UtteranceCompletedListener;
import com.google.gwt.dom.client.Document;
import com.google.gwt.dom.client.Element;
import com.google.gwt.dom.client.NodeList;

public class Announcificator implements UtteranceCompletedListener {

	private final ChromeTtsEngine TTS_ENGINE = new ChromeTtsEngine(null, this);


	public static Announcificator getAnnouncificator(Document document) {
		return new Announcificator(document);
	}


	int lastIndex = 0;

	NodeList<Element> paragraphs;


	private Announcificator(Document document) {
		paragraphs = document.getElementsByTagName("p");
	}


	public void announcify() {
//		highlight(lastIndex++);

		for (int i = 0; i < paragraphs.getLength(); i++) {
			TTS_ENGINE.speak(paragraphs.getItem(i).getInnerText(), true);
		}
	}

	@Override
	public void onUtteranceCompleted() {
		highlight(lastIndex++);
	}


	private native void highlight(int index) /*-{
		return $wnd.highlight(index);
	}-*/;
}
