const {loginRedirect} = require("../../middleWares/loginCheck");
const router = require('koa-router')()


router.get('/login', async (ctx, next) => {
  await ctx.render('login');
})

router.get('/register', async (ctx, next) => {
  await ctx.render('register');
})

router.get('/setting', loginRedirect,async (ctx, next) => {

  let userInfo = ctx.session.userInfo || {};
  await ctx.render('setting',{
    ...userInfo
  });
})

module.exports = router
