const runTask = require('./boilerplate-includes/core/lib/run-task');

var cmdValue = false;

if (argv._[0] === 'watch' || typeof argv._[0] === 'undefined') {
    cmdValue = 'default';
    if (config.generateJs.enable) {
        runTask(['javascript']);
    }
    if (config.generateCss.enable) {
        runTask(['css']);
    }
    if (config.generateHtml.enable) {
        runTask(['html'], function () {
            notifyIndexHtmlLocation();
        });
    }
    if (config.generateGitignore.enable) {
        runTask(['gitignore']);
    }
    if (config.extension_mode) {
        const extension = require('./boilerplate-includes/core/lib/extension');
        extension.generate();
    }
    if (!config.generateJs.enable && !config.generateCss.enable && !config.generateHtml.enable && !config.generateGitignore.enable && !config.extension_mode) {
        log.error('You must first enable something in frontendboilerplate-configuration.js.');
        process.exit(0);
    }
}

program.command('html').option('--dev', 'Development mode').action(function () {
    cmdValue = 'html';
    if (config.generateHtml.enable) {
        runTask(['html'], function () {
            notifyIndexHtmlLocation();
        });
    } else {
        log.error('You must first enable html compilation in frontendboilerplate-configuration.js.');
        process.exit(0);
    }
});

program.command('gitignore').action(function () {
    cmdValue = 'gitignore';
    if (config.generateGitignore.enable) {
        runTask(['gitignore']);
    } else {
        log.error('You must first enable gitignore generation in frontendboilerplate-configuration.js.');
        process.exit(0);
    }
});

program.command('css').option('--dev', 'Development mode').action(function () {
    cmdValue = 'css';
    if (config.generateCss.enable) {
        runTask(['css']);
    } else {
        log.error('You must first enable css generation in frontendboilerplate-configuration.js.');
        process.exit(0);
    }
});

program.command('check-scss').action(function () {
    cmdValue = 'check-scss';
    if (config.generateCss.enable) {
        runTask(['check-scss']);
    } else {
        log.error('You must first enable css generation in frontendboilerplate-configuration.js.');
        process.exit(0);
    }
});

program.command('javascript').option('--dev', 'Development mode').action(function () {
    cmdValue = 'javascript';
    if (config.generateJs.enable) {
        runTask(['javascript']);
    } else {
        log.error('You must first enable javascript generation in frontendboilerplate-configuration.js.');
        process.exit(0);
    }
});

program.command('check-js').action(function () {
    cmdValue = 'check-js';
    if (config.generateJs.enable) {
        runTask(['check-js']);
    } else {
        log.error('You must first enable javascript generation in frontendboilerplate-configuration.js.');
        process.exit(0);
    }
});

program.command('clean').action(function () {
    cmdValue = 'clean';
    runTask(['clean']);
});

program.command('imagemin').option('--lossless', 'No quality loss').action(function () {
    cmdValue = 'imagemin';
    runTask(['imagemin']);
});

program.command('favicon').option('--skip-prompt', 'Skipp all prompts, minification will depend on --dev.').option('--dev', 'Skip minification when --skip-prompt is set.').action(function () {
    cmdValue = 'favicon';
    runTask(['favicon']);
});

program.command('watch').option('--dev', 'Development mode').option('--reload', 'Reload browser document').action(function () {
    cmdValue = 'watch';
    const watch_task = require('./boilerplate-includes/core/tasks/watch');
    log.info('Starting watching files...');
    watch_task();
    setTimeout(function () {
        log.info('I know you must be tired, Princess. So I will let you rest.');
        process.exit(0);
    }, 86400000);
});

program.option('--dev', 'Development mode').on('command:*', function () {
    log.error('Invalid command.');
    process.exit(0);
});

program.parse(process.argv);