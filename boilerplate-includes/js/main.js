const config = {

    /* Compiled Bundle destination */
    output_path : 'public/assets/js/main.js',

    /* Include jQuery in the bundle; true/false */
    jQuery : true,

    /* Include a boilerplate_random variable in the bundle. Its value changes everytime you run the Frontend Boilerplate. */
    include_random_variable : false,

    /* Path to external libs (e.g. sliders, modals ...). */
    /* Most likely node_modules or includes stuffs */
    src : [
        // 'node_modules/slick-carousel/slick/slick.js',
        // 'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
        'boilerplate-includes/js/includes/**/*.js'
    ],

    plugins : {

        /* Include Modernizr tests at the beginning of the bundle if feature-detects is filled. */
        /* Features : https://modernizr.com/download */
        /* If you change this value you need to restart the Frontend Boilerplate. */
        modernizr : {
            /* https://modernizr.com/download?video-videoloop */
            'feature-detects' : [
                // "test/video",
                // "test/video/loop"
            ]
        },

        /* If this option is enabled, the following dependencies will be included in the bundle : */
        /* It will add a <link rel="stylesheet"> element after page load if boilerplate_print_css_url is defined. */
        /* - boilerplate-includes/core/plugins/load-print-css/load-print-css.js */
        load_print_css: true,

        /* Refer to documentation, Plugin: Built-in JavaScript viewport informations (boilerplate_display) */
        /* If this option is enabled, the following dependencies will be included in the bundle : */
        /* - jquery.resizeend: https://www.npmjs.com/package/jquery.resizeend */
        /* - verge: https://www.npmjs.com/package/verge */
        /* - boilerplate-includes/core/js/display.js */
        boilerplate_display : true,

        /* Refer to documentation, Plugin: Responsive/Retina/Lazyload image */
        /* If this option is enabled, the following dependencies will be included in the bundle : */
        /* - Polyfill: https://www.npmjs.com/package/intersection-observer */
        /* - Modernizr tests (test/dom/mutationObserver, test/customevent, test/img/srcset) */
        /* - boilerplate-includes/core/plugins/responsive-image/responsive-image.js */
        responsiveImage : false,

        /* Refer to documentation, Plugin: Detect New Html Elements */
        /* If this option is enabled, the following dependencies will be included in the bundle : */
        /* - Modernizr test (test/dom/mutationObserver) */
        /* - boilerplate-includes/core/plugins/detect-new-html-elements/detect-new-html-elements.js */
        detectNewHtmlElements : false,

        /* Refer to documentation, Plugin: Lazyload Iframe */
        /* If this option is enabled, the following dependencies will be included in the bundle : */
        /* - Polyfill: https://www.npmjs.com/package/intersection-observer */
        /* - Modernizr tests (test/dom/mutationObserver, test/customevent) */
        /* - boilerplate-includes/core/plugins/lazyload-iframe/lazyload-iframe.js */
        lazyloadIframe : false,

        /* If this option is enabled and if --dev option is detected, the following dependencies will be included in the bundle : */
        /* - boilerplate-includes/core/js/dev.js */
        /* It will provide additional useful informations in console. */
        dev : true

    }

};

module.exports = config;