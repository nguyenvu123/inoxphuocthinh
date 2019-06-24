//to do here, check if le fichier config s'importe correctement ?

var configuration_error = false;

if (_.isString(config.project_name)) {
    if (!config.project_name.trim().length) {
        log.error('"project_name" in ./boilerplate-includes/frontendboilerplate-configuration.js is mandatory.');
        configuration_error = true;
    } else {
        if (config.project_name != config.project_name.trim()) {
            log.warn('"project_name" in ./boilerplate-includes/frontendboilerplate-configuration.js contains unnecessary spaces.');
        }
        config.project_name = config.project_name.trim();
    }
} else {
    log.error('"project_name" in ./boilerplate-includes/frontendboilerplate-configuration.js must be a valid string.');
    configuration_error = true;
}

if (_.isString(config.project_short_name)) {
    if (!config.project_short_name.trim().length) {
        log.error('"project_short_name" in ./boilerplate-includes/frontendboilerplate-configuration.js is mandatory.');
        configuration_error = true;
    } else {
        if (config.project_short_name.trim().length > 12) {
            log.error('"project_short_name" in ./boilerplate-includes/frontendboilerplate-configuration.js must not exceed 12 characters.');
            configuration_error = true;
        } else {
            if (config.project_short_name != config.project_short_name.trim()) {
                log.warn('"project_short_name" in ./boilerplate-includes/frontendboilerplate-configuration.js contains unnecessary spaces.');
            }
            config.project_short_name = config.project_short_name.trim();
        }
    }
} else {
    log.error('"project_short_name" in ./boilerplate-includes/frontendboilerplate-configuration.js must be a valid string.');
    configuration_error = true;
}

if (_.isString(config.project_lang)) {
    if (!config.project_lang.trim().length) {
        log.error('"project_lang" in ./boilerplate-includes/frontendboilerplate-configuration.js is mandatory.');
        configuration_error = true;
    } else {
        var regex = new RegExp('^[a-z]{2}-[A-Z]{2}$', 'gmu');
        if (!localeCode.validateLanguageCode(config.project_lang.trim()) || regex.exec(config.project_lang.trim()) == null) {
            log.error('"project_lang" in ./boilerplate-includes/frontendboilerplate-configuration.js must match the pattern [ll-CC]. Example : en-US, fr-FR.');
            configuration_error = true;
        } else {
            if (config.project_lang != config.project_lang.trim()) {
                log.warn('"project_lang" in ./boilerplate-includes/frontendboilerplate-configuration.js contains unnecessary spaces.');
            }
            config.project_lang = config.project_lang.trim();
        }
    }
} else {
    log.error('"project_lang" in ./boilerplate-includes/frontendboilerplate-configuration.js must be a valid string.');
    configuration_error = true;
}

//to continue...

// config.project_root_directory //path, obligatoire, dossier courant ou dossier internet au projet
// config.project_git_url //url, pas obligatoire
// config.project_preview_links //objet, pas obligatoire. structure : clé (string) valeur (url, obligatoire)
// config.project_other_links//objet, pas obligatoire. structure : clé (string) valeur (url, obligatoire)
// config.extension_mode//boolean, obligatoire
// config.generateJs.modernizr['add-classes-in-html-tag']//boolean, obligatoire

if (configuration_error) {
    log.error('Please fix these issue(s) and then restart the Frontend Boilerplate.');
    process.exit(0);
}