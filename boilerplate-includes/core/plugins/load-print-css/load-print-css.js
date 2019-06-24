(function ($) {
    'use strict';

    $(window).on('load', function () {
        if (typeof boilerplate_print_css_url !== 'undefined' && boilerplate_print_css_url !== null) {
            $('head').append('<link rel="stylesheet" href="' + boilerplate_print_css_url + '" type="text/css" media="print"/>')
        }
    });

})(jQuery);