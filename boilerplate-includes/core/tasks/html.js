/*
 *
 * Builds html templates and perform W3C validation.
 *
 */

const html = require('../lib/html'),
    config = require('../../frontendboilerplate-configuration'),
    glob = require('glob'),
    rls = require('remove-leading-slash'),
    upath = require('upath'),
    fs = require('fs-extra'),
    browserSync = require('browser-sync').get('BrowserSync Frontend Boilerplate : ' + config.project_name),
    argv = require('minimist')(process.argv.slice(2));

global.index_images_have_been_copied = false;

module.exports = function (done) {
    var success = true;
    var htmlFiles = glob.sync(rls(upath.join(rls(config.generateHtml.src), '**', '*.twig')), {
        ignore: [
            '**/_*.twig'
        ]
    });
    if (config.generateHtml.enable_index) {
        htmlFiles.push('boilerplate-includes/core/twig/index.twig');
        glob.sync(rls(upath.join('boilerplate-includes/core/doc', '*.md'))).forEach(function (file) {
            htmlFiles.push(file);
        });
    }
    if (htmlFiles.length) {
        var htmlFiles_length = htmlFiles.length;
        var count = 0;
        htmlFiles.forEach(function (file, index) {
            var fileExtension = upath.extname(file);
            var destination = rls(upath.join(rls(config.generateHtml.output), upath.basename(file, '.twig') + '.html'));
            if (fileExtension == '.md') {
                destination = upath.join(rls(config.generateHtml.output), 'frontend-boilerplate-documentation', upath.basename(file, '.md') + '.html');
                if (!index_images_have_been_copied) {
                    index_images_have_been_copied = true;
                    html.copyIndexImages(upath.join(rls(config.generateHtml.output), 'frontend-boilerplate-documentation', 'images'), function (result) {
                        if (!result.success) {
                            success = result.success;
                        }
                    });
                    html.copyIndexFonts(upath.join(rls(config.generateHtml.output), 'frontend-boilerplate-documentation', 'fonts'), function (result) {
                        if (!result.success) {
                            success = result.success;
                        }
                    });
                }
            } else {
                var fileContent = fs.readFileSync(file, 'utf8');
                var regex = new RegExp("\\{%\\s*set\\s*output_path\\s*=\\s*['\"]?(.+?)['\"]?\\s*%\\}", 'gmiu');
                var matches = regex.exec(fileContent);
                if (matches !== null) {
                    destination = rls(upath.join(upath.dirname(destination), rls(matches[1])));
                }
            }
            html.generate(file, destination, function (result) {
                var success = result.success;
                if (argv.reload && success && argv._[0] === 'watch' && browserSync.instance.active) {
                    browserSync.stream();
                }
                if (success) {
                    if (fileExtension != '.md') {
                        if (file != 'boilerplate-includes/core/twig/index.twig') {
                            html.check(upath.join(rls(destination)), result.html, function () {
                                count++;
                                if (count === htmlFiles_length) {
                                    done(success);
                                }
                            });
                        } else {
                            count++;
                            if (count === htmlFiles_length) {
                                done(success);
                            }
                        }
                    } else {
                        count++;
                        if (count === htmlFiles_length) {
                            done(success);
                        }
                    }
                } else {
                    count++;
                    if (count === htmlFiles_length) {
                        done(success);
                    }
                }
            });
        });
    } else {
        done(success);
    }
};