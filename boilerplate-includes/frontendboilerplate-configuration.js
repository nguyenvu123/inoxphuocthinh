const config = {

    /*
    ###########################################
    ########## PROJECT CONFIGURATION ##########
    ###########################################
    */

    project_name: "Project's name",

    /* This is important for favicon generation, it should be fewer than 12 characters */
    project_short_name: "Project",

    /* This is important for favicon generation */
    /* Simply fill in your app's default language code. Please respect the syntax. */
    /* Language codes list : https://msdn.microsoft.com/en-us/library/ee825488(v=cs.20).aspx */
    project_lang: 'en-US',

    /* Root folder of your application, CMS, framework... */
    project_root_directory: '/',

    /* Url of the git/gitlab repository of the project */
    /* Example : https://git.fidesio.com/fidesio/frontend-boilerplate */
    project_git_url: 'https://git.fidesio.com/fidesio/frontend-boilerplate',

    // project_preview_url: 'https://projects.preview.team/project/4763/issues/kanban',
    /* Urls related to the project from https://preview.team/ */
    project_preview_links: {
        'tickets': 'https://projects.preview.team/project/4763/issues/kanban',
        'wiki': 'https://projects.preview.team/project/4763/wiki'
    },

    /* Various external links related to the project */
    project_other_links: {
        // 'staging': 'http://client.project.staging.fides.io/',
        // 'preprod': 'https://preprod.project.com/',
        // 'production': 'https://project.com/',
        // 'other custom link': 'http://other-link.com/'
    },

    /* Do not change this value unless you know what you are doing.  */
    /* Will be documented soon™ */
    extension_mode: false,

    /*
    ###########################################
    ######### JAVASCRIPT CONFIGURATION ########
    ###########################################
    */

    generateJs: {
        /* Enable or disable Javascript compilation */
        enable: true,

        /* Include here additionnal path to watch for Javascript generation */
        additional_paths_to_watch: [
            // '/web/assets/js/custom_script.js'
        ],

        modernizr : {
            /* Add classes in <html> tag ? */
            'add-classes-in-html-tag': false
        },
    },

    /*
    ###########################################
    ######### SASS / CSS CONFIGURATION ########
    ###########################################
    */

    generateCss: {
        /* Enable or disable Css compilation */
        enable: true,

        /* Include here additionnal path to watch for css generation */
        additional_paths_to_watch: [
            // '/web/assets/css/custom_stylesheet.css'
        ]
    },

    /*
    ###########################################
    ############ HTML CONFIGURATION ###########
    ###########################################
    */

    generateHtml: {
        /* Enable or disable Html compilation */
        enable: true,

        /* Enable generation of the project presentation page (index.html) */
        /* if enable is set to false then enable_index will be false. */
        enable_index: true,

        /* Enable or disable browserSync while watching */
        browsersync: true,

        /* Default compiled HTML files destination. */
        /* When setting {% set output_path = 'folder/file.html' %} in your twig file, result is : */
        /* public/folder/file.html */
        output: 'public/',

        /* Include here additionnal path to watch for html generation */
        additional_paths_to_watch: [
            // 'templates/components/'
        ]
    },

    /*
    ###########################################
    ######### Gitignore CONFIGURATION #########
    ###########################################
    */

    generateGitignore: {
        /* Enable or disable .gitignore compilation */
        enable: true
    },

    /*
    ###########################################
    ########### IMAGE CONFIGURATION ###########
    ###########################################
    */

    generateImages: {
        /* Images folder for imagemin task */
        folder: 'public/assets/images/'
    },

    /*
    ###########################################
    ########## FAVICON CONFIGURATION ##########
    ###########################################
    */

    generateFavicon: {
        /* Compiled favicon destination */
        output: 'public/assets/images/favicon/',

        /* Favicon source */
        src: 'public/assets/images/favicon.png',

        /* Main color used for iOS/Android's UI  */
        main_color: '#ffffff'
    }
};

module.exports = config;