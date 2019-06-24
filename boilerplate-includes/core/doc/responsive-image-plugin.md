# Plugin: Responsive/Retina/Lazyload image

This plugins allows you to optimise load time on your webpages by loading and displaying an image (as a 
background-image or an img tag) depending on the size and/or the pixel density of the screen. Lazyload allows you 
to load the images as they enter the viewport, drastically improving your website's pagespeed.

- SEO friendly
- Valid HTML
- IE 10+
- Supports both \<img\> and background-image
- Detects newly added DOM elements (Ajax)
- Emits JS events at images init and update

### Installation

Set the enable option to `true` in *boilerplate-includes/js/my-file.js* :

```js
plugins: {
    responsiveImage: true
}
```

### Usage in HTML

You can add the `load_img_when_page_fully_loaded` class on any lazyloading element to force the browser to load the image when the load event is triggered on window.

|   | **\<img\>** | **background-image** |
| :--- | :--- | :--- |
| **Lazyload + Responsive + Retina** | `<img class="lazy_responsive_retina_image"` <br>`src="{{ img_url }}placeholder.jpg"` <br>`alt="Sample pic"` <br>`data-lazy-srcset-0-480="{{ img_url }}A.jpg 1x, {{ img_url }}B.jpg 2x"` <br>`data-lazy-srcset-CUSTOM-CUSTOM="{{ img_url }}C.jpg 1x, {{ img_url }}D.jpg 2x"` <br>`data-lazy-srcset-1025="{{ img_url }}E.jpg 1x, {{ img_url }}F.jpg 2x"` <br>`/>` | `<div class="lazy_responsive_retina_image"` <br>`style="background-image: url('{{ img_url }}placeholder.jpg');"` <br>`data-lazy-srcset-0-480="{{ img_url }}A.jpg 1x, {{ img_url }}B.jpg 2x"` <br>`data-lazy-srcset-CUSTOM-CUSTOM="{{ img_url }}C.jpg 1x, {{ img_url }}D.jpg 2x"` <br>`data-lazy-srcset-1025="{{ img_url }}E.jpg 1x, {{ img_url }}F.jpg 2x"` <br>`>` <br>`<noscript>` <br>`<img src="{{ img_url }}E.jpg" alt="Sample pic" />` <br>`</noscript>` <br>`</div>` |
| **Lazyload + Responsive** | `<img class="lazy_responsive_image"` <br>`src="{{ img_url }}placeholder.jpg"` <br>`alt="Sample pic"` <br>`data-lazy-src-0-480="{{ img_url }}A.jpg"` <br>`data-lazy-src-CUSTOM-CUSTOM="{{ img_url }}C.jpg"` <br>`data-lazy-src-1025="{{ img_url }}E.jpg"` <br>`/>` | `<div class="lazy_responsive_image"` <br>`style="background-image: url('{{ img_url }}placeholder.jpg');"` <br>`data-lazy-src-0-480="{{ img_url }}A.jpg"` <br>`data-lazy-src-CUSTOM-CUSTOM="{{ img_url }}C.jpg"` <br>`data-lazy-src-1025="{{ img_url }}E.jpg"` <br>`>` <br>`<noscript>` <br>`<img src="{{ img_url }}E.jpg" alt="Sample pic" />` <br>`</noscript>` <br>`</div>` |
| **Lazyload + Retina** | `<img class="lazy_retina_image"` <br>`src="{{ img_url }}placeholder.jpg"` <br>`alt="Sample pic"` <br>`data-lazy-srcset="{{ img_url }}A.jpg 1x, {{ img_url }}B.jpg 2x"` <br>`/>` | `<div class="lazy_retina_image"` <br>`style="background-image: url('{{ img_url }}placeholder.jpg');"` <br>`data-lazy-srcset="{{ img_url }}A.jpg 1x, {{ img_url }}B.jpg 2x"` <br>`>` <br>`<noscript>` <br>`<img src="{{ img_url }}A.jpg" alt="Sample pic" />` <br>`</noscript>` <br>`</div>` |
| **Responsive + Retina** | `<noscript class="responsive_retina_image"` <br>`data-custom-alt="Sample pic"` <br>`data-custom-ANY_OTHER_ATTRIBUTE="ANY VALUE"` <br>`data-srcset-0-480="{{ img_url }}A.jpg 1x, {{ img_url }}B.jpg 2x"` <br>`data-srcset-CUSTOM-CUSTOM="{{ img_url }}C.jpg 1x, {{ img_url }}D.jpg 2x"` <br>`data-srcset-1025="{{ img_url }}E.jpg 1x, {{ img_url }}F.jpg 2x"` <br>`>` <br>`<img src="{{ img_url }}E.jpg" alt="Sample pic" />` <br>`</noscript>`<br><br>This will generate an `<img class="generated_responsive_retina_image ANY_OTHER_CLASS_FROM_ATTRIBUTE_data-custom-class" />` right next to this `<noscript>` tag. | `<div class="responsive_retina_image"` <br>`data-srcset-0-480="{{ img_url }}A.jpg 1x, {{ img_url }}B.jpg 2x"` <br>`data-srcset-CUSTOM-CUSTOM="{{ img_url }}C.jpg 1x, {{ img_url }}D.jpg 2x"` <br>`data-srcset-1025="{{ img_url }}E.jpg 1x, {{ img_url }}F.jpg 2x"` <br>`>` <br>`<noscript>` <br>`<img src="{{ img_url }}E.jpg" alt="Sample pic" />` <br>`</noscript>` <br>`</div>` |
| **Lazyload** | `<img class="lazy_image"` <br>`src="{{ img_url }}placeholder.jpg"` <br>`alt="Sample pic"` <br>`data-lazy-src="{{ img_url }}A.jpg"` <br>`/>` | `<div class="lazy_image"` <br>`style="background-image: url('{{ img_url }}placeholder.jpg');"` <br>`data-lazy-src="{{ img_url }}A.jpg"` <br>`>` <br>`<noscript>` <br>`<img src="{{ img_url }}A.jpg" alt="Sample pic" />` <br>`</noscript>` <br>`</div>` |
| **Retina** | `<img class="retina_image"` <br>`src="{{ img_url }}A.jpg"` <br>`alt="Sample pic"` <br>`srcset="{{ img_url }}B.jpg 2x"` <br>`/>` | `<div class="retina_image"` <br>`data-srcset="{{ img_url }}A.jpg 1x, {{ img_url }}B.jpg 2x"` <br>`>` <br>`<noscript>` <br>`<img src="{{ img_url }}A.jpg" alt="Sample pic" />` <br>`</noscript>` <br>`</div>` |
| **Responsive** | `<noscript class="responsive_image"` <br>`data-custom-alt="Sample pic"` <br>`data-custom-ANY_OTHER_ATTRIBUTE="ANY VALUE"` <br>`data-src-0-480="{{ img_url }}A.jpg"` <br>`data-src-CUSTOM-CUSTOM="{{ img_url }}C.jpg"` <br>`data-src-1025="{{ img_url }}E.jpg"` <br>`>` <br>`<img src="{{ img_url }}E.jpg" alt="Sample pic" />` <br>`</noscript>`<br><br>This will generate an `<img class="generated_responsive_image ANY_OTHER_CLASS_FROM_ATTRIBUTE_data-custom-class" />` right next to this `<noscript>` tag. | `<div class="responsive_image"` <br>`data-src-0-480="{{ img_url }}A.jpg"` <br>`data-src-CUSTOM-CUSTOM="{{ img_url }}C.jpg"` <br>`data-src-1025="{{ img_url }}E.jpg"` <br>`>` <br>`<noscript>` <br>`<img src="{{ img_url }}E.jpg" alt="Sample pic" />` <br>`</noscript>` <br>`</div>` |

