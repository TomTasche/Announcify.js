package com.announcify.web.gwt.client;

import com.google.gwt.core.client.JavaScriptObject;

public final class Article extends JavaScriptObject {

	public native static Article parseArticle(String json) /*-{
		return JSON.parse(json);
	}-*/;


	//	String icon;
	//	String title;
	//	String html;
	//	String date;
	//	String url;
	//	String xpath;
	//	Media[] media;


	protected Article() {}


	public native String getHtml() /*-{
		return this.html;
	}-*/;

	public native String getDate() /*-{
		return this.date;
	}-*/;

	public native String getIcon() /*-{
		return this.icon;
	}-*/;

	public native String getTitle() /*-{
		return this.title;
	}-*/;
}
