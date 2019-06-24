(function ($) {
    'use strict';

    var isHighDensity = ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));
    var images = [];

    var eventInit;
    var eventUpdate;
    if (Modernizr.customevent) {
        eventInit = new Event('imageInit');
        eventUpdate = new Event('imageUpdate');
    } else {
        eventInit = document.createEvent('Event');
        eventInit.initEvent('imageInit', true, true);
        eventUpdate = document.createEvent('Event');
        eventUpdate.initEvent('imageUpdate', true, true);
    }

    var lazyImageObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var elem = $(entry.target);
                lazyImageObserver.unobserve(entry.target);
                elem.addClass('lazy_loaded');
                var goodUrl = elem.attr('data-lazyload-init-url');
                if (elem.is('img')) {
                    if (elem.attr('src') != goodUrl) {
                        elem.attr('src', goodUrl);
                        fireEvent(elem, true);
                    }
                } else {
                    if (elem.css('background-image').indexOf(goodUrl) == -1) {
                        elem.css('background-image', 'url(\'' + goodUrl + '\')');
                        fireEvent(elem, true);
                    }
                }
            }
        });
    });

    $(document).ready(function () {
        initImages();
        $(window).on('resizeend', function () {
            updateImages(false);
        });
        if (Modernizr.mutationobserver) {
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.addedNodes) {
                        initImages();
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
                initImages();
            });
        }
        $(window).on('load', function () {
            $('.load_img_when_page_fully_loaded').each(function () {
                var elem = $(this);
                if (!elem.hasClass('lazy_loaded')) {
                    lazyImageObserver.unobserve(elem.get(0));
                    elem.addClass('lazy_loaded');
                    var goodUrl = elem.attr('data-lazyload-init-url');
                    if (elem.is('img')) {
                        if (elem.attr('src') != goodUrl) {
                            elem.attr('src', goodUrl);
                            fireEvent(elem, true);
                        }
                    } else {
                        if (elem.css('background-image').indexOf(goodUrl) == -1) {
                            elem.css('background-image', 'url(\'' + goodUrl + '\')');
                            fireEvent(elem, true);
                        }
                    }
                }
            });
        });
    });

    function initImages() {
        var selector = '.lazy_responsive_retina_image:not(.initialized), .lazy_responsive_image:not(.initialized), .lazy_retina_image:not(.initialized), .lazy_image:not(.initialized), .retina_image:not(.initialized):not(img), .responsive_retina_image:not(.initialized), .responsive_image:not(.initialized)';
        if (!Modernizr.srcset) {
            selector += ', img.retina_image:not(.initialized)';
        }
        $(selector).each(function () {
            $(this).addClass('initialized');
            var urls = [];
            var custom_attributes = [];
            var attributes = this.attributes;
            for (var i = 0; i < attributes.length; i++) {
                var sizesAndUrls = false;
                if (attributes[i].name.indexOf('data-lazy-srcset-') > -1) {
                    sizesAndUrls = getImagesInformations(attributes[i], 1);
                } else if (attributes[i].name.indexOf('data-lazy-src-') > -1) {
                    sizesAndUrls = getImagesInformations(attributes[i], 2);
                } else if (attributes[i].name.indexOf('data-lazy-srcset') > -1) {
                    sizesAndUrls = getImagesInformations(attributes[i], 3);
                } else if (attributes[i].name.indexOf('data-lazy-src') > -1) {
                    sizesAndUrls = getImagesInformations(attributes[i], 4);
                } else if (attributes[i].name == 'data-srcset') {
                    sizesAndUrls = getImagesInformations(attributes[i], 5);
                } else if (attributes[i].name.indexOf('data-srcset-') > -1) {
                    sizesAndUrls = getImagesInformations(attributes[i], 6);
                } else if (attributes[i].name.indexOf('data-src-') > -1) {
                    sizesAndUrls = getImagesInformations(attributes[i], 7);
                }
                if (sizesAndUrls) {
                    urls.push(sizesAndUrls);
                }
                if (attributes[i].name.indexOf('data-custom-') > -1) {
                    custom_attributes.push({
                        name : attributes[i].name.replace('data-custom-', ''),
                        value : attributes[i].value
                    });
                }
            }
            if ($(this).is('img.retina_image')) {
                urls = [{
                    url : $(this).attr('src'),
                    urlRetina : $(this).attr('srcset').replace('2x', '').trim()
                }];
            }
            if (!custom_attributes.length) {
                custom_attributes = false;
            }
            if (!urls.length) {
                urls = false;
            }
            images.push({
                elem : this,
                urls : urls,
                attributes : custom_attributes
            });
        });
        updateImages(true);
    }

    function updateImages(init) {
        images.forEach(function (image, index, object) {
            var elem = $(image.elem);
            if (elem.length) {
                var goodUrl = false;
                if (image.urls.length > 1) {
                    image.urls.forEach(function (mq) {
                        if (mq.minWidth == 0) {
                            if (window.matchMedia('(max-width: ' + mq.maxWidth + 'px)').matches) {
                                goodUrl = mq;
                            }
                        } else if (!mq.maxWidth) {
                            if (window.matchMedia('(min-width: ' + mq.minWidth + 'px)').matches) {
                                goodUrl = mq;
                            }
                        } else {
                            if (window.matchMedia('(max-width: ' + mq.maxWidth + 'px) and (min-width: ' + mq.minWidth + 'px)').matches) {
                                goodUrl = mq;
                            }
                        }
                    });
                } else {
                    goodUrl = image.urls[0];
                }
                if (goodUrl.urlRetina) {
                    if (isHighDensity) {
                        goodUrl = goodUrl.urlRetina;
                    } else {
                        goodUrl = goodUrl.url;
                    }
                } else {
                    goodUrl = goodUrl.url;
                }
                if (elem.is('.responsive_image, .responsive_retina_image')) {
                    if (!elem.is('noscript')) {
                        changeUrlAndFireEvent(elem, goodUrl, init);
                    } else {
                        var classe;
                        if (elem.is('.responsive_image, .responsive_retina_image')) {
                            classe = 'generated_responsive_image';
                        } else {
                            classe = 'generated_responsive_retina_image';
                        }
                        var nextElement = elem.next('.' + classe);
                        if (nextElement.length) {
                            nextElement.attr('src', goodUrl);
                        } else {
                            var attributesString = '';
                            var attributeClass = ' class="' + classe;
                            image.attributes.forEach(function (attr) {
                                if (attr.name == 'class') {
                                    attributeClass += ' ' + attr.value;
                                } else {
                                    attributesString += ' ' + attr.name + '="' + attr.value + '" ';
                                }
                            });
                            attributeClass += '" ';
                            elem.after('<img src="' + goodUrl + '"' + attributeClass + attributesString + '/>');
                        }
                        fireEvent(elem, init);
                    }
                } else {
                    changeUrlAndFireEvent(elem, goodUrl, init);
                }
            } else {
                object.splice(index, 1);
            }
        });
    }

    function changeUrlAndFireEvent(elem, goodUrl, init) {
        if (elem.attr('class').indexOf('lazy_') > -1) {
            if (init) {
                elem.attr('data-lazyload-init-url', goodUrl);
                lazyImageObserver.observe(elem.get(0));
            } else {
                if (!elem.hasClass('lazy_loaded')) {
                    elem.attr('data-lazyload-init-url', goodUrl);
                } else {
                    if (elem.is('img')) {
                        if (elem.attr('src') != goodUrl) {
                            elem.attr('src', goodUrl);
                            fireEvent(elem, init);
                        }
                    } else {
                        if (elem.css('background-image').indexOf(goodUrl) == -1) {
                            elem.css('background-image', 'url(\'' + goodUrl + '\')');
                            fireEvent(elem, init);
                        }
                    }
                }
            }
        } else {
            if (elem.is('img')) {
                if (elem.attr('src') != goodUrl) {
                    elem.attr('src', goodUrl);
                    fireEvent(elem, init);
                }
            } else {
                if (elem.css('background-image').indexOf(goodUrl) == -1) {
                    elem.css('background-image', 'url(\'' + goodUrl + '\')');
                    fireEvent(elem, init);
                }
            }
        }
    }

    function fireEvent(elem, init) {
        if (init) {
            elem.get(0).dispatchEvent(eventInit);
        } else {
            elem.get(0).dispatchEvent(eventUpdate);
        }
    }

    function getImagesInformations(attr, type) {
        var attrName = attr.name;
        var attrValue = attr.value;
        var result = {};
        var numbers = false;
        var retinaUrls = false;
        switch (type) {
            case 1:
                retinaUrls = getRetinaUrls(attrValue);
                numbers = getSizes(attrName, 'data-lazy-srcset-');
                break;
            case 2:
                result.url = attrValue;
                numbers = getSizes(attrName, 'data-lazy-src-');
                break;
            case 3:
                retinaUrls = getRetinaUrls(attrValue);
                break;
            case 4:
                result.url = attrValue;
                break;
            case 5:
                retinaUrls = getRetinaUrls(attrValue);
                break;
            case 6:
                retinaUrls = getRetinaUrls(attrValue);
                numbers = getSizes(attrName, 'data-srcset-');
                break;
            case 7:
                result.url = attrValue;
                numbers = getSizes(attrName, 'data-src-');
                break;
        }
        if (numbers) {
            if (numbers.length > 1) {
                result.minWidth = numbers[0];
                result.maxWidth = numbers[1];
            } else {
                result.minWidth = numbers[0];
            }
        }
        if (retinaUrls) {
            result.url = retinaUrls.url;
            result.urlRetina = retinaUrls.urlRetina;
        }
        return result;
    }

    function getSizes(attrName, replace) {
        return attrName.replace(replace, '').split('-');
    }

    function getRetinaUrls(attrValue) {
        var result = {};
        var urls = attrValue.split(',');
        urls.forEach(function (url) {
            if (url.indexOf('1x') > -1) {
                result.url = url.replace('1x', '').trim();
            } else if (url.indexOf('2x') > -1) {
                result.urlRetina = url.replace('2x', '').trim();
            }
        });
        return result;
    }


})(jQuery);