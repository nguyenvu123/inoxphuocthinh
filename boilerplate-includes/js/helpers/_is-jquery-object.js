/*
    (function ($) {
        'use strict';
        $(document).ready(function () {
            if (isjQueryObject(element)) {
                element.get(0).getBoundingClientRect();
            } else {
                element.getBoundingClientRect();
            }
        });
    })(jQuery);
*/

function isjQueryObject(obj) {
    return (obj && (obj instanceof jQuery || obj.constructor.prototype.jquery));
}