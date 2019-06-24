/*
 * @file
 *
 * Optimises .jpg .jpeg .png .gif .svg images.
 *
 */

const image = require('../lib/image'),
    config = require('../../frontendboilerplate-configuration'),
    rls = require('remove-leading-slash'),
    upath = require('upath'),
    glob = require('glob'),
    log = require('../lib/log'),
    prompt = require('prompt'),
    os = require('os'),
    events = require('events'),
    argv = require('minimist')(process.argv.slice(2));

module.exports = function (done) {
    var success = true;
    log.info('You should also use https://kraken.io/web-interface, an ounce of prevention is worth a pound of cure.');
    var lossless = false;
    if (argv.lossless) {
        lossless = true;
    } else {
        log.info('Notice : Consider using the --lossless option.');
    }
    var schema = {
        properties: {
            'yes/no': {
                pattern: /^yes|no|y|n|YES|NO|Y|N+$/,
                type: 'string',
                message: 'We didn\'t understand your answer.',
                required: true
            }
        }
    };
    log.info('Every image (jpg, jpeg, png, gif, webp, svg) located in "' + rls(config.generateImages.folder) + '" will be minified.');
    log.info('Do you want to continue?');
    prompt.start();
    prompt.get(schema, function (err, result) {
        if (err) {
            err = '' + err;
            success = false;
            if (!_.includes(err, 'Error: canceled')) {
                console.log(os.EOL);
                log.error(err);
                console.log(os.EOL);
            }
            done(success);
            prompt.stop();
        } else {
            if (result['yes/no'].match(/^yes|y|YES|Y+$/) != null) {
                var imagesArray = glob.sync(rls(upath.join(rls(config.generateImages.folder), '**', '*.{jpg,png,jpeg,gif,webp,svg}')));
                if (imagesArray.length) {
                    var imagesArrayDuplicate = imagesArray;
                    const eventEmitter = new events.EventEmitter();
                    eventEmitter.on('finished', function (file) {
                        imagesArrayDuplicate.splice(imagesArrayDuplicate.indexOf(file), 1);
                        if (imagesArrayDuplicate.length == 0) {
                            done(success);
                            prompt.stop();
                        }
                    });
                    imagesArray.forEach(function (file) {
                        image.minify(file, true, lossless, eventEmitter);
                    });
                } else {
                    done(success);
                    prompt.stop();
                }
            } else {
                done(success);
                prompt.stop();
            }
        }
    });
};