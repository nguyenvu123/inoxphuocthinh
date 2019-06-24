/*
 * @file
 *
 * Builds CSS stylesheets.
 *
 */

const css = require('../lib/css'),
    config = require('../../frontendboilerplate-configuration'),
    glob = require('glob'),
    rls = require('remove-leading-slash'),
    upath = require('upath'),
    fs = require('fs-extra'),
    browserSync = require('browser-sync').get('BrowserSync Frontend Boilerplate : ' + config.project_name),
    argv = require('minimist')(process.argv.slice(2));

module.exports = function (done) {
    var cssFiles = glob.sync(rls(upath.join(rls(config.generateCss.src_path), '**', '*.scss')), {
        ignore: [
            '**/_*.scss'
        ]
    });
    if (cssFiles.length) {
        cssFiles.forEach(function (file, index) {
            var fileContent = fs.readFileSync(file, 'utf8');
            var regex = new RegExp("\\$output_path:\\s*['\"]?(.+?)['\"]?\\s*;", 'gmiu');
            var matches = regex.exec(fileContent);
            var destination = false;
            if (matches !== null) {
                destination = rls(matches[1]);
            }
            if (destination) {
                if (!argv.dev) {
                    fs.removeSync(rls(destination + '.map'));
                }
                var regex = new RegExp("\\$auto_base64_node_modules_css_weight_limit:\\s*(.+?)\\s*;", 'gmiu');
                var matches = regex.exec(fileContent);
                var base64_node_modules = false;
                if (matches !== null) {
                    base64_node_modules = parseFloat(matches[1].trim());
                }
                var regex = new RegExp("\\$transformPxToRem_prod:\\s*(.+?)\\s*;", 'gmiu');
                var matches = regex.exec(fileContent);
                var transformPxToRem_prod = false;
                if (matches !== null) {
                    if (matches[1].trim() == 'true') {
                        transformPxToRem_prod = true;
                    }
                }
                var regex = new RegExp("\\$transformPxToRem_dev:\\s*(.+?)\\s*;", 'gmiu');
                var matches = regex.exec(fileContent);
                var transformPxToRem_dev = false;
                if (matches !== null) {
                    if (matches[1].trim() == 'true') {
                        transformPxToRem_dev = true;
                    }
                }
                var result = css.generate(file, upath.dirname(destination), base64_node_modules, transformPxToRem_prod, transformPxToRem_dev);
                if (argv.reload && config.generateHtml.enable && result.success && argv._[0] === 'watch' && browserSync.instance.active) {
                    browserSync.stream();
                }
            }
            if (index === cssFiles.length - 1) {
                done();
            }
        });
    } else {
        done();
    }
};