var main = require('./main')
var style = require('./style')
var insertCss = require('insert-css')

module.exports = function (opts) {
  insertCss(style)
  return main(opts)
}
