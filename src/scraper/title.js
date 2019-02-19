module.exports = async (page) => {
  const titleNode = await page.$('.fullHero__title .soundTitle__title > span')
  const artistNode = await page.$('.fullHero__title .soundTitle__username')
  const scTitle =
    titleNode && (await page.evaluate((node) => node.innerHTML, titleNode))
  const scArtist =
    artistNode && (await page.evaluate((node) => node.innerHTML, artistNode))

  return { scTitle, scArtist }
}
