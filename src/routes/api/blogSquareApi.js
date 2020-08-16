const {handleGetBlogList} = require("../../controller/blogShowController");
const {loginCheckApi} = require("../../middleWares/loginCheck");

const router = require('koa-router')()
router.prefix('/api/square')

router.get('/loadMore/:pageIndex', loginCheckApi, async (ctx, next) => {

    let {pageIndex} = ctx.params;

  let result = await handleGetBlogList({
      pageIndex,
      pageSize: 5,
      isShowTpl: true
  });

  ctx.body = result
})



module.exports = router
