var SERVER_URL = "https://announcify-engine.appspot.com/";
var oauth = ChromeExOAuth.initBackgroundPage({
    'request_url': SERVER_URL + "_ah/OAuthGetRequestToken",
    'authorize_url': SERVER_URL + "_ah/OAuthAuthorizeToken",
    'access_url': SERVER_URL + "_ah/OAuthGetAccessToken",
    'consumer_key': "anonymous",
    'consumer_secret': "anonymous",
    // 'scope': <scope of data access, not used by all OAuth providers>,
    'app_name': "Announcify"
});