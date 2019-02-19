const Koa = require('koa')
const Router = require('koa-router')
const puppeteer = require('puppeteer')

const getSoundcloudInfos = require('./scraper')

let browser
puppeteer.launch().then((b) => {
  browser = b
})

const router = new Router()

router.get('/sound/', async (ctx) => {
  if (!browser) {
    ctx.throw(500, 'Browser not ready!')
    return
  }
  const { url } = ctx.query

  const body = await getSoundcloudInfos(browser, url)

  ctx.body = body
})
const app = new Koa()

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)
