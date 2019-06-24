# Modernizr features detection

##### Add specific detection(s) scripts to a bundle

*boilerplate-includes/js/my-file.js*

```js
/* Include Modernizr tests at the beginning of the bundle if feature-detects is filled. */
/* Features : https://modernizr.com/download */
plugins: {
    modernizr: {
        /* https://modernizr.com/download?video-videoloop */
        'feature-detects': [
            'test/video',
            'test/video/loop'
        ]
    }
}
```

##### Usage in javascript

*boilerplate-includes/js/includes/example.js*

```js
if (Modernizr.video.h264) {
    // Browser supports mp4 <video>
}
if (Modernizr.videoloop) {
    // Browser supports videoloop
}
```

##### Automatically add classes to the html tag

*boilerplate-includes/frontendboilerplate-configuration.js*

```js
    generateJs: {
        modernizr : {
            /* Add classes in <html> tag ? */
            'add-classes-in-html-tag': false
        },
    }
```

# Summary

### [Getting Started](./readme.md)

##### External stuffs

- [Use external libraries with Yarn](./external-libraries.md)
- [CMS/Framework Integration](./cms-framework.md)
- **[Modernizr features detection](./modernizr.md)**

##### Tools

- [SCSS custom functions, mixins, image dimensions, inline assets](./scss-functions.md)

##### Linting

- [SCSS lint - How to bypass check-scss warnings](./scss-lint.md)
- [JSHint - How to bypass check-js warnings](./jshint.md)

##### Javascript-based plugins

- [Plugin: Built-in JavaScript viewport informations (boilerplate_display)](./viewport-framework.md)
- [Plugin: Responsive/Retina/Lazyload image](./responsive-image-plugin.md)
- [Plugin: Lazyload Iframe](./lazyload-iframe.md)
- [Plugin: Detect New Html Elements](./detect-new-html-elements.md)