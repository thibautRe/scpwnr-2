const sanitize = (text) => text && text.replace('&amp;', '&')

module.exports = async (page) => {
  const textNode = await page.$('.fullHero__title .soundTitle__title > span')
  const text =
    textNode && (await page.evaluate((node) => node.innerHTML, textNode))
  return sanitize(text)
}
