(function ($) {
    'use strict';

    var eventInit;
    if (Modernizr.customevent) {
        eventInit = new Event('iframeInit');
    } else {
        eventInit = document.createEvent('Event');
        eventInit.initEvent('iframeInit', true, true);
    }

    var lazyIframeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var elem = $(entry.target);
                lazyIframeObserver.unobserve(entry.target);
                var custom_attributes = [];
                var attributes = elem.get(0).attributes;
                for (var i = 0; i < attributes.length; i++) {
                    if (attributes[i].name.indexOf('data-custom-') > -1) {
                        custom_attributes.push({
                            name : attributes[i].name.replace('data-custom-', ''),
                            value : attributes[i].value
                        });
                    }
                }
                var markup = '<iframe src="' + elem.attr('data-lazy-src') + '"';
                custom_attributes.forEach(function (custom_attribute) {
                    markup += ' ' + custom_attribute.name + '="' + custom_attribute.value + '" ';
                });
                markup += '></iframe>';
                var newDomElement = $(markup).insertAfter(elem);
                elem.remove();
                newDomElement.get(0).dispatchEvent(eventInit);
            }
        });
    });

    $(document).ready(function () {
        initIframes();
        $(window).on('resizeend', function () {
            initIframes();
        });
        if (Modernizr.mutationobserver) {
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.addedNodes) {
                        initIframes();
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
            $(document).on('DOMNodeInserted', function () {
                initIframes();
            });
        }
    });

    function initIframes() {
        var selector = '.lazyload-iframe:not(.initialized)';
        $(selector).each(function () {
            $(this).addClass('initialized');
            lazyIframeObserver.observe(this);
        });
    }

})(jQuery);