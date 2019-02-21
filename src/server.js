const Koa = require('koa')
const Router = require('koa-router')
const koaWebpack = require('koa-webpack')

const { getSounds, getImage, download } = require('./server/actions')
const webpackConfig = require('../client/webpack.config')

const setUp = async () => {
  const router = new Router()

  router.get('/download/(.*)', async (ctx) => {
    const scUrl = ctx.params['0']

    const sound = await download(scUrl)
    ctx.body = { sound }
  })

  router.get('/sounds/', async (ctx) => {
    const sounds = await getSounds()
    ctx.body = { sounds }
  })

  router.get('/sound/image/:img*', async (ctx) => {
    if (!ctx.params.img) return ctx.throw(404)

    const imageBuffer = await getImage(ctx.params.img)

    ctx.type = 'jpg'
    ctx.body = imageBuffer
  })

  const webpackMiddleware = await koaWebpack({
    config: webpackConfig('development'),
  })

  const app = new Koa()
  app.use(webpackMiddleware)

  app.use(router.routes())
  app.use(router.allowedMethods())

  app.listen(3000, () => {
    console.log('Server listening on port 3000')
  })
}

setUp().catch((err) => {
  console.error(err)
  process.exit(1)
})
