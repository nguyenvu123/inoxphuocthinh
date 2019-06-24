/*
 * @file
 *
 * Checks SCSS syntax.
 *
 */

const css = require('../lib/css');

module.exports = function (done) {
    css.check(true, function (success) {
        done(success);
    });
};