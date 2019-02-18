const puppeteer = require('puppeteer')
const getSoundcloudInfos = require('./scraper')

const run = async () => {
  const browser = await puppeteer.launch()

  const info = await getSoundcloudInfos(browser, process.argv[2])

  console.log(info)

  await browser.close()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
