const Koa = require('koa')
const Router = require('koa-router')

const { getSounds, getImage, download } = require('./server/actions')

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
  if (!ctx.params.img) ctx.throw(404)

  const imageBuffer = await getImage(ctx.params.img)

  ctx.type = 'jpg'
  ctx.body = imageBuffer
})

const app = new Koa()

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
