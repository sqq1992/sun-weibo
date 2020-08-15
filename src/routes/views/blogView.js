const {handleGetBlogList} = require("../../controller/blogShowController");
const {loginRedirect,loginCheckApi} = require("../../middleWares/loginCheck");
const router = require('koa-router')()

router.get('/', loginRedirect,async (ctx, next) => {
  await ctx.render('index', {
    blogData:{
      isEmpty: true
    },
  })
})


router.get('/profile',loginRedirect,async (ctx,next)=>{
  const {userName} = ctx.session.userInfo;
  ctx.redirect(`/profile/${userName}`);
})

router.get('/profile/:userName', loginRedirect,async (ctx, next) => {

  const {userName} = ctx.params;
  const result = await handleGetBlogList({
    userName,
    pageSize: 5
  })

  await ctx.render('profile', {
    blogData: result.data,
    userData:{
      userInfo: ctx.session.userInfo
    },
  });
})



// todo 测试session
router.get('/json',loginCheckApi, async (ctx, next) => {

  ctx.body = {
    title: 'koa2 json',
  }
})

module.exports = router
