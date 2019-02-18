const htmlUnescape = (text) => text.replace('&amp;', '&')

module.exports = (title = '', artist) => {
  return htmlUnescape(title)
}
