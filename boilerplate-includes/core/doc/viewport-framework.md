# Plugin: Built-in JavaScript viewport informations (boilerplate_display)

### Installation

Set the enable option to `true` in *boilerplate-includes/js/my-file.js* :

```js
plugins: {
    boilerplate_display: true
}
```

### Get current viewport informations.

Example in : *boilerplate-includes/js/includes/example.js*

```js
console.log(boilerplate_display);
var height = boilerplate_display.getHeight();
var width = boilerplate_display.getWidth();
var scrollY = boilerplate_display.getScrollY();
var scrollX = boilerplate_display.getScrollX();
var orientation = boilerplate_display.getOrientation();
```

### Read current viewport informations.

`boilerplate_display.width`

Returns the current width of the viewport (in pixels).

`boilerplate_display.height`

Returns the current height of the viewport (in pixels).

`boilerplate_display.scrollY`

Returns vertical scroll position of the viewport. (Like window.scrollY, but cross-browser.)

`boilerplate_display.scrollX`

Returns horizontal scroll position of the viewport. (Like window.scrollX, but cross-browser.)

`boilerplate_display.orientation`

Returns the device orientation : 'portrait', 'landscape' or 'square'.

### Get previous viewport informations (after resize).

`boilerplate_display.widthOrigin`

Returns the previous width of the viewport (in pixels).

`boilerplate_display.heightOrigin`

Returns the previous height of the viewport (in pixels).

`boilerplate_display.orientationOrigin`

Returns the previous device orientation : 'portrait', 'landscape' or 'square'.

### Get previous viewport informations (after scroll).

`boilerplate_display.scrollYOrigin`

Returns the previous vertical scroll position of the viewport.

`boilerplate_display.scrollXOrigin`

Returns the previous horizontal scroll position of the viewport.

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

- **[Plugin: Built-in JavaScript viewport informations (boilerplate_display)](./viewport-framework.md)**
- [Plugin: Responsive/Retina/Lazyload image](./responsive-image-plugin.md)
- [Plugin: Lazyload Iframe](./lazyload-iframe.md)
- [Plugin: Detect New Html Elements](./detect-new-html-elements.md)
