# dom-notifications
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Greenkeeper badge](https://badges.greenkeeper.io/finnp/dom-notifications.svg)](https://greenkeeper.io/)
[![nanocomponent 6](https://img.shields.io/badge/nanocomponent-6-green.svg)](https://github.com/choojs/nanocomponent)

![example gif](http://i.giphy.com/l41YBkA7AKgVXXwjK.gif)

Have a look at the [example page](http://www.finnpauls.de/dom-notifications/).

## usage

Install with `npm install dom-notifications --save` and use something like
[browserify](http://browserify.org/) to create a bundle for the browser.

```js
var domNotifications = require('dom-notifications')
var notifications = domNotifications(options)

document.body.appendChild(notifications.render())

notifications.add({message: 'You are now logged in'}) // defaults to `info`
notifications.add({message: 'This is a warning', type: 'warning'})
notifications.error('Oh noes: File not found')
```

By default this uses [octicons](https://octicons.github.com/) icon classes
that are not included automatically. Here's a CDN link that serves octicons that
you can include in your HTML:
```html
<style rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/octicons/3.5.0/octicons.min.css">
```
Have a look at the options to replace them with your own icon classes.

### options
```
{
  repo: null, // Can be set to a GitHub url: 'http://github.com/finnp/notifications'
  icons: {
    error: 'octicon octicon-flame',
    warning: 'octicon octicon-alert',
    info: 'octicon octicon-info',
    success: 'octicon octicon-check',
    close: 'octicon octicon-x'

}
```

Setting the `options.repo` to a GitHub repository will add an `Create an issue for this error`
button to the error notifications.

If you need more customization, instead of using the `message` property, you
can also specify an `element` property and set it to `DOMElement` that will be the content.

For example with [nanohtml](http://github.com/choojs/nanohtml):
```js
notifications.add({
  type: 'error',
  element: html`<div>
    <strong>My super custom <em>message</em>!</strong>
  </div>`
})
```

Notifications extends [Nanocomponent](https://github.com/choojs/nanocomponent).

### `notifications.render(state?)`

Creates the root element for the component. Call this ones to append it to
the DOM. Optionally state is an array of notifications

### `notifications.add(notification)`

Add and show a notification. `notification` should be an object with a `message`
property and optionally one of the types `'error', 'warning', 'info', 'success'`
(defaults to `'info'`).

If `notification` is a string it will use this as a message and default to 'info'.

### `notifications.info(message)`
Shortcut for `.add({type: 'info', message: message})`

### `notifications.error(message)`
Shortcut for `.add({type: 'error', message: message})`

### `notifications.warning(message)`
Shortcut for `.add({type: 'warning', message: message})`

### `notifications.success(message)`
Shortcut for `.add({type: 'success', message: message})`

## Use without styles

If you don't want the styles to be used (or applied automatically),
you can also use the module like this:

```js
var Notifications = require('dom-notifications/main')

var notifications = new Notifications()

// optionally apply styles yourself
var styles = require('dom-notifications/style')
var insertCss = require('insert-css')
insertCss(styles)
```

### Notes

The styles for the notifications were adapted from [ember-cli-notifications](https://github.com/stonecircle/ember-cli-notifications)
and [atom](https://github.com/atom/notifications).
