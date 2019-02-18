const parser = require('./title-parser')
const formatter = require('./title-formatter')

const htmlUnescape = (text) => text.replace('&amp;', '&')

module.exports = (title = '', artist = '') =>
  formatter(parser(htmlUnescape(title), artist.trim()))
