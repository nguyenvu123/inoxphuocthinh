const bytes = require('bytes'),
    colors = require('colors');

function notifyIndexHtmlLocation(spaceAtbeginning = false) {
    if (config.generateHtml.enable && config.generateHtml.enable_index) {
        var msg = '';
        if (spaceAtbeginning) {
            msg += ' ';
        }
        console.log(msg + colors.white('index.html: ') + colors.magenta(upath.join(__dirname, rls(config.generateHtml.output), 'index.html')));
    }
}

function notifyBoilerplateUrls() {
    if (browserSync.instance.active) {
        var browserSyncUrls = browserSync.getOption('urls');
        console.log(colors.white('[') + colors.cyan('Browsersync') + colors.white(']') + colors.white(' Access URLs:'));
        console.log(colors.grey(' ----------------------------------------------------'));
        console.log(colors.white('      Local: ') + colors.magenta(browserSyncUrls.get('local')));
        console.log(colors.white('   External: ') + colors.magenta(browserSyncUrls.get('external')));
        notifyIndexHtmlLocation(true);
        console.log(colors.grey(' ----------------------------------------------------'));
        console.log(colors.white('[') + colors.cyan('Browsersync') + colors.white('] Serving files from: ') + colors.magenta('./'));
    }
}

function notifyFileHasChanged(name, size = false) {
    if (argv.reload && config.generateHtml.enable) {
        if (size) {
            log.warn('File ' + upath.normalizeSafe(name) + ' has changed size to ' + bytes(size, {
                thousandsSeparator: ' '
            }) + '. Reloading browser and running tasks...');
        } else {
            log.warn('File ' + upath.normalizeSafe(name) + ' has changed. Reloading browser and running tasks...');
        }
    } else {
        if (size) {
            log.warn('File ' + upath.normalizeSafe(name) + ' has changed size to ' + bytes(size, {
                thousandsSeparator: ' '
            }) + '. Running tasks...');
        } else {
            log.warn('File ' + upath.normalizeSafe(name) + ' has changed. Running tasks...');
        }
    }
}