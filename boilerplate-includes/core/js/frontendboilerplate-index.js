const mainConfig = require('../../frontendboilerplate-configuration');

const config = {
    output_path : false,
    jQuery : true,
    src : [
        'boilerplate-includes/core/js/includes/**/*.js'
    ],
    plugins : {
        modernizr : {
            'feature-detects' : []
        },
        boilerplate_display : true,
        load_print_css: false,
        responsiveImage : false,
        detectNewHtmlElements: false,
        lazyloadIframe: false,
        dev : false
    }
};

module.exports = config;