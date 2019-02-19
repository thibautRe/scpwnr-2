const path = require('path')
const fs = require('fs')
const puppeteer = require('puppeteer')
const filenamify = require('filenamify')

const run = require('./run')

const start = async () => {
  const browser = await puppeteer.launch()

  const [_, __, ...urls] = process.argv
  for (const url of urls) {
    const { mp3FileBuffer, title } = await run(url, browser)
    fs.writeFileSync(
      path.resolve(
        'tmp',
        filenamify(`${title.pretty}.mp3`, { replacement: '_' }),
      ),
      mp3FileBuffer,
    )
  }

  await browser.close()
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})
