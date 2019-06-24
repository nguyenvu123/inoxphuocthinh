/*
 * @file
 *
 * Watch files changes.
 *
 */

const config = require('../../frontendboilerplate-configuration'),
    upath = require('upath'),
    glob = require('glob'),
    log = require('../lib/log'),
    extension = require('../lib/extension'),
    runTask = require('../lib/run-task'),
    rls = require('remove-leading-slash'),
    browserSync = require('browser-sync').get('BrowserSync Frontend Boilerplate : ' + config.project_name),
    reload = browserSync.reload;
    chokidar = require('chokidar'),
    fs = require('fs-extra'),
    argv = require('minimist')(process.argv.slice(2));

eval(fs.readFileSync('./boilerplate-includes/core/lib/index/notifications-functions.js', 'utf8').toString());

module.exports = function () {
    if (
        config.generateHtml.enable ||
        config.extension_mode ||
        config.generateJs.enable ||
        config.generateCss.enable
    ) {
        if (config.generateHtml.enable) {
            var startPath = upath.join(rls(config.generateHtml.output), 'index.html');
            if (!config.generateHtml.browsersync) {
                startPath = false;
            }
            if (!config.generateHtml.enable_index && startPath) {
                startPath = false;
                var htmlFiles = glob.sync(rls(upath.join(rls(config.generateHtml.src), '**', '*.twig')), {
                    ignore : [
                        '**/_*.twig'
                    ]
                });
                if (htmlFiles.length) {
                    var destination = rls(upath.join(rls(config.generateHtml.output), upath.basename(htmlFiles[0], '.twig') + '.html'));
                    var fileContent = fs.readFileSync(htmlFiles[0], 'utf8');
                    var regex = new RegExp("\\{%\\s*set\\s*output_path\\s*=\\s*['\"]?(.+?)['\"]?\\s*%\\}", 'gmiu');
                    var matches = regex.exec(fileContent);
                    if (matches !== null) {
                        destination = rls(upath.join(upath.dirname(destination), rls(matches[1])));
                    }
                    startPath = destination;
                }
            }
            if (startPath) {
                var browserSync_options = {
                    server : true,
                    startPath : startPath,
                    ui : false,
                    notify : false,
                    logLevel : 'silent',
                    ghostMode : false,
                    minify : true,
                    callbacks : {
                        ready : function (err, bs) {
                            notifyBoilerplateUrls();
                        }
                    }
                };
                browserSync.init(browserSync_options, function (err, bs) {
                    // bs.sockets.on('connection', function (client) {
                    // ___browserSync___.socket.emit('boilerplatehtml')
                    // client.on('boilerplatehtml', function () {
                    //     var task = require('./boilerplate-includes/core/tasks/html');
                    //     task(function(){
                    //         console.log('fini !');
                    //     });
                    // });
                    // });
                });
            }
        }
        var system_files = [
            upath.normalizeSafe(rls('./frontendboilerplate.js')),
            upath.normalizeSafe(rls('./package.json')),
            upath.normalizeSafe(rls('./boilerplate-includes/frontendboilerplate-configuration.js')),
            upath.normalizeSafe(rls('./boilerplate-includes/core'))
        ];
        system_files.forEach(function (system_file) {
            chokidar.watch(system_file, {
                recursive : true,
                usePolling : true,
                alwaysStat : true
            }).on('change', function (name, stats) {
                if (typeof stats !== 'undefined') {
                    stats = stats.size;
                }
                log.info('Watch has detected changes in ' + upath.normalizeSafe(name));
                log.info('Please restart the Frontend Boilerplate.');
                process.exit(0);
            }).on('unlink', function (name, stats) {
                if (typeof stats !== 'undefined') {
                    stats = stats.size;
                }
                log.info('Watch has detected changes in ' + upath.normalizeSafe(name));
                log.info('Please restart the Frontend Boilerplate.');
                process.exit(0);
            }).on('unlinkDir', function (name, stats) {
                if (typeof stats !== 'undefined') {
                    stats = stats.size;
                }
                log.info('Watch has detected changes in ' + upath.normalizeSafe(name));
                log.info('Please restart the Frontend Boilerplate.');
                process.exit(0);
            });
        });
        if (config.extension_mode) {
            var extensionWatchTimer = false;
            chokidar.watch(upath.normalizeSafe(rls(config.generateHtml.output)), {
                recursive : true,
                usePolling : true,
                alwaysStat : true
            }).on('change', function (name, stats) {
                if (typeof stats !== 'undefined') {
                    stats = stats.size;
                }
                if (extensionWatchTimer) {
                    clearTimeout(extensionWatchTimer);
                }
                extensionWatchTimer = setTimeout(function () {
                    extension.generate();
                }, 2000);
            }).on('unlink', function (name, stats) {
                if (typeof stats !== 'undefined') {
                    stats = stats.size;
                }
                if (extensionWatchTimer) {
                    clearTimeout(extensionWatchTimer);
                }
                extensionWatchTimer = setTimeout(function () {
                    extension.generate();
                }, 2000);
            }).on('unlinkDir', function (name, stats) {
                if (typeof stats !== 'undefined') {
                    stats = stats.size;
                }
                if (extensionWatchTimer) {
                    clearTimeout(extensionWatchTimer);
                }
                extensionWatchTimer = setTimeout(function () {
                    extension.generate();
                }, 2000);
            });
        }
        if (config.generateJs.enable) {
            var js_tasks_to_run = ['check-js', 'javascript'];
            if (config.generateHtml.enable) {
                js_tasks_to_run.push('html');
            }
            if (config.generateGitignore.enable) {
                js_tasks_to_run.push('gitignore');
            }
            var javascriptFilesToWatch = [];
            config.generateJs.additional_paths_to_watch.forEach(function (path) {
                javascriptFilesToWatch.push(rls(path));
            });
            if (config.generateHtml.enable && argv.reload) {
                chokidar.watch(upath.normalizeSafe(rls(config.generateJs.src_path)), {
                    recursive : true,
                    usePolling : true,
                    alwaysStat : true
                }).on('change', function (name, stats) {
                    if (typeof stats !== 'undefined') {
                        stats = stats.size;
                    }
                    notifyFileHasChanged(name, stats);
                    runTask(js_tasks_to_run, function (success) {
                        if (browserSync.instance.active) {
                            reload();
                        }
                        if (js_tasks_to_run.includes('html')) {
                            notifyBoilerplateUrls();
                        }
                    });
                }).on('unlink', function (name, stats) {
                    if (typeof stats !== 'undefined') {
                        stats = stats.size;
                    }
                    notifyFileHasChanged(name, stats);
                    runTask(js_tasks_to_run, function (success) {
                        if (browserSync.instance.active) {
                            reload();
                        }
                        if (js_tasks_to_run.includes('html')) {
                            notifyBoilerplateUrls();
                        }
                    });
                }).on('unlinkDir', function (name, stats) {
                    if (typeof stats !== 'undefined') {
                        stats = stats.size;
                    }
                    notifyFileHasChanged(name, stats);
                    runTask(js_tasks_to_run, function (success) {
                        if (browserSync.instance.active) {
                            reload();
                        }
                        if (js_tasks_to_run.includes('html')) {
                            notifyBoilerplateUrls();
                        }
                    });
                });
                javascriptFilesToWatch.forEach(function (javascriptFileToWatch) {
                    chokidar.watch(upath.normalizeSafe(javascriptFileToWatch), {
                        recursive : true,
                        usePolling : true,
                        alwaysStat : true
                    }).on('change', function (name, stats) {
                        if (typeof stats !== 'undefined') {
                            stats = stats.size;
                        }
                        notifyFileHasChanged(name, stats);
                        runTask(['javascript'], function (success) {
                            if (browserSync.instance.active) {
                                reload();
                            }
                        });
                    }).on('unlink', function (name, stats) {
                        if (typeof stats !== 'undefined') {
                            stats = stats.size;
                        }
                        notifyFileHasChanged(name, stats);
                        runTask(['javascript'], function (success) {
                            if (browserSync.instance.active) {
                                reload();
                            }
                        });
                    }).on('unlinkDir', function (name, stats) {
                        if (typeof stats !== 'undefined') {
                            stats = stats.size;
                        }
                        notifyFileHasChanged(name, stats);
                        runTask(['javascript'], function (success) {
                            if (browserSync.instance.active) {
                                reload();
                            }
                        });
                    });
                });
            } else {
                chokidar.watch(upath.normalizeSafe(rls(config.generateJs.src_path)), {
                    recursive : true,
                    usePolling : true,
                    alwaysStat : true
                }).on('change', function (name, stats) {
                    if (typeof stats !== 'undefined') {
                        stats = stats.size;
                    }
                    notifyFileHasChanged(name, stats);
                    runTask(js_tasks_to_run, function (success) {
                        if (js_tasks_to_run.includes('html')) {
                            notifyBoilerplateUrls();
                        }
                    });
                }).on('unlink', function (name, stats) {
                    if (typeof stats !== 'undefined') {
                        stats = stats.size;
                    }
                    notifyFileHasChanged(name, stats);
                    runTask(js_tasks_to_run, function (success) {
                        if (js_tasks_to_run.includes('html')) {
                            notifyBoilerplateUrls();
                        }
                    });
                }).on('unlinkDir', function (name, stats) {
                    if (typeof stats !== 'undefined') {
                        stats = stats.size;
                    }
                    notifyFileHasChanged(name, stats);
                    runTask(js_tasks_to_run, function (success) {
                        if (js_tasks_to_run.includes('html')) {
                            notifyBoilerplateUrls();
                        }
                    });
                });
                javascriptFilesToWatch.forEach(function (javascriptFileToWatch) {
                    chokidar.watch(upath.normalizeSafe(javascriptFileToWatch), {
                        recursive : true,
                        usePolling : true,
                        alwaysStat : true
                    }).on('change', function (name, stats) {
                        if (typeof stats !== 'undefined') {
                            stats = stats.size;
                        }
                        notifyFileHasChanged(name, stats);
                        runTask(['javascript'], function (success) {

                        });
                    }).on('unlink', function (name, stats) {
                        if (typeof stats !== 'undefined') {
                            stats = stats.size;
                        }
                        notifyFileHasChanged(name, stats);
                        runTask(['javascript'], function (success) {

                        });
                    }).on('unlinkDir', function (name, stats) {
                        if (typeof stats !== 'undefined') {
                            stats = stats.size;
                        }
                        notifyFileHasChanged(name, stats);
                        runTask(['javascript'], function (success) {

                        });
                    });
                });
            }
        }
        if (config.generateCss.enable) {
            var css_tasks_to_run = ['check-scss', 'css'];
            if (config.generateHtml.enable) {
                css_tasks_to_run.push('html');
            }
            if (config.generateGitignore.enable) {
                css_tasks_to_run.push('gitignore');
            }
            var cssFilesToWatch = [];
            config.generateCss.additional_paths_to_watch.forEach(function (path) {
                cssFilesToWatch.push(rls(path));
            });
            if (config.generateHtml.enable && argv.reload) {
                chokidar.watch(upath.normalizeSafe(config.generateCss.src_path), {
                    recursive : true,
                    usePolling : true,
                    alwaysStat : true
                }).on('change', function (name, stats) {
                    if (typeof stats !== 'undefined') {
                        stats = stats.size;
                    }
                    notifyFileHasChanged(name, stats);
                    runTask(css_tasks_to_run, function (success) {
                        if (browserSync.instance.active) {
                            reload();
                        }
                        if (css_tasks_to_run.includes('html')) {
                            notifyBoilerplateUrls();
                        }
                    });
                }).on('unlink', function (name, stats) {
                    if (typeof stats !== 'undefined') {
                        stats = stats.size;
                    }
                    notifyFileHasChanged(name, stats);
                    runTask(css_tasks_to_run, function (success) {
                        if (browserSync.instance.active) {
                            reload();
                        }
                        if (css_tasks_to_run.includes('html')) {
                            notifyBoilerplateUrls();
                        }
                    });
                }).on('unlinkDir', function (name, stats) {
                    if (typeof stats !== 'undefined') {
                        stats = stats.size;
                    }
                    notifyFileHasChanged(name, stats);
                    runTask(css_tasks_to_run, function (success) {
                        if (browserSync.instance.active) {
                            reload();
                        }
                        if (css_tasks_to_run.includes('html')) {
                            notifyBoilerplateUrls();
                        }
                    });
                });
                cssFilesToWatch.forEach(function (cssFileToWatch) {
                    chokidar.watch(upath.normalizeSafe(cssFileToWatch), {
                        recursive : true,
                        usePolling : true,
                        alwaysStat : true
                    }).on('change', function (name, stats) {
                        if (typeof stats !== 'undefined') {
                            stats = stats.size;
                        }
                        notifyFileHasChanged(name, stats);
                        runTask(['css'], function (success) {
                            if (browserSync.instance.active) {
                                reload();
                            }
                        });
                    }).on('unlink', function (name, stats) {
                        if (typeof stats !== 'undefined') {
                            stats = stats.size;
                        }
                        notifyFileHasChanged(name, stats);
                        runTask(['css'], function (success) {
                            if (browserSync.instance.active) {
                                reload();
                            }
                        });
                    }).on('unlinkDir', function (name, stats) {
                        if (typeof stats !== 'undefined') {
                            stats = stats.size;
                        }
                        notifyFileHasChanged(name, stats);
                        runTask(['css'], function (success) {
                            if (browserSync.instance.active) {
                                reload();
                            }
                        });
                    });
                });
            } else {
                chokidar.watch(upath.normalizeSafe(config.generateCss.src_path), {
                    recursive : true,
                    usePolling : true,
                    alwaysStat : true
                }).on('change', function (name, stats) {
                    if (typeof stats !== 'undefined') {
                        stats = stats.size;
                    }
                    notifyFileHasChanged(name, stats);
                    runTask(css_tasks_to_run, function (success) {
                        if (css_tasks_to_run.includes('html')) {
                            notifyBoilerplateUrls();
                        }
                    });
                }).on('unlink', function (name, stats) {
                    if (typeof stats !== 'undefined') {
                        stats = stats.size;
                    }
                    notifyFileHasChanged(name, stats);
                    runTask(css_tasks_to_run, function (success) {
                        if (css_tasks_to_run.includes('html')) {
                            notifyBoilerplateUrls();
                        }
                    });
                }).on('unlinkDir', function (name, stats) {
                    if (typeof stats !== 'undefined') {
                        stats = stats.size;
                    }
                    notifyFileHasChanged(name, stats);
                    runTask(css_tasks_to_run, function (success) {
                        if (css_tasks_to_run.includes('html')) {
                            notifyBoilerplateUrls();
                        }
                    });
                });
                cssFilesToWatch.forEach(function (cssFileToWatch) {
                    chokidar.watch(upath.normalizeSafe(cssFileToWatch), {
                        recursive : true,
                        usePolling : true,
                        alwaysStat : true
                    }).on('change', function (name, stats) {
                        if (typeof stats !== 'undefined') {
                            stats = stats.size;
                        }
                        notifyFileHasChanged(name, stats);
                        runTask(['css'], function (success) {

                        });
                    }).on('unlink', function (name, stats) {
                        if (typeof stats !== 'undefined') {
                            stats = stats.size;
                        }
                        notifyFileHasChanged(name, stats);
                        runTask(['css'], function (success) {

                        });
                    }).on('unlinkDir', function (name, stats) {
                        if (typeof stats !== 'undefined') {
                            stats = stats.size;
                        }
                        notifyFileHasChanged(name, stats);
                        runTask(['css'], function (success) {

                        });
                    });
                });
            }
        }
        if (config.generateHtml.enable) {
            var html_tasks_to_run = ['html'];
            if (config.generateGitignore.enable) {
                html_tasks_to_run.push('gitignore');
            }
            var htmlFilesToWatch = [];
            config.generateHtml.additional_paths_to_watch.forEach(function (path) {
                htmlFilesToWatch.push(rls(path));
            });
            if (config.generateHtml.enable && argv.reload) {
                chokidar.watch(upath.normalizeSafe(config.generateHtml.src), {
                    recursive : true,
                    usePolling : true,
                    alwaysStat : true
                }).on('change', function (name, stats) {
                    if (typeof stats !== 'undefined') {
                        stats = stats.size;
                    }
                    notifyFileHasChanged(name, stats);
                    runTask(html_tasks_to_run, function (success) {
                        if (browserSync.instance.active) {
                            reload();
                        }
                        if (html_tasks_to_run.includes('html')) {
                            notifyBoilerplateUrls();
                        }
                    });
                }).on('unlink', function (name, stats) {
                    if (typeof stats !== 'undefined') {
                        stats = stats.size;
                    }
                    notifyFileHasChanged(name, stats);
                    runTask(html_tasks_to_run, function (success) {
                        if (browserSync.instance.active) {
                            reload();
                        }
                        if (html_tasks_to_run.includes('html')) {
                            notifyBoilerplateUrls();
                        }
                    });
                }).on('unlinkDir', function (name, stats) {
                    if (typeof stats !== 'undefined') {
                        stats = stats.size;
                    }
                    notifyFileHasChanged(name, stats);
                    runTask(html_tasks_to_run, function (success) {
                        if (browserSync.instance.active) {
                            reload();
                        }
                        if (html_tasks_to_run.includes('html')) {
                            notifyBoilerplateUrls();
                        }
                    });
                });
                htmlFilesToWatch.forEach(function (htmlFileToWatch) {
                    chokidar.watch(upath.normalizeSafe(htmlFileToWatch), {
                        recursive : true,
                        usePolling : true,
                        alwaysStat : true
                    }).on('change', function (name, stats) {
                        if (typeof stats !== 'undefined') {
                            stats = stats.size;
                        }
                        notifyFileHasChanged(name, stats);
                        runTask(['html'], function (success) {
                            if (browserSync.instance.active) {
                                reload();
                            }
                            notifyBoilerplateUrls();
                        });
                    }).on('unlink', function (name, stats) {
                        if (typeof stats !== 'undefined') {
                            stats = stats.size;
                        }
                        notifyFileHasChanged(name, stats);
                        runTask(['html'], function (success) {
                            if (browserSync.instance.active) {
                                reload();
                            }
                            notifyBoilerplateUrls();
                        });
                    }).on('unlinkDir', function (name, stats) {
                        if (typeof stats !== 'undefined') {
                            stats = stats.size;
                        }
                        notifyFileHasChanged(name, stats);
                        runTask(['html'], function (success) {
                            if (browserSync.instance.active) {
                                reload();
                            }
                            notifyBoilerplateUrls();
                        });
                    });
                });
            } else {
                chokidar.watch(upath.normalizeSafe(config.generateHtml.src), {
                    recursive : true,
                    usePolling : true,
                    alwaysStat : true
                }).on('change', function (name, stats) {
                    if (typeof stats !== 'undefined') {
                        stats = stats.size;
                    }
                    notifyFileHasChanged(name, stats);
                    runTask(html_tasks_to_run, function (success) {
                        if (html_tasks_to_run.includes('html')) {
                            notifyBoilerplateUrls();
                        }
                    });
                }).on('unlink', function (name, stats) {
                    if (typeof stats !== 'undefined') {
                        stats = stats.size;
                    }
                    notifyFileHasChanged(name, stats);
                    runTask(html_tasks_to_run, function (success) {
                        if (html_tasks_to_run.includes('html')) {
                            notifyBoilerplateUrls();
                        }
                    });
                }).on('unlinkDir', function (name, stats) {
                    if (typeof stats !== 'undefined') {
                        stats = stats.size;
                    }
                    notifyFileHasChanged(name, stats);
                    runTask(html_tasks_to_run, function (success) {
                        if (html_tasks_to_run.includes('html')) {
                            notifyBoilerplateUrls();
                        }
                    });
                });
                htmlFilesToWatch.forEach(function (htmlFileToWatch) {
                    chokidar.watch(upath.normalizeSafe(htmlFileToWatch), {
                        recursive : true,
                        usePolling : true,
                        alwaysStat : true
                    }).on('change', function (name, stats) {
                        if (typeof stats !== 'undefined') {
                            stats = stats.size;
                        }
                        notifyFileHasChanged(name, stats);
                        runTask(['html'], function (success) {
                            notifyBoilerplateUrls();
                        });
                    }).on('unlink', function (name, stats) {
                        if (typeof stats !== 'undefined') {
                            stats = stats.size;
                        }
                        notifyFileHasChanged(name, stats);
                        runTask(['html'], function (success) {
                            notifyBoilerplateUrls();
                        });
                    }).on('unlinkDir', function (name, stats) {
                        if (typeof stats !== 'undefined') {
                            stats = stats.size;
                        }
                        notifyFileHasChanged(name, stats);
                        runTask(['html'], function (success) {
                            notifyBoilerplateUrls();
                        });
                    });
                });
            }
        }
    } else {
        log.error('You must first enable something in frontendboilerplate-configuration.js.');
        process.exit(0);
    }
};