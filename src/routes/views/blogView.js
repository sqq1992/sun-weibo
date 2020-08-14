const {loginRedirect,loginCheckApi} = require("../../middleWares/loginCheck");
const router = require('koa-router')()

router.get('/', loginRedirect,async (ctx, next) => {
  await ctx.render('index', {
    blogData:{
      isEmpty: true
    },
    title: 'Hello Koa 2!'
  })
})


// todo 测试session
router.get('/json',loginCheckApi, async (ctx, next) => {

  ctx.body = {
    title: 'koa2 json',
  }
})

module.exports = router
