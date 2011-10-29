package com.announcify.web.gwt.client;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.user.client.Window;

public class Background implements EntryPoint {

	@Override
	public void onModuleLoad() {
		addBrowserAction(this);
	}


	private void onBrowserActionClicked(String url) {
		// TODO: lang
		Window.open(getHtmlUrl(this) + "?url=" + url, "announcify.web", null);
	}


	private native void addBrowserAction(Background background) /*-{
		chrome.browserAction.onClicked.addListener(function (tab) {
			background.@com.announcify.web.gwt.client.Background::onBrowserActionClicked(Ljava/lang/String;)(tab.url);
		});
	}-*/;
	
	private native String getHtmlUrl(Background background) /*-{
		return chrome.extension.getURL("html/announcify.html");
	}-*/;
}
