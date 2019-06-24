/*
 * @file
 *
 * Available variables
 * - boilerplate_display
 *
 */

var boilerplate_display = {};

(function ($) {
    'use strict';

    boilerplate_display.getHeight = function () {
        return verge.viewportH();
    };
    boilerplate_display.getWidth = function () {
        return verge.viewportW();
    };
    boilerplate_display.getScrollY = function () {
        return verge.scrollY();
    };
    boilerplate_display.getScrollX = function () {
        return verge.scrollX();
    };
    boilerplate_display.getOrientation = function () {
        return getOrientation(boilerplate_display.getWidth(), boilerplate_display.getHeight());
    };

    boilerplate_display.height = verge.viewportH();
    boilerplate_display.width = verge.viewportW();
    boilerplate_display.scrollY = verge.scrollY();
    boilerplate_display.scrollX = verge.scrollX();
    boilerplate_display.orientation = getOrientation(boilerplate_display.width, boilerplate_display.height);

    $(window).on('resizeend', function () {
        boilerplate_display.scrollYOrigin = boilerplate_display.scrollY;
        boilerplate_display.scrollXOrigin = boilerplate_display.scrollX;
        boilerplate_display.scrollY = verge.scrollY();
        boilerplate_display.scrollX = verge.scrollX();
        boilerplate_display.orientationOrigin = boilerplate_display.orientation;
        boilerplate_display.heightOrigin = boilerplate_display.height;
        boilerplate_display.widthOrigin = boilerplate_display.width;
        boilerplate_display.height = verge.viewportH();
        boilerplate_display.width = verge.viewportW();
        boilerplate_display.orientation = getOrientation(boilerplate_display.width, boilerplate_display.height);
    });

    $(window).on('scroll', function () {
        boilerplate_display.scrollYOrigin = boilerplate_display.scrollY;
        boilerplate_display.scrollXOrigin = boilerplate_display.scrollX;
        boilerplate_display.scrollY = verge.scrollY();
        boilerplate_display.scrollX = verge.scrollX();
    });

    function getOrientation(width, height) {
        if (height > width) {
            return 'portrait';
        } else if (height < width) {
            return 'landscape';
        } else {
            return 'square';
        }
    }

})(jQuery);