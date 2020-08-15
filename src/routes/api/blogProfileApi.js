const {handleGetBlogList} = require("../../controller/blogShowController");
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



module.exports = router
