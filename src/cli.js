const path = require('path')
const fs = require('fs')
const puppeteer = require('puppeteer')
const ID3 = require('node-id3')

const getSoundcloudInfos = require('./scraper')
const download = require('./downloader')
const sanitize = require('./sanitizer/title')

const run = async () => {
  const browser = await puppeteer.launch()

  const info = await getSoundcloudInfos(browser, process.argv[2])
  console.log(info)

  // Sanitize the title, by extracting the relevant information
  // from the data scraped from SC
  const title = sanitize(info.scTitle, info.scArtist)

  console.log('Downloading mp3 and cover art')
  const [mp3Buffer, imgBuffer] = await Promise.all([
    download(info.mp3Url),
    download(info.imgUrl),
  ])

  const mp3Tags = {
    artist: title.artist,
    title: title.name,
    remixArtist: title.remixedBy,
    date: info.date,
    year: info.date && info.date.getFullYear(),
    APIC: imgBuffer,
  }

  console.log('Writing mp3 tags to file')
  const fileBuffer = await new Promise((resolve, reject) => {
    ID3.write(mp3Tags, mp3Buffer, (err, buffer) => {
      if (err) reject(err)
      resolve(buffer)
    })
  })

  fs.writeFileSync(path.resolve('tmp', `${title.pretty}.mp3`), fileBuffer)

  await browser.close()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
