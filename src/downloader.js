const fs = require('fs')
const https = require('https')

module.exports = (url, filename) =>
  new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename)
    https.get(url, (res) => {
      res.on('data', (data) => {
        file.write(data)
      })
      res.on('end', () => {
        file.end()
        resolve()
      })
    })
  })
