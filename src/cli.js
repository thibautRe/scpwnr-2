const path = require('path')
const fs = require('fs')
const puppeteer = require('puppeteer')

const run = require('./run')

const start = async () => {
  const browser = await puppeteer.launch()

  const { mp3FileBuffer, title } = await run(process.argv[2], browser)

  fs.writeFileSync(path.resolve('tmp', `${title.pretty}.mp3`), mp3FileBuffer)

  await browser.close()
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})
