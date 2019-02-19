module.exports = async (page) => {
  const node = await page.$('.fullHero__info time')
  const datetime =
    node && (await page.evaluate((node) => node.getAttribute('datetime'), node))

  return datetime && new Date(datetime)
}
