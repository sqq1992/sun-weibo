const {handleGetBlogList, handleAddFollow, handleDeleteFollow} = require("../../controller/blogShowController");
const {loginCheckApi} = require("../../middleWares/loginCheck");

const router = require('koa-router')()
router.prefix('/api/profile')

router.get('/loadMore/:userName/:pageIndex', loginCheckApi, async (ctx, next) => {

    let {userName, pageIndex} = ctx.params;

  let result = await handleGetBlogList({
      userName,
      pageIndex,
      pageSize: 5,
      isShowTpl: true
  });

  ctx.body = result
})

router.post('/follow', loginCheckApi, async (ctx, next) => {

    let {userId:followerId} = ctx.request.body;
    let {id: myUserId} = ctx.session.userInfo;

    ctx.body = await handleAddFollow(myUserId, followerId);

});

router.post('/unFollow', loginCheckApi, async (ctx, next) => {

    let {userId:followerId} = ctx.request.body;
    let {id: myUserId} = ctx.session.userInfo;

    ctx.body = await handleDeleteFollow(myUserId, followerId);

});

module.exports = router
