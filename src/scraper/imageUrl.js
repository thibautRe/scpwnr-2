const regex = /url\("(.+)"\)/

module.exports = async (page) => {
  const imgHandle = await page.$('.fullHero__artwork span[aria-role="img"]')
  const imgBackgroundCSSRule =
    imgHandle &&
    (await page.evaluate((img) => img.style['background-image'], imgHandle))

  const imgUrlRegexResult =
    imgBackgroundCSSRule && regex.exec(imgBackgroundCSSRule)
  return imgUrlRegexResult && imgUrlRegexResult[1]
}
