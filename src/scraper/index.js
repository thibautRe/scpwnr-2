const imageUrlScaper = require('./imageUrl')
const titleScraper = require('./title')

module.exports = async (browser, url) => {
  const context = await browser.createIncognitoBrowserContext()
  const page = await context.newPage()
  let mp3Url
  page.on('requestfinished', (request) => {
    const url = request.url()
    if (!mp3Url && url.includes('cf-hls-media.sndcdn.com/media/0')) {
      // The URL structure is "<host>/media/<timestamp-start>/<timestamp-end>"
      // By adding an arbitrary big number to <timestamp-end>,
      // we make sure that we get all the audio data.
      mp3Url = url.replace('/media/0/', '/media/0/1000')
    }
  })
  await page.goto(url)

  // Retrieve image URL
  const imgUrl = await imageUrlScaper(page)
  const title = await titleScraper(page)

  if (!mp3Url)
    throw new Error(
      'Url cf-hls-media.sndcdn.com/media/0/* not requested by the page',
    )

  await page.close()
  return { mp3Url, imgUrl, ...title }
}
