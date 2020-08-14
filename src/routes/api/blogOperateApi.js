const {loginCheckApi} = require("../../middleWares/loginCheck");
const {handleCreateBlog} = require("../../controller/blogOperateController");

const router = require('koa-router')()

router.prefix('/api/blog')

router.post('/create', loginCheckApi, async (ctx, next) => {

  let {id} = ctx.session.userInfo;
  let {content, image} = ctx.request.body;

  let result = await handleCreateBlog({
      userId: id,
      content,
      image
  });
  ctx.body = result
})



module.exports = router
