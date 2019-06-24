global.modernizr_features_Global = {};

if (argv._[0] === 'watch' || argv._[0] === 'javascript' || typeof argv._[0] === 'undefined') {
    var jsFiles = glob.sync(rls(upath.join(rls(config.generateJs.src_path), '**', '*.js')), {
        ignore : [
            '**/_*.js'
        ]
    });
    var options = [];
    var add_classes_in_html_tag = config.generateJs.modernizr['add-classes-in-html-tag'];
    if (add_classes_in_html_tag) {
        options.push('setClasses');
    }
    var modernizr_total = 0;
    var modernizr_count = 0;
    jsFiles.forEach(function (file) {
        var fileConfig = require(upath.join(__dirname, file));
        fileConfig = JSON.parse(JSON.stringify(fileConfig));
        var features = fileConfig.plugins.modernizr['feature-detects'];
        var detectNewHtmlElements = fileConfig.plugins.detectNewHtmlElements;
        var responsiveImage = fileConfig.plugins.responsiveImage;
        var lazyloadIframe = fileConfig.plugins.lazyloadIframe;
        var modernizrFeatures = [];
        if (responsiveImage) {
            modernizrFeatures.push('test/dom/mutationObserver', 'test/customevent', 'test/img/srcset');
        }
        if (lazyloadIframe) {
            modernizrFeatures.push('test/dom/mutationObserver', 'test/customevent');
        }
        if (detectNewHtmlElements) {
            modernizrFeatures.push('test/dom/mutationObserver');
        }
        features.forEach(function (feature) {
            modernizrFeatures.push(feature);
        });
        if (modernizrFeatures.length) {
            modernizr_total++;
            modernizrFeatures = _.uniq(modernizrFeatures);
            modernizr.build(
                {
                    'feature-detects' : modernizrFeatures,
                    minify : !argv.dev,
                    options : options
                }, function (modernizr_build) {
                    modernizr_features_Global[file] = modernizr_build;
                    modernizr_count++;
                }
            );
        }
    });
    if (modernizr_total > 0) {
        log.info('Starting modernizr pre-compilation...');
        var callback = function () {
            if (modernizr_total == modernizr_count) {
                clearInterval(interval);
                log.info('Finished modernizr pre-compilation.');
                emitter.emit('modernizr_precompiled');
            }
        };
        var interval = setInterval(callback, 500);
    } else {
        emitter.emit('modernizr_precompiled');
    }
} else {
    emitter.emit('modernizr_precompiled');
}