# SCSS lint - How to bypass check-scss warnings

[Read full documentation](https://github.com/sasstools/sass-lint/blob/master/docs/toggle-rules-in-src.md)

#### Disable a rule for the entire file

```scss
// sass-lint:disable border-zero
p {
  border: none; // No lint reported
}
```

#### Disable more than 1 rule

```scss
// sass-lint:disable border-zero, quotes
p {
  border: none; // No lint reported
  content: 'hello'; // No lint reported
}
```

#### Disable a rule for a single line

```scss
p {
  border: none; // sass-lint:disable-line border-zero
}
```

#### Disable all lints within a block (and all contained blocks)

```scss
p {
  // sass-lint:disable-block border-zero
  border: none; // No result reported
}

a {
  border: none; // Failing result reported
}
```

#### Disable and enable again

```scss
// sass-lint:disable border-zero
p {
  border: none; // No result reported
}
// sass-lint:enable border-zero

a {
  border: none; // Failing result reported
}
```

#### Disable/enable all linters

```scss
// sass-lint:disable-all
p {
  border: none; // No result reported
}
// sass-lint:enable-all

a {
  border: none; // Failing result reported
}
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

- **[SCSS lint - How to bypass check-scss warnings](./scss-lint.md)**
- [JSHint - How to bypass check-js warnings](./jshint.md)

##### Javascript-based plugins

- [Plugin: Built-in JavaScript viewport informations (boilerplate_display)](./viewport-framework.md)
- [Plugin: Responsive/Retina/Lazyload image](./responsive-image-plugin.md)
- [Plugin: Lazyload Iframe](./lazyload-iframe.md)
- [Plugin: Detect New Html Elements](./detect-new-html-elements.md)