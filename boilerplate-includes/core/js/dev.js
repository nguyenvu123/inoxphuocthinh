/*
 * @file
 *
 * Available variables
 * - boilerplate_display
 *
*/

(function ($) {
    'use strict';

    $(document).ready(function () {
        console.log('DOM is ready! JS\'s running 🚀 Load time : ' + (parseInt(Date.now()) - parseInt(boilerplate_timer)) + 'ms.');
    });
    $(window).on(
        {
            'load': function () {
                console.log('The document has finished loading! Total load time : ' + (parseInt(Date.now()) - parseInt(boilerplate_timer)) + 'ms.');
            },
            'resizeend': function () {
                console.log('Window has been resized!');
            }
        }
    );
    $(window).on('load resizeend', function () {
        if (boilerplate_display) {
            console.log('boilerplate_display');
        }
    });

})(jQuery);