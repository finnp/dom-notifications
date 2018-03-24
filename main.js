var Nanocomponent = require('nanocomponent')
var html = require('nanohtml')

class Notifications extends Nanocomponent {
  constructor (opts) {
    opts = opts || {}
    super()

    this.repo = opts.repo
    this.icons = Object.assign({
      error: 'octicon octicon-flame',
      warning: 'octicon octicon-alert',
      info: 'octicon octicon-info',
      success: 'octicon octicon-check',
      close: 'octicon octicon-x'
    }, opts.icons)

    this.getMessageBody = this.getMessageBody.bind(this)
    this.notifications = []
    this.renderedLength = -1
  }

  add (notification) {
    this.notifications.push(notification)
    this.rerender()
  }

  info (text) {
    this.add({type: 'info', message: text})
  }

  error (text) {
    this.add({type: 'error', message: text})
  }

  warning (text) {
    this.add({type: 'warning', message: text})
  }

  success (text) {
    this.add({type: 'success', message: text})
  }

  getMessageBody (notification) {
    if (notification.element) {
      notification.element.className = 'notification-message'
      return notification.element
    }
    if (this.repo && notification.type === 'error') {
      return html`
      <div class="notification-message">
              ${notification.message}<br>
              <a href="${this.repo}/issues/new?title=${encodeURI(notification.message)}" target="_blank" rel="noopener noreferrer" class="notification-btn">Create an issue for this error</a>
      </div>`
    } else {
      return html`<div class="notification-message">${notification.message}</div>`
    }
  }

  createElement (notifications) {
    if (notifications) this.notifications = notifications
    this.renderedLength = notifications.length
    return html`<div class="notification-container">${
      notifications
        .map((notification) => {
          var classNames = [
            'notification',
            notification.closed ? 'notification-hidden' : 'notification-show',
            'notification-' + (notification.type || 'info')
          ]
          return html`
          <div class="${classNames.join(' ')}">
          <div class="notification-icon">
            <span>
              <span class="${this.icons[notification.type || 'info']}"></span>
            </span>
          </div>
          ${this.getMessageBody(notification)}
          <span onclick=${() => { notification.closed = true; this.rerender() }} class="notification-close" title="Dismiss this notification">
            <span class="${this.icons.close}"></span>
          </span>
          </div>`
        })
    }
    </div>`
  }

  update (notifications) {
    return notifications !== this.notifications || notifications.length !== this.renderedLength
  }
}

module.exports = Notifications
