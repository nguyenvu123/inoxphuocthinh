const config = require('../../frontendboilerplate-configuration'),
    log = require('./log'),
    upath = require('upath'),
    rls = require('remove-leading-slash'),
    fs = require('fs-extra'),
    glob = require('glob'),
    prependFile = require('prepend-file'),
    os = require('os'),
    prompt = require('prompt');

module.exports = {
    clean: function (callback) {
        var success = true;
        log.info('This task isn\'t meant to be used on a real project. It may delete some of your files!');
        new Promise(function (resolve) {
            var schema = {
                properties: {
                    'yes/no': {
                        pattern: /^yes|no|y|n|YES|NO|Y|N+$/,
                        type: 'string',
                        message: 'We didn\'t understand your answer.',
                        required: true
                    }
                }
            };
            log.info('Generated assets will be erased. Continue?');
            prompt.start();
            prompt.get(schema, function (err, result) {
                if (err) {
                    err = '' + err;
                    success = false;
                    if (!_.includes(err, 'Error: canceled')) {
                        console.log(os.EOL);
                        log.error(err);
                        console.log(os.EOL);
                    }
                    done(success);
                    prompt.stop();
                } else {
                    if (result['yes/no'].match(/^yes|y|YES|Y+$/) != null) {
                        log.info('Starting cleaning...');
                        var paths_to_erase = [
                            rls(config.generateFavicon.output)
                        ];
                        if (config.generateGitignore.enable) {
                            paths_to_erase.push(rls('./.gitignore'));
                        }
                        if (config.generateJs.enable) {
                            var jsFiles = glob.sync(rls(upath.join(rls(config.generateJs.src_path), '**', '*.js')), {
                                ignore: [
                                    '**/_*.js'
                                ]
                            });
                            jsFiles.forEach(function (file) {
                                delete require.cache[require.resolve(upath.relative(__dirname, file))];
                                var fileConfig = require(upath.relative(__dirname, file));
                                fileConfig = JSON.parse(JSON.stringify(fileConfig));
                                paths_to_erase.push(
                                    rls(fileConfig.output_path),
                                    rls(fileConfig.output_path) + '.map'
                                );
                            });
                        }
                        if (config.extension_mode) {
                            var manifests = glob.sync(rls(upath.join(rls(config.generateHtml.output), 'manifest.*.json')));
                            manifests.forEach(function (file) {
                                var browser = upath.basename(file, '.json').replace('manifest.', '') + '-extension';
                                paths_to_erase.push(upath.join('./', browser));
                            });
                        }
                        if (config.generateCss.enable) {
                            var cssFiles = glob.sync(rls(upath.join(rls(config.generateCss.src_path), '**', '*.scss')), {
                                ignore: [
                                    "**/_*.scss"
                                ]
                            });
                            cssFiles.forEach(function (file) {
                                var fileContent = fs.readFileSync(file, 'utf8');
                                var regex = new RegExp("\\$output_path:\\s*['\"]?(.+?)['\"]?\\s*;", 'gmiu');
                                var matches = regex.exec(fileContent);
                                var destination = false;
                                if (matches !== null) {
                                    destination = rls(matches[1]);
                                }
                                if (destination) {
                                    paths_to_erase.push(destination);
                                    paths_to_erase.push(destination + '.map');
                                }
                            });
                        }
                        if (config.generateHtml.enable) {
                            if (config.generateHtml.enable_index) {
                                paths_to_erase.push(rls(upath.join(rls(config.generateHtml.output), 'index.html')));
                                paths_to_erase.push(rls(upath.join(rls(config.generateHtml.output), 'frontend-boilerplate-documentation')));
                            }
                            var htmlFiles = glob.sync(rls(upath.join(rls(config.generateHtml.src), '**', '*.twig')), {
                                ignore: [
                                    "**/_*.twig"
                                ]
                            });
                            htmlFiles.forEach(function (file) {
                                var destination = rls(upath.join(rls(config.generateHtml.output), upath.basename(file, '.twig') + '.html'));
                                var fileContent = fs.readFileSync(file, 'utf8');
                                var regex = new RegExp("\\{%\\s*set\\s*output_path\\s*=\\s*['\"]?(.+?)['\"]?\\s*%\\}", 'gmiu');
                                var matches = regex.exec(fileContent);
                                if (matches !== null) {
                                    destination = rls(upath.join(upath.dirname(destination), rls(matches[1])));
                                }
                                paths_to_erase.push(destination);
                            });
                        }
                        paths_to_erase.forEach(function (filepath) {
                            glob.sync(filepath).forEach(function (realfilepath) {
                                fs.removeSync(realfilepath);
                            });
                        });
                        if (config.generateGitignore.enable) {
                            fs.copySync(rls(upath.join(rls('./boilerplate-includes/'), rls('.gitignore'))), './.gitignore');
                            fs.appendFileSync('./.gitignore', os.EOL + '### /!\\ Do not edit this file. See : boilerplate-includes/.gitignore /!\\ ###');
                            prependFile.sync('./.gitignore', '### /!\\ Do not edit this file. See : boilerplate-includes/.gitignore /!\\ ###' + os.EOL);
                        } else {
                            success = false;
                        }
                    } else {
                        success = false;
                    }
                }
                resolve(success);
            });
        }).then(function (success) {
            prompt.stop();
            if (callback) {
                callback(success);
            }
        });
    }
};