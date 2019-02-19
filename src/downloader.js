const fs = require('fs')
const https = require('https')

module.exports = (url) =>
  new Promise((resolve, reject) => {
    let buffer = Buffer.from('')
    https.get(url, (res) => {
      res.on('data', (data) => {
        buffer = Buffer.concat([buffer, data])
      })
      res.on('end', () => {
        resolve(buffer)
      })
    })
  })
