const sanitize = require('../sanitizer/title')

module.exports = async (page) => {
  const titleNode = await page.$('.fullHero__title .soundTitle__title > span')
  const artistNode = await page.$('.fullHero__title .soundTitle__username')
  const title =
    titleNode && (await page.evaluate((node) => node.innerHTML, titleNode))
  const artist =
    artistNode && (await page.evaluate((node) => node.innerHTML, artistNode))

  return sanitize(title, artist)
}
