const fs = require('fs')
const { promisify } = require('util')
const path = require('path')

const ID3 = require('node-id3')

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

  // Remove image data, to make the response smaller
  tags.raw.APIC = undefined
  tags.image = undefined

  return {
    filename,
    tags,
    imgUrl: `/sounds/${filename}/img`,
  }
}

exports.getSounds = async () => {
  const filenames = (await promisify(fs.readdir)(path.resolve('tmp'))).filter(
    (filename) => filename && filename.includes('.mp3'),
  )

  return Promise.all(filenames.map(getSound))
}
