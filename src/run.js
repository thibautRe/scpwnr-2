const ID3 = require('node-id3')

const getSoundcloudInfos = require('./scraper')
const download = require('./downloader')
const sanitize = require('./sanitizer/title')

const downloadPlaylist = async (playlist) => {
  let buffer = Buffer.alloc(0)
  for (const part of playlist) {
    buffer = Buffer.concat([buffer, await download(part)])
  }
  return buffer
}

module.exports = async (scUrl, browser) => {
  const info = await getSoundcloudInfos(browser, scUrl)
  console.log(info)

  // Sanitize the title, by extracting the relevant information
  // from the data scraped from SC
  const title = sanitize(info.scTitle, info.scArtist)

  console.log('Downloading mp3 and cover art')
  const [mp3Buffer, imgBuffer] = await Promise.all([
    downloadPlaylist(info.playlist),
    download(info.imgUrl),
  ])

  const id3Tags = {
    artist: title.artist,
    title: title.name,
    remixArtist: title.remixedBy,
    album: title.pretty,
    date: info.date,
    year: info.date && info.date.getFullYear(),
    APIC: imgBuffer,
    WOAF: scUrl,
  }

  console.log('Writing id3 tags to mp3 file')
  const mp3FileBuffer = await new Promise((resolve, reject) => {
    ID3.write(id3Tags, mp3Buffer, (err, buffer) => {
      if (err) reject(err)
      resolve(buffer)
    })
  })

  return { mp3FileBuffer, scInfo: info, title }
}
