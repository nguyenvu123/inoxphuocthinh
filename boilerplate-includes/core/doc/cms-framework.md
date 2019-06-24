# CMS/Framework Integration

##### Include a link to this documentation in your project's readme, [like this](./readme.md) :

```markdown
 [Frontend Boilerplate Documentation](./boilerplate-includes/core/doc/readme.md)
```

<hr>

##### Sources should **NOT** be accessible from public URL.

The Frontend Boilerplate should contain your application within a */whatever-www/* directory (default folder is *public/*). Refer to *boilerplate-includes/frontendboilerplate-configuration.js*.

<hr>

##### You **SHOULD** add your .gitignore rules in *boilerplate-includes/.gitignore*.

The Frontend Boilerplate will automatically take this file as a source, add the path of generated assets and output an optimised .gitignore file in your project's root directory.
In some rare cases, you may need to disable this feature. Refer to *boilerplate-includes/frontendboilerplate-configuration.js*.

# Summary

### [Getting Started](./readme.md)

##### External stuffs

- [Use external libraries with Yarn](./external-libraries.md)
- **[CMS/Framework Integration](./cms-framework.md)**
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
- [Plugin: Detect New Html Elements](./detect-new-html-elements.md)