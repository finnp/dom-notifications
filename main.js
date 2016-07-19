var yo = require('yo-yo')
var defaults = require('lodash.defaults')

module.exports = function (opts) {
  opts = opts || {}

  opts.icons = defaults(opts.icons, {
    error: 'octicon octicon-flame',
    warning: 'octicon octicon-alert',
    info: 'octicon octicon-info',
    success: 'octicon octicon-check',
    close: 'octicon octicon-x'
  })

  var notifications = []
  var tree

  return {
    element: element,
    render: render,
    add: add,
    error: error,
    info: info,
    warning: warning,
    success: success,
    state: notifications,
    options: opts
  }

  function add (notification) {
    if (typeof notification === 'string') notification = {message: notification}
    notifications.push(notification)
    update()
  }

  function error (message) {
    add({type: 'error', message: message})
  }

  function info (message) {
    add({type: 'info', message: message})
  }

  function warning (message) {
    add({type: 'warning', message: message})
  }

  function success (message) {
    add({type: 'success', message: message})
  }

  function element () {
    tree = render()
    return tree
  }

  function update () {
    yo.update(tree, render())
  }

  function render () {
    return yo`
      <div class="notification-container">
        ${
          notifications
              .map(function (notification) {
                var classNames = [
                  'notification',
                  notification.closed ? 'notification-hidden' : 'notification-show',
                  'notification-' + (notification.type || 'info')
                ]
                return yo`
                <div class="${classNames.join(' ')}">
                <div class="notification-icon">
                  <span>
                    <span class="${opts.icons[notification.type || 'info']}"></span>
                  </span>
                </div>
                ${getMessageBody(notification)}
                <span onclick=${function () { notification.closed = true; update() }} class="notification-close" title="Dismiss this notification">
                  <span class="${opts.icons.close}"></span>
                </span>
                </div>`
              })
          }
      </div>`
  }

  function getMessageBody (notification) {
    if (opts.repo && notification.type === 'error') {
      return yo`
      <div class="notification-message">
              ${notification.message}<br>
              <a href="${opts.repo}/issues/new?title=${encodeURI(notification.message)}" target="_blank" rel="noopener noreferrer" class="notification-btn">Create an issue for this error</a>
      </div>`
    } else {
      return yo`<div class="notification-message">${notification.message}</div>`
    }
  }
}
