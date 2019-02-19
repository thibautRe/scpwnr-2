const parser = require('./title-parser')
const formatter = require('./title-formatter')

const htmlUnescape = (text) => text.replace('&amp;', '&')

module.exports = (title = '', artist = '') => {
  const titleStruct = parser(htmlUnescape(title), artist.trim())

  return {
    ...titleStruct,
    pretty: formatter(titleStruct),
  }
}
