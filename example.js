var notifications = require('../')()
var button = document.querySelector('button')
var message = document.querySelector('#message')
var repo = document.querySelector('#repo')

document.body.appendChild(notifications.element())

button.onclick = function () {
  var type = document.querySelector('input:checked').value
  notifications.options.repo = repo.value
  notifications.add({message: message.value, type: type})
}
