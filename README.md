This little module is used to load knockout templates with requireJS from the server.

It has dependencies on the require text plugin, knockout.js and the [stringTemplateEngine](https://github.com/rniemeyer/SamplePresentation/blob/master/js/stringTemplateEngine.js) by Ryan Niemeyer (included in the project).

It is used something like the following:

```javascript
define(["knockout", "template!./templates/my-template.html"], function (ko) {
   ko.applyBindings({});
});
```

Then, in your html file:

```html
<div data-bind="template: { name: 'my-template' }"></div>
```

The plugin will chop off the file extension for the template name. Alternatively, you can override the default template name by using `!`:

```javascript
define(["knockout", "template!./templates/my-template.html!myCustomName"], function (ko) {
   ko.applyBindings({});
});
```

When using the [r.js](http://requirejs.org/docs/optimization.html) optimizer, the template will be inlined into the script.