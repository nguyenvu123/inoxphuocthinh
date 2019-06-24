function detectNewHtmlElements(options) {
    if (Modernizr.mutationobserver) {
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.addedNodes) {
                    $.each(options, function (key, item) {
                        if ($(mutation.addedNodes[0]).is(item.selector)) {
                            item.callback($(mutation.addedNodes[0]));
                        } else if ($(mutation.addedNodes[0]).find(item.selector).length) {
                            $(mutation.addedNodes[0]).find(item.selector).each(function () {
                                item.callback($(this));
                            });
                        }
                    });
                }
            });
        });
        var config = {
            attributes : false,
            childList : true,
            subtree : true,
            characterData : false
        };
        observer.observe($('body')[0], config);
    } else {
        $(document).on('DOMNodeInserted', function (e) {
            var target = $(e.target);
            $.each(options, function (key, item) {
                if (target.is(item.selector)) {
                    item.callback(target);
                } else if (target.find(item.selector).length) {
                    target.find(item.selector).each(function () {
                        item.callback($(this));
                    });
                }
            });
        });
    }
}