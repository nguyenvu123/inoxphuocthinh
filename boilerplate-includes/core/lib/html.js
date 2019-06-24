const config = require('../../frontendboilerplate-configuration'),
    glob = require('glob'),
    rls = require('remove-leading-slash'),
    upath = require('upath'),
    Twig = require('twig'),
    fs = require('fs-extra'),
    os = require('os'),
    log = require('./log'),
    _ = require('lodash'),
    notifier = require('node-notifier'),
    localeCode = require('locale-code'),
    validator = require('html-validator'),
    argv = require('minimist')(process.argv.slice(2)),
    pretty = require('pretty'),
    showdown = require('showdown'),
    javascript = require('./javascript'),
    css = require('./css'),
    minify = require('html-minifier').minify;

Twig.cache(false);

module.exports = {
    copyIndexImages: function (destination) {
        fs.copySync(rls('./boilerplate-includes/core/images/'), destination);
    },
    copyIndexFonts: function (destination) {
        fs.copySync(rls('./boilerplate-includes/core/fonts/'), destination);
    },
    generate: function (source, destination, callback) {
        var success = true;
        var sourceFilename = upath.basename(source);
        var favicon_url = false;
        if (fs.pathExistsSync(rls(config.generateFavicon.output))) {
            favicon_url = upath.normalize(upath.relative(upath.dirname(destination), rls(config.generateFavicon.output)));
            if (favicon_url.substr(favicon_url.length - 1) != '/') {
                favicon_url = favicon_url + '/';
            }
        }
        var img_url = upath.normalize(upath.relative(upath.dirname(destination), rls(config.generateImages.folder)));
        if (img_url.substr(img_url.length - 1) != '/') {
            img_url = img_url + '/';
        }
        var img_frontend_boilerplate_demo = upath.relative(upath.dirname(destination), upath.normalize(upath.join(upath.dirname(destination), rls('./frontend-boilerplate-documentation/images/'))));
        if (img_frontend_boilerplate_demo.substr(img_frontend_boilerplate_demo.length - 1) != '/') {
            img_frontend_boilerplate_demo = img_frontend_boilerplate_demo + '/';
        }
        var js_files = false;
        if (config.generateJs.enable) {
            var jsFiles = glob.sync(rls(upath.join(rls(config.generateJs.src_path), '**', '*.js')), {
                ignore: [
                    '**/_*.js'
                ]
            });
            if (jsFiles.length) {
                js_files = [];
                jsFiles.forEach(function (file) {
                    delete require.cache[require.resolve(upath.relative(__dirname, file))];
                    js_files.push({
                        filename: upath.basename(file, '.js'),
                        url: upath.normalize(upath.relative(upath.dirname(destination), rls(JSON.parse(JSON.stringify(require(upath.relative(__dirname, file)))).output_path)))
                    });
                });
                js_files = _.sortBy(js_files, 'filename');
            }
        }
        var css_files = false;
        if (config.generateCss.enable) {
            var cssFiles = glob.sync(rls(upath.join(rls(config.generateCss.src_path), '**', '*.scss')), {
                ignore: [
                    '**/_*.scss'
                ]
            });
            if (cssFiles.length) {
                css_files = [];
                cssFiles.forEach(function (file) {
                    var filename = upath.basename(file, '.scss');
                    var fileContent = fs.readFileSync(file, 'utf8');
                    var regex = new RegExp("\\$output_path:\\s*['\"]?(.+?)['\"]?\\s*;", 'gmiu');
                    var matches = regex.exec(fileContent);
                    var cssDestination = false;
                    if (matches !== null) {
                        cssDestination = rls(matches[1]);
                    }
                    if (cssDestination) {
                        css_files.push({
                            filename: filename,
                            url: upath.normalize(upath.relative(upath.dirname(destination), cssDestination))
                        });
                    }
                });
                css_files = _.sortBy(css_files, 'filename');
            }
        }
        var html_files = false;
        var templatesfiles = glob.sync(rls(upath.join(rls(config.generateHtml.src), '**', '*.twig')), {
            ignore: [
                "**/_*.twig"
            ]
        });
        if (templatesfiles.length) {
            html_files = [];
            templatesfiles.forEach(function (html_file) {
                var filename = upath.basename(html_file, '.twig');
                var htmldestination = rls(upath.join(rls(config.generateHtml.output), upath.basename(html_file, '.twig') + '.html'));
                var htmlfileContent = fs.readFileSync(html_file, 'utf8');
                var regex = new RegExp("\\{%\\s*set\\s*output_path\\s*=\\s*['\"]?(.+?)['\"]?\\s*%\\}", 'gmiu');
                var matches = regex.exec(htmlfileContent);
                if (matches !== null) {
                    htmldestination = rls(upath.join(upath.dirname(htmldestination), rls(matches[1])));
                }
                html_files.push({
                    filename: filename,
                    url: upath.normalize(upath.relative(rls(config.generateHtml.output), htmldestination))
                });
            });
            html_files = _.sortBy(html_files, 'filename');
        }
        var project_git_url = config.project_git_url.trim();
        if (project_git_url.length == 0) {
            project_git_url = false;
        }
        var project_preview_links = config.project_preview_links;
        if (project_preview_links.length == 0) {
            project_preview_links = false;
        }
        var project_other_links = config.project_other_links;
        if (project_other_links.length == 0) {
            project_other_links = false;
        }
        var js_code_demo = false;
        var css_code_demo = false;
        var css_print_code_demo = false;
        if (sourceFilename == 'index.twig') {
            var js_code_demo_path = './boilerplate-includes/core/js/frontendboilerplate-index.js';
            delete require.cache[require.resolve(upath.relative(__dirname, js_code_demo_path))];
            var fileConfig = require(upath.relative(__dirname, js_code_demo_path));
            fileConfig = JSON.parse(JSON.stringify(fileConfig));
            var result = javascript.generate(rls(js_code_demo_path), fileConfig);
            if (result.code && result.success) {
                js_code_demo = result.code;
            }
            var css_code_demo_path = './boilerplate-includes/core/scss/frontendboilerplate-index.scss';
            var result = css.generate(rls(css_code_demo_path), false, 2000, true, false);
            if (result.code && result.success) {
                css_code_demo = result.code;
            }
            var css_print_code_demo_path = './boilerplate-includes/core/scss/frontendboilerplate-print.scss';
            var result = css.generate(rls(css_print_code_demo_path), false, 2000, false, false);
            if (result.code && result.success) {
                css_print_code_demo = result.code;
            }
        }
        var fileExtension = upath.extname(source);
        new Promise(function (resolve) {
            if (fileExtension == '.md') {
                if (fs.pathExistsSync(source)) {
                    var fileContent = fs.readFileSync(source, 'utf8');
                    var converter = new showdown.Converter({
                        emoji: true,
                        completeHTMLDocument: true,
                        tables: true,
                        backslashEscapesHTMLTags: true,
                        simpleLineBreaks: false,
                        tablesHeaderId: true,
                        parseImgDimensions: true
                    });
                    var styles = '<style>.markdown-body { box-sizing: border-box; min-width: 200px; max-width: 980px; margin: 0 auto; padding: 45px; } @media (max-width: 768px) { .markdown-body { padding: 15px; } } ';
                    if (fs.pathExistsSync('node_modules/github-markdown-css/github-markdown.css')) {
                        var cssContent = fs.readFileSync('node_modules/github-markdown-css/github-markdown.css', 'utf8');
                        styles += cssContent;
                    }
                    styles += ' </style>';
                    var fileHtml = converter.makeHtml(fileContent).replace(new RegExp('src="\.\./images/', 'g'), 'src="./images/').replace(new RegExp('.md"', 'g'), '.html"').replace(new RegExp('<body>', 'g'), '<body class="markdown-body">' + styles);
                    try {
                        fs.outputFileSync(destination, fileHtml);
                    } catch (err) {
                        success = false;
                        notifier.notify({
                            title: 'Possible permission Error',
                            message: 'Cannot update or create file. Please check permissions.',
                            icon: './boilerplate-includes/core/images/fidesio-logo.png'
                        });
                        console.log(os.EOL);
                        log.error(err);
                        console.log(os.EOL);
                    } finally {
                        resolve({
                            success: success,
                            html: fileHtml
                        });
                    }
                } else {
                    success = false;
                    notifier.notify({
                        title: 'HTML compilation Error',
                        message: 'A file is missing.',
                        icon: './boilerplate-includes/core/images/fidesio-logo.png'
                    });
                    console.log(os.EOL);
                    log.error('ERROR! File ' + source + ' does not exist.');
                    console.log(os.EOL);
                }
                resolve({
                    success: success
                });
            } else {
                Twig.renderFile(source, {
                    settings: {'twig options': {async: false}},
                    favicon_url: favicon_url,
                    css_files: css_files,
                    js_files: js_files,
                    html_files: html_files,
                    project_name: config.project_name.trim(),
                    project_short_name: config.project_short_name.trim(),
                    img_url: img_url,
                    img_frontend_boilerplate_demo: img_frontend_boilerplate_demo,
                    js_code_demo: js_code_demo,
                    css_code_demo: css_code_demo,
                    css_print_code_demo: css_print_code_demo,
                    lang_code: localeCode.getLanguageCode(config.project_lang),
                    lang_code_extended: config.project_lang.replace('-', '_'),
                    favicon_color: config.generateFavicon.main_color,
                    project_git_url: project_git_url,
                    project_preview_links: project_preview_links,
                    project_other_links: project_other_links
                }, function (err, html) {
                    if (err) {
                        success = false;
                        notifier.notify({
                            title: 'HTML compilation Error',
                            message: 'Please check the syntax in your TWIG files.',
                            icon: './boilerplate-includes/core/images/fidesio-logo.png'
                        });
                        console.log(os.EOL);
                        log.error(err);
                        console.log(os.EOL);
                        resolve({
                            success: success
                        });
                    }
                    module.exports.beautifyOrMinify(html, function (result) {
                        try {
                            fs.outputFileSync(destination, result);
                        } catch (err) {
                            success = false;
                            notifier.notify({
                                title: 'Possible permission Error',
                                message: 'Cannot update or create file. Please check permissions.',
                                icon: './boilerplate-includes/core/images/fidesio-logo.png'
                            });
                            console.log(os.EOL);
                            log.error(err);
                            console.log(os.EOL);
                        } finally {
                            resolve({
                                success: success,
                                html: result
                            });
                        }
                    });
                });
            }
        }).then(function (result) {
            if (callback) {
                callback(result);
            }
        });
    },
    check: function (filepath, html, callback) {
        var success = true;
        validator({
            format: 'text',
            data: html
        }, function (error, data) {
            if (error) {
                success = false;
                notifier.notify({
                    title: 'W3C Html checker failed',
                    message: 'An error occured during html validation.',
                    icon: './boilerplate-includes/core/images/fidesio-logo.png'
                });
                console.log(os.EOL);
                if (_.includes(error, 'statuscode: 403')) {
                    log.error('Your ip address has been blocked by the W3C Markup Validation Service.');
                } else {
                    log.error(error);
                }
                console.log(os.EOL);
            } else {
                var splittedDatas = data.split('\n');
                if (splittedDatas.length != 2) {
                    success = false;
                    for (var i = 0; i < splittedDatas.length; i++) {
                        if (splittedDatas[i] == '' || splittedDatas[i] == 'The document validates according to the specified schema(s).' || splittedDatas[i] == 'There were errors.') {
                            splittedDatas.splice(i, 1);
                            i--;
                        }
                    }
                    notifier.notify({
                        title: 'W3C Html validation Error',
                        message: 'There\'re syntax error(s) in your html code.',
                        icon: './boilerplate-includes/core/images/fidesio-logo.png'
                    });
                    console.log(os.EOL);
                    log.info('  W3C Markup Validation Service: ' + filepath);
                    var message = '';
                    splittedDatas.forEach(function (data, index) {
                        if (index % 2 == 0) {
                            message = data;
                        } else {
                            message = '      ' + message.trim() + ' ' + data;
                            if (splittedDatas[index - 1].search('Error:') > -1) {
                                log.error(message);
                            } else {
                                log.warn(message);
                            }
                        }
                    });
                    console.log(os.EOL);
                }
            }
            if (callback) {
                callback(success);
            }
        });
        // success = false;
        // notifier.notify({
        //     title: 'W3C Html checker failed',
        //     message: 'Couldn\'t get response in time.',
        //     icon: './boilerplate-includes/core/images/fidesio-logo.png'
        // });
        // console.log(os.EOL);
        // log.error('Couldn\'t get response in time.');
        // console.log(os.EOL);
        // if (callback) {
        //     callback(success);
        // }
    },
    beautifyOrMinify: function (html, callback) {
        var result = false;
        new Promise(function (resolve) {
            if (argv.dev) {
                result = pretty(html, {ocd: true});
            } else {
                result = minify(html, {
                    caseSensitive: true,
                    collapseBooleanAttributes: true,
                    collapseInlineTagWhitespace: false,
                    collapseWhitespace: true,
                    decodeEntities: true,
                    keepClosingSlash: true,
                    minifyCSS: true,
                    minifyJS: true,
                    processConditionalComments: true,
                    quoteCharacter: '"',
                    removeComments: true,
                    sortAttributes: true,
                    sortClassName: true
                });
            }
            resolve(result);
        }).then(function (result) {
            if (callback) {
                callback(result);
            }
        });
    }
};