# JSHint - How to bypass check-js warnings

#### Disable and enable again

```js
/* jshint ignore:start */
var foo = eval(parameter);
/* jshint ignore:end */
```

#### Disable for a single line

```js
var foo = eval(parameter); // jshint ignore:line
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
- **[JSHint - How to bypass check-js warnings](./jshint.md)**

##### Javascript-based plugins

- [Plugin: Built-in JavaScript viewport informations (boilerplate_display)](./viewport-framework.md)
- [Plugin: Responsive/Retina/Lazyload image](./responsive-image-plugin.md)
- [Plugin: Lazyload Iframe](./lazyload-iframe.md)
- [Plugin: Detect New Html Elements](./detect-new-html-elements.md)