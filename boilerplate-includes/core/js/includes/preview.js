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
        $('body').append('<div class="iframe-viewer"><div class="loader"><div></div><div></div></div><div class="container"><div class="header"><p class="title"></p><span class="close"></span></div></div></div>');
        $(document).click(function (e) {
            if ($(e.target).is('.iframe-viewer.visible')) {
                e.preventDefault();
                closeViewer();
            } else if ($(e.target).is('.iframe-viewer.loading') || $(e.target).is('.iframe-viewer .loader') || $(e.target).is('.iframe-viewer .loader div')) {
                e.preventDefault();
                removeIfrrame();
                closeViewer();
            }
        });
        $('.iframe-viewer .close').click(function (e) {
            e.preventDefault();
            closeViewer();
        });
        $(document).keyup(function (e) {
            if (e.keyCode == 27) {
                if ($('.iframe-viewer').hasClass('visible')) {
                    e.preventDefault();
                    closeViewer();
                }
            }
        });
        $('.iframe-open').click(function (e) {
            e.preventDefault();
            var viewer = $('.iframe-viewer');
            removeIfrrame();
            var src = $(this).attr('data-src');
            var iframe = $('<iframe src="' + src + '"></iframe>');
            var reload_element = viewer.find('.reload');
            if ($(this).get(0).hasAttribute('data-preview-title')) {
                viewer.find('.title').html($(this).attr('data-preview-title'));
                if (reload_element.length) {
                    reload_element.remove();
                }
            } else {
                var filename = src.substring(src.lastIndexOf('/') + 1);
                viewer.find('.title').html('<a title="Open ' + filename + ' in a new tab" href="' + src + '" target="_blank" rel="noopener">' + filename + '</a>');
                if (!reload_element.length) {
                    reload_element = $(
                        '<span class="reload"></span>'
                    );
                    reload_element.click(function (e) {
                        e.preventDefault();
                        iframe.attr('src', iframe.attr('src'));
                    });
                    viewer.find('.header').prepend(reload_element);
                }
            }
            viewer.find('.container').append(iframe);
            viewer.addClass('loading');
            iframe.on('load', function () {
                openViewer();
            });
        });
    });

    function openViewer() {
        $('.iframe-viewer').addClass('visible').removeClass('loading');
        $('html, body').addClass('disableScroll');
    }

    function closeViewer() {
        $('.iframe-viewer').removeClass('visible loading');
        $('html, body').removeClass('disableScroll');
    }

    function removeIfrrame() {
        $('.iframe-viewer').find('iframe').remove();
    }

})(jQuery);
