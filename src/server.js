const Koa = require('koa')
const Router = require('koa-router')

const { getSounds } = require('./server/actions')

const router = new Router()

router.get('/sounds/', async (ctx) => {
  const sounds = await getSounds()
  ctx.body = { sounds }
})

const app = new Koa()

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
