const config = require('../../frontendboilerplate-configuration'),
    glob = require('glob'),
    rls = require('remove-leading-slash'),
    upath = require('upath'),
    fs = require('fs-extra'),
    log = require('./log');

module.exports = {
    generate: function () {
        var manifests = glob.sync(rls(upath.join(rls(config.generateHtml.output), 'manifest.*.json')));
        manifests.forEach(function (file) {
            var browserName = upath.basename(file, '.json').replace('manifest.', '');
            log.info('Generating extension for ' + browserName.charAt(0).toUpperCase() + browserName.slice(1) + '...');
            var browser = browserName + '-extension/';
            fs.copySync(rls(config.generateHtml.output), upath.join('./', browser));
            glob.sync(upath.join('./', browser, 'manifest.*.json')).forEach(function (newManifest) {
                fs.removeSync(newManifest);
            });
            glob.sync(upath.join('./', browser, 'config-*.js')).forEach(function (configFile) {
                fs.removeSync(configFile);
            });
            glob.sync(rls(upath.join(rls(config.generateHtml.output), 'config-*.js'))).forEach(function (configFile) {
                if (upath.basename(configFile, '.js').replace('config-', '') == browserName) {
                    fs.copySync(configFile, upath.join('./', browser, upath.basename(configFile)));
                }
            });
            fs.copySync(file, upath.join('./', browser, 'manifest.json'));
            log.info('Extension for ' + browserName.charAt(0).toUpperCase() + browserName.slice(1) + ' has been generated.');
        });
    }
};