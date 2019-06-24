/*
    (function ($) {
        'use strict';
        $(window).on('load', function () { // Always wait for CSS to load
            var div = $('.mydiv').get(0);
            if (isInViewport(div)) {
                console.log('the div is entirely in the viewport');
            }
        });
    })(jQuery);
*/

function isInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= boilerplate_display.getHeight() &&
        rect.right <= boilerplate_display.getWidth()
    );
}