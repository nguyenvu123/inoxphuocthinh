/*
 * @file
 *
 * Builds JavaScript code.
 *
 */

const javascript = require('../lib/javascript'),
    glob = require('glob'),
    rls = require('remove-leading-slash'),
    upath = require('upath'),
    fs = require('fs-extra'),
    argv = require('minimist')(process.argv.slice(2)),
    config = require('../../frontendboilerplate-configuration'),
    browserSync = require('browser-sync').get('BrowserSync Frontend Boilerplate : ' + config.project_name);

module.exports = function (done) {
    var jsFiles = glob.sync(rls(upath.join(rls(config.generateJs.src_path), '**', '*.js')), {
        ignore: [
            '**/_*.js'
        ]
    });
    if (jsFiles.length) {
        jsFiles.forEach(function (file, index) {
            delete require.cache[require.resolve(upath.relative(__dirname, file))];
            var fileConfig = require(upath.relative(__dirname, file));
            fileConfig = JSON.parse(JSON.stringify(fileConfig));
            if (!argv.dev) {
                fs.removeSync(rls(fileConfig.output_path) + '.map');
            }
            var result = javascript.generate(file, fileConfig);
            if (argv.reload && config.generateHtml.enable && result.success && argv._[0] === 'watch' && browserSync.instance.active) {
                browserSync.stream();
            }
            if (index === jsFiles.length - 1) {
                done();
            }
        });
    } else {
        done();
    }
};