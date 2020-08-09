const {doCrypto} = require("../../utils/utils");
const {loginCheckApi} = require("../../middleWares/loginCheck");
const {validateUserInfo} = require("../../middleWares/valiator");
const {handleIsExitUser,handleRegisterUser,handleLoginUser,handleUpdateUserInfoCtl,handleLogout
} = require("../../controller/userController");
const router = require('koa-router')()

router.prefix('/api/user')

router.post('/isExist', async (ctx, next) => {

  let result = await handleIsExitUser(ctx, next);
  ctx.body = result
})

router.post('/register', validateUserInfo, async (ctx, next) => {
  let result = await handleRegisterUser(ctx, next);
  ctx.body = result
});

router.post('/login', async (ctx, next) => {
  let result = await handleLoginUser(ctx, next);
  ctx.body = result
})

router.post('/changeInfo', loginCheckApi, validateUserInfo, async (ctx, next) => {

  let {nickName, city, picture} = ctx.request.body;
  let {userName} = ctx.session.userInfo;
  let result = await handleUpdateUserInfoCtl(ctx, {
    nickName,
    city,
    picture
  }, {
    userName
  });

  ctx.body = result
})

router.post('/changePassword', loginCheckApi, validateUserInfo, async (ctx, next) => {

  let {password, newPassword} = ctx.request.body;
  let {userName} = ctx.session.userInfo;
  let result = await handleUpdateUserInfoCtl(ctx, {
    password: doCrypto(newPassword)
  }, {
    userName,
    password: doCrypto(password)
  });

  ctx.body = result
})

router.post('/logout', async (ctx, next) => {
  let result = await handleLogout(ctx, next);
  ctx.body = result
})

module.exports = router
