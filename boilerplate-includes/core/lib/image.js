const imageminMozjpeg = require('imagemin-mozjpeg'),
    imageminSvgo = require('imagemin-svgo'),
    imageminGifsicle = require('imagemin-gifsicle'),
    imageminWebp = require('imagemin-webp'),
    fs = require('fs-extra'),
    upath = require('upath'),
    imagemin = require('imagemin'),
    log = require('./log'),
    imageminPngquant = require('imagemin-pngquant'),
    imageminZopfli = require('imagemin-zopfli');

module.exports = {
    minify: function (source, echo, lossless, eventEmitter) {
        var imageminArray = [];
        var extension = upath.extname(source).toLowerCase();
        var quality = 80;
        if (lossless) {
            quality = 100;
        }
        var originalSize = fs.statSync(source).size;
        if (extension == '.jpg' || extension == '.jpeg') {
            var progressiveJpeg = true;
            if (originalSize <= 10000) {
                progressiveJpeg = false;
            }
            imageminArray.push(imageminMozjpeg({
                quality: quality,
                progressive: progressiveJpeg
            }));
        }
        if (extension == '.png') {
            imageminArray.push(imageminPngquant({
                quality: [quality / 100, quality / 100],
                speed: 1,
                strip: true
            }), imageminZopfli({
                more: true
            }));
        }
        if (extension == '.gif') {
            imageminArray.push(imageminGifsicle({
                optimizationLevel: 3,
                interlaced: false
            }));
        }
        if (extension == '.webp') {
            imageminArray.push(imageminWebp({
                quality: quality,
                alphaQuality: 100,
                method: 6,
                lossless: lossless
            }));
        }
        if (extension == '.svg') {
            imageminArray.push(imageminSvgo({
                plugins: [{
                    removeUselessStrokeAndFill: false
                }, {
                    removeViewBox: false
                }]
            }));
        }
        (async () => {
            await imagemin([source], upath.dirname(source), {
                plugins: imageminArray
            });
            var newSize = fs.statSync(source).size;
            var difference = originalSize - newSize;
            var percent = Math.round((difference / originalSize * 100) * 100) / 100;
            if (echo) {
                if (percent > 0) {
                    log.info(percent + '% savings (-' + difference / 1000 + ' KB) for ' + source + '. Original: ' + Math.round(originalSize / 1000 * 100) / 100 + ' KB. Minified: ' + Math.round(newSize / 1000 * 100) / 100 + ' KB.');
                } else {
                    log.warn(percent + '% savings for ' + source + '.');
                }
            }
            eventEmitter.emit('finished', source);
        })();
    }
};