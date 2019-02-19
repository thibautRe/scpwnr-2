const path = require('path')
const puppeteer = require('puppeteer')
const ID3 = require('node-id3')

const getSoundcloudInfos = require('./scraper')
const download = require('./downloader')

const run = async () => {
  const browser = await puppeteer.launch()

  const info = await getSoundcloudInfos(browser, process.argv[2])
  console.log(info)

  const mp3Path = path.resolve('tmp', `${info.pretty}.mp3`)
  const imgPath = path.resolve('tmp', `${info.pretty}.jpg`)

  console.log('Downloading mp3 and cover art')
  await Promise.all([
    download(info.mp3Url, mp3Path),
    download(info.imgUrl, imgPath),
  ])

  const mp3Tags = {
    artist: info.artist,
    title: info.title,
    APIC: imgPath,
  }

  console.log('Writing mp3 tags to file')
  await new Promise((resolve, reject) => {
    ID3.write(mp3Tags, mp3Path, (err) => {
      if (err) reject(err)
      resolve()
    })
  })

  await browser.close()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