##### Notes

- Use only high-resolution (@2x) images for retina, there is no support for @3x, etc...
- \<picture\> and \<map\> tags are not supported.
- Be careful when using Retina! Your image's url should not include any comma. `http://website.com/hi,im_an_image.jpg 2x` will not work.

### Events listeners

#### Init

##### Any element :

```js
(function ($) {
    'use strict';
    
    $(document).ready(function () {
        document.addEventListener('imageInit', function (e) {
            console.log('An <img> tag has been generated or an image\'s src attribute or any markup\'s background-image-url has been set.');
            var image = e.target;
        }, true);
    });
        
})(jQuery);
```

##### Specific selector :

```js
(function ($) {
    'use strict';
    
    $(document).ready(function () {
        $('div.lazy_responsive_retina_image').on('imageInit', function (e) {
            console.log('A div\'s background-image-url has been set.');
            var image = e.target;
        });
    });
        
})(jQuery);
```

#### Update

##### Any element :

```js
(function ($) {
    'use strict';
    
    $(document).ready(function () {
        document.addEventListener('imageUpdate', function (e) {
            console.log('An <img> tag that has already been generated\'s src attribute or an image\'s src attribute or any markup\'s background-image-url has changed.');
            var image = e.target;
        }, true);
    });
        
})(jQuery);
```

##### Specific selector :

```js
(function ($) {
    'use strict';

    $(document).ready(function () {
        $('div.lazy_responsive_retina_image').on('imageUpdate', function (e) {
            console.log('A div\'s background-image-url has changed.');
            var image = e.target;
        });
    });
    
})(jQuery);
```

#### Notes

```js
(function ($) {
    'use strict';

    $(document).ready(function () {
        
        document.addEventListener('imageInit', function (e) {
            var image = e.target;
            if ($(image).is('.lazy_responsive_retina_image, .lazy_responsive_image, .lazy_retina_image, .lazy_image')) {
                if ($(image).is('img')) {
                  $(image).imagesLoaded(function() {
                     // image has loaded
                   });
                } else {
                   $(image).imagesLoaded( { background: true }, function() {
                     // background-image-url has loaded
                   });
                }
            }
        }, true);
        
        document.addEventListener('imageUpdate', function (e) {
            var image = e.target;
            if ($(image).is('.lazy_responsive_retina_image, .lazy_responsive_image, .lazy_retina_image, .lazy_image')) {
                if ($(image).is('img')) {
                  $(image).imagesLoaded(function() {
                     // image has loaded
                   });
                } else {
                   $(image).imagesLoaded( { background: true }, function() {
                     // background-image-url has loaded
                   });
                }
            }
        }, true);
        
    });
    
})(jQuery);
```

When using lazyload, you may need to detect when the "new" image has loaded. If so, you can use the code above.

However, It depends on [desandro's imagesLoaded library](https://imagesloaded.desandro.com/).

##### How to install imagesLoaded library :

1) `yarn add imagesloaded` (Add --no-bin-links if on VirtualBox.)

2) Import the script in *boilerplate-includes/js/my-file.js* : `'node_modules/imagesloaded/imagesloaded.pkgd.min.js'`

:+1: :rocket: :+1: :rocket: :+1: :rocket: :+1: :rocket: :+1: :rocket: :+1: :rocket: :+1:

# Summary

### [Getting Started](./readme.md)

##### External stuffs

- [Use external libraries with Yarn](./external-libraries.md)
- [CMS/Framework Integration](./cms-framework.md)
- [Modernizr features detection](./modernizr.md)

##### Tools

- [SCSS custom functions, mixins, image dimensions, inline assets](./scss-functions.md)

##### Linting

- [SCSS lint - How to bypass check-scss warnings](./scss-lint.md)
- [JSHint - How to bypass check-js warnings](./jshint.md)

##### Javascript-based plugins

- [Plugin: Built-in JavaScript viewport informations (boilerplate_display)](./viewport-framework.md)
- **[Plugin: Responsive/Retina/Lazyload image](./responsive-image-plugin.md)**
- [Plugin: Lazyload Iframe](./lazyload-iframe.md)
- [Plugin: Detect New Html Elements](./detect-new-html-elements.md)