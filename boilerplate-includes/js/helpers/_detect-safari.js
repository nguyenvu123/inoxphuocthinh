/*
    (function ($) {
        'use strict';
        $(document).ready(function () {
            if (detectSafari()) {
                alert('This is safari !');
            }
        });
    })(jQuery);
*/

function detectSafari() {
    var UserAgent = navigator.userAgent;
    if (UserAgent.search("Safari") >= 0 && UserAgent.search("Chrome") < 0) {
        return true;
    } else {
        return false;
    }
}