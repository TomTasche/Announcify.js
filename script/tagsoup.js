var TAGSOUP = (function() {
    var regex = /<.*?>/g;

    return {
        getText: function(html) {
            return html.replace(regex, "");
        }
    };
})();