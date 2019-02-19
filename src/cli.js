const path = require('path')
const puppeteer = require('puppeteer')

const getSoundcloudInfos = require('./scraper')
const download = require('./downloader')

const run = async () => {
  const browser = await puppeteer.launch()

  const info = await getSoundcloudInfos(browser, process.argv[2])

  console.log('Downloading mp3 and cover art')
  await Promise.all([
    download(info.mp3Url, path.resolve('tmp', `${info.title}.mp3`)),
    download(info.imgUrl, path.resolve('tmp', `${info.title}.jpg`)),
  ])

  console.log({ title: info.title })

  await browser.close()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
