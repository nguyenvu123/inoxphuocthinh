const log = require('fancy-log'),
    colors = require('colors');

module.exports = {
    error: function (msg) {
        log.error(colors.red(msg));
    },
    warn: function (msg) {
        log.error(colors.yellow(msg));
    },
    info: function (msg) {
        log.error(colors.green(msg));
    }
};