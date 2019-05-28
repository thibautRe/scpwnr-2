const fs = require('fs')
const { promisify } = require('util')
const path = require('path')

const puppeteer = require('puppeteer')
const ID3 = require('node-id3')
const filenamify = require('filenamify')
const run = require('../run')

// hackity hack - spin the browser and keep
// it in memory
let browser
puppeteer
  .launch()
  .then((b) => {
    browser = b
  })
  .catch((err) => {
    console.error('Error when launching puppeteer')
    console.error(err)
    process.exit(1)
  })

const cachedTags = {}

const getTags = async (filename) => {
  if (cachedTags[filename]) return cachedTags[filename]

  const tags = await new Promise((resolve, reject) => {
    ID3.read(path.resolve('tmp', filename), (err, tags) => {
      if (err) return reject(err)
      resolve(tags)
    })
  })
  cachedTags[filename] = tags
  return tags
}

const getSound = async (filename) => {
  const tags = await getTags(filename)

  return {
    filename,
    tags: {
      ...tags,
      // Remove `raw` data
      raw: undefined,
      // Remove image data, to make the response smaller
      image: undefined,
    },
    imgUrl: `/sound/image/${filename}`,
  }
}

exports.getSounds = async () => {
  const filenames = (await promisify(fs.readdir)(path.resolve('tmp'))).filter(
    (filename) => filename && filename.includes('.mp3'),
  )

  return Promise.all(filenames.map(getSound))
}

exports.getImage = async (filename) => {
  const tags = await getTags(filename)
  return tags.image.imageBuffer
}

exports.download = async (scUrl) => {
  const { mp3FileBuffer, title } = await run(scUrl, browser)
  const filename = filenamify(`${title.pretty}.mp3`, { replacement: '_' })
  await promisify(fs.writeFile)(path.resolve('tmp', filename), mp3FileBuffer)
  return await getSound(filename)
}
