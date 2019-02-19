const parser = require('./title-parser')
const formatter = require('./title-formatter')

const htmlUnescape = (text) => text.replace('&amp;', '&')

module.exports = (title = '', artist = '') => {
  const titleStruct = parser(htmlUnescape(title), artist.trim())
  const pretty = formatter(titleStruct)

  return {
    ...titleStruct,
    pretty,
    // Fix weird characters for filename
    filename: pretty.replace(/\?/, '_'),
  }
}
