const {loginRedirect,loginCheckApi} = require("../middleWares/loginCheck");
const router = require('koa-router')()

router.get('/', loginRedirect,async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

// todo 测试session
router.get('/json',loginCheckApi, async (ctx, next) => {

  ctx.body = {
    title: 'koa2 json',
  }
})

module.exports = router
