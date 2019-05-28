const https = require('https')

module.exports = (url) =>
  new Promise((resolve, reject) => {
    let buffer = Buffer.alloc(0)
    https.get(url, (res) => {
      res.on('data', (data) => {
        buffer = Buffer.concat([buffer, data])
      })
      res.on('end', () => {
        resolve(buffer)
      })
      res.on('error', (e) => {
        console.error(`Cannot download URL ${url}`)
        reject(e)
      })
    })
  })
