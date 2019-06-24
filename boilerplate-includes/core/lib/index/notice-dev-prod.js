if (!argv._.length || argv._[0] === 'watch' || argv._[0] === 'css' || argv._[0] === 'javascript' || argv._[0] === 'html') {
    if (argv.dev) {
        process.env.NODE_ENV = 'development';
        log.info('Notice : Consider using the --dev option for development and testing purposes only.');
    } else {
        process.env.NODE_ENV = 'production';
        log.info('Notice : Consider using the --dev option for development and testing purposes.');
    }
}
if (argv._[0] === 'watch' && !argv.reload && config.generateHtml.enable) {
    log.info('Notice : Consider using the --reload option to automatically reload browser when changes are detected.');
}

if (!argv._.length || argv._[0] === 'watch' || argv._[0] === 'css' || argv._[0] === 'javascript' || argv._[0] === 'html') {
    log.info('FRONTEND BOILERPLATE MODE : ' + process.env.NODE_ENV.toUpperCase());
}