const {handleGetBlogListWithFollower} = require("../../controller/blogShowController");
const {loginCheckApi} = require("../../middleWares/loginCheck");
const {handleCreateBlog} = require("../../controller/blogOperateController");

const router = require('koa-router')()

router.prefix('/api/blog')

router.get('/loadMore/:pageIndex', loginCheckApi, async (ctx, next) => {

    let {pageIndex} = ctx.params;
    let {id} = ctx.session.userInfo;

  let result = await handleGetBlogListWithFollower({
      userId: id,
      pageIndex,
      isShowTpl: true
  });
  ctx.body = result
})



module.exports = router
