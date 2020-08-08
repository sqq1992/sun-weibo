const {handleIsExitUser,handleRegisterUser} = require("../../controller/handleUser");
const router = require('koa-router')()

router.prefix('/api/user')

router.post('/isExist', async (ctx, next) => {

  let result = await handleIsExitUser(ctx, next);
  ctx.body = result
})

router.post('/register', async (ctx, next) => {
  let result = await handleRegisterUser(ctx, next);
  ctx.body = result
})

module.exports = router
