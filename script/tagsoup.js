var tagsoup = (function() {
    var regex = /<.*?>/g;

    return {
        getText: function(html) {
            return html.replace(regex, "");
        }
    };
})();