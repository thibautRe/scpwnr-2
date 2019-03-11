const imageUrlScaper = require('./imageUrl')
const titleScraper = require('./title')
const dateScraper = require('./date')

module.exports = async (browser, url) => {
  const context = await browser.createIncognitoBrowserContext()
  const page = await context.newPage()
  let playlist
  page.on('requestfinished', (request) => {
    const url = request.url()
    if (!playlist && url.includes('playlist.m3u8')) {
      request
        .response()
        .text()
        .then((playlistText) => {
          playlist = playlistText.split('\n').filter((line) => line[0] !== '#')
        })
    }
  })
  await page.goto(url)

  const imgUrl = await imageUrlScaper(page)
  const title = await titleScraper(page)
  const date = await dateScraper(page)

  if (!playlist) throw new Error('Cannot find playlist URL')

  await page.close()
  return { playlist, imgUrl, date, ...title }
}
