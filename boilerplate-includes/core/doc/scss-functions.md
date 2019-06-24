# SCSS custom functions, mixins, image dimensions, inline assets

**Note:** Every asset (image or font) called with the url() statement from a node_modules/*.css stylesheet will be 
automatically base64 encoded according to the weight limit set in your main .scss file 
*boilerplate-includes/scss/my-file.scss* (in KB).

```scss
/* If this variable is omitted or set to 0, it won't do anything at all. */
$auto_base64_node_modules_css_weight_limit: 5;
```

#### Bourbon

Bourbon is a lightweight Sass tool set that provides a lot of useful functions and mixins.

```scss
@import 'bourbon';
```

[View documentation](https://www.bourbon.io/docs/latest/).

#### Inline base64 encoded files

**Paths must be relative to project's root directory (where frontendboilerplate.js is located).**

```scss
div {
    @font-face {
        font-family: 'test';
        src: url(data-inline-file('./public/assets/fonts/font-test.woff')) format('woff'),
            url(data-inline-file('./public/assets/fonts/font-test.woff2')) format('woff2');
    }
    background-image: url(data-inline-file('./public/assets/images/example.svg'));
    background-image: url(data-inline-file('./public/assets/images/example.png'));
}
```

#### Inline base64 SVG markup directly

```scss
div {
    background-image: url(data-inline-svg('<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1920 61.1" style="enable-background:new 0 0 1920 61.1;" preserveAspectRatio="none"><path d="M-29.5 55.8c325 0 630.1-55.8 989-55.8 410.3 0 656.6 55.6 1007.7 55.6v5.5H-29.5v-5.3z" fill="#fff"/></svg>'));
}
```

#### Get image width and height in PX

**Paths must be relative to project's root directory (where frontendboilerplate.js is located).**

```scss
div {
    width: image-width('./public/assets/images/example.png');
    height: image-height('./public/assets/images/example.png');
}
```

# Summary

### [Getting Started](./readme.md)

##### External stuffs

- [Use external libraries with Yarn](./external-libraries.md)
- [CMS/Framework Integration](./cms-framework.md)
- [Modernizr features detection](./modernizr.md)

##### Tools

- **[SCSS custom functions, mixins, image dimensions, inline assets](./scss-functions.md)**

##### Linting

- [SCSS lint - How to bypass check-scss warnings](./scss-lint.md)
- [JSHint - How to bypass check-js warnings](./jshint.md)

##### Javascript-based plugins

- [Plugin: Built-in JavaScript viewport informations (boilerplate_display)](./viewport-framework.md)
- [Plugin: Responsive/Retina/Lazyload image](./responsive-image-plugin.md)
- [Plugin: Lazyload Iframe](./lazyload-iframe.md)
- [Plugin: Detect New Html Elements](./detect-new-html-elements.md)