package com.announcify.web.gwt.client;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.dom.client.Document;
import com.google.gwt.dom.client.Element;
import com.google.gwt.user.client.DOM;
import com.google.gwt.user.client.Window;
import com.google.gwt.user.client.Window.ClosingEvent;
import com.google.gwt.user.client.Window.ClosingHandler;
import com.google.gwt.xhr.client.ReadyStateChangeHandler;
import com.google.gwt.xhr.client.XMLHttpRequest;

public class Announcify implements EntryPoint {

	private static final String API_TOKEN = "b72fef8077d8741f511f929533291683";
	private static final String API_URL = "https://www.diffbot.com/api/article?token=" + API_TOKEN + "&url=";
	private static final String API_URL_APPENDIX = "&html=true";
	
	Announcificator announcificator;


	@Override
	public void onModuleLoad() {
		String url = Window.Location.getParameter("url");
		fetchArticle(url);
		
		Window.addWindowClosingHandler(new ClosingHandler() {
			
			@Override
			public void onWindowClosing(ClosingEvent event) {
				if (announcificator != null) announcificator.stop();
			}
		});
	}


	private void displayArticle(Article article) {
		Element articleElement = DOM.createDiv();
		articleElement.setId("div_article");
		articleElement.setInnerHTML(article.getHtml());

		Document.get().getBody().appendChild(articleElement);
		
		setArticleDate(article.getDate());
		setArticleIcon(article.getIcon());
		setArticleTitle(article.getTitle());
		
		announcificator = Announcificator.getAnnouncificator(Document.get());
		announcificator.announcify();
	}

	private void fetchArticle(String url) {
		XMLHttpRequest request = XMLHttpRequest.create();
		request.open("GET", API_URL + url + API_URL_APPENDIX);
		request.setOnReadyStateChange(new ReadyStateChangeHandler() {

			@Override
			public void onReadyStateChange(XMLHttpRequest xhr) {
				if (xhr.getReadyState() == XMLHttpRequest.DONE) { 
					Article article = Article.parseArticle(xhr.getResponseText());
					displayArticle(article);
				}
			}
		});
		request.send();
	}


	private native void setArticleTitle(String title) /*-{
		return $wnd.setTitle(title);
	}-*/;

	private native void setArticleDate(String date) /*-{
		return $wnd.setDate(date);
	}-*/;

	private native void setArticleIcon(String icon) /*-{
		return $wnd.setIconPath(icon);
	}-*/;
}
