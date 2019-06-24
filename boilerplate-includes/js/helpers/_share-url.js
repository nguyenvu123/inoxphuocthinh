/*
    (function ($) {
        'use strict';
        $(document).ready(function () {
            $('#facebook').click(function (e) {
                e.preventDefault();
                var url = $(this).attr('data-url');
                share_url('facebook', url);
            });
            $('#twitter').click(function (e) {
                e.preventDefault();
                var url = $(this).attr('data-url');
                share_url('twitter', url);
            });
        });
    })(jQuery);

    <span id="facebook" data-url="http://google.com/" />
    <span id="twitter" data-url="http://google.com/" />
*/

function share_url(social_network, url) {
    var windowObjectReference;
    if (social_network == 'facebook') {
        windowObjectReference = window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURI(url), 'fbShareWindow', 'height=450, width=550, resizable=1, top=' + (boilerplate_display.getHeight() / 2 - 225) + ', left=' + (boilerplate_display.getWidth() / 2 - 275) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
    } else if (social_network == 'twitter') {
        windowObjectReference = window.open('https://twitter.com/intent/tweet?url=' + encodeURI(url), 'Twitter', 'height=285, width=550, resizable=1, top=' + (boilerplate_display.getHeight() / 2 - 142.5) + ', left=' + (boilerplate_display.getWidth() / 2 - 275) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
    }
    return windowObjectReference;
}