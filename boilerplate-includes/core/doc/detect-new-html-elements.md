# Plugin: Detect New Html Elements

This plugins allows you to detect html elements as they're added to the document dynamically (through Ajax).

### Installation

Set the enable option to `true` in *boilerplate-includes/js/my-file.js* :

```js
plugins: {
    detectNewHtmlElements: true
}
```

### Usage in JavaScript


```js
(function ($) {
    'use strict';

    $(document).ready(function () {
        detectNewHtmlElements([
            {
                selector : '#carousel, #slider',
                callback : function (el) {
                    el.owlCarousel();
                }
            },
            {
                selector : '#masonry',
                callback : function (el) {
                    el.masonry();
                }
            }
        ]);
    });
    
})(jQuery);
```

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
- [Plugin: Responsive/Retina/Lazyload image](./responsive-image-plugin.md)
- [Plugin: Lazyload Iframe](./lazyload-iframe.md)
- **[Plugin: Detect New Html Elements](./detect-new-html-elements.md)**