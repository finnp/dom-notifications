var notifications = require('../')()
var button = document.querySelector('button')
var message = document.querySelector('#message')
var repo = document.querySelector('#repo')

document.body.appendChild(notifications.render([]))

button.onclick = function () {
  var type = document.querySelector('input:checked').value
  notifications.repo = repo.value
  notifications.add({message: message.value, type: type})
}
