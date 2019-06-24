const config = require('./boilerplate-includes/frontendboilerplate-configuration'),
    upath = require('upath'),
    rls = require('remove-leading-slash'),
    argv = require('minimist')(process.argv.slice(2)),
    log = require('./boilerplate-includes/core/lib/log'),
    glob = require('glob'),
    _ = require('lodash'),
    fs = require('fs-extra'),
    localeCode = require('locale-code'),
    modernizr = require('modernizr'),
    Emittery = require('emittery'),
    program = require('commander');

eval(fs.readFileSync('./boilerplate-includes/core/lib/index/notifications-functions.js', 'utf8').toString());
eval(fs.readFileSync('./boilerplate-includes/core/lib/index/check-configuration.js', 'utf8').toString());

const browserSync = require('browser-sync').create('BrowserSync Frontend Boilerplate : ' + config.project_name);

eval(fs.readFileSync('./boilerplate-includes/core/lib/index/notice-dev-prod.js', 'utf8').toString());

config.generateJs.src_path = './boilerplate-includes/js/';
config.generateCss.src_path = './boilerplate-includes/scss/';
config.generateHtml.src = './boilerplate-includes/twig/';

if (config.extension_mode) {
    config.generateHtml.enable_index = false;
    config.generateHtml.browsersync = false;
}

const emitter = new Emittery();
emitter.on('modernizr_precompiled', function () {
    eval(fs.readFileSync('./boilerplate-includes/core/lib/index/init-tasks.js', 'utf8').toString());
});

eval(fs.readFileSync('./boilerplate-includes/core/lib/index/precompile-modernizr.js', 'utf8').toString());