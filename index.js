const puppeteer = require('puppeteer')
const getSoundcloudInfos = require('./src/scraper')

const run = async () => {
  const browser = await puppeteer.launch()
  const { mp3Url } = await getSoundcloudInfos(
    browser,
    'https://soundcloud.com/lucianofficial/black-coast-trndsttr-lucian-remix',
  )

  await browser.close()

  console.log({ mp3Url })
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
