var TAGSOUP = (function() {
    var regex = /<.*?>/g;
    var remSpecial = /[\u007c]/ //verticalbar for now

    return {
        getText: function(html) {
            return html.replace(regex, "");
        }
    };
})();

