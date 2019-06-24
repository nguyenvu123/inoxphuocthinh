/*
 * @file
 *
 * Erases generated assets.
 *
 */

const clean = require('../lib/clean');

module.exports = function (done) {
    clean.clean(function (success) {
        done(success);
    });
};