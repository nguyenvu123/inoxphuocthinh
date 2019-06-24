/*
    (function ($) {
        'use strict';
        $(window).on('load', function () { // Always wait for CSS to load
            var div = $('.mydiv');
            if (isVisibleInViewport(div)) {
                console.log('the div is partially or entirely in the viewport');
            }
        });
    })(jQuery);
*/

function isVisibleInViewport(el) {
    return verge.inViewport(el);
}