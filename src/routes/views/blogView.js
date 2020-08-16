const {getFollowerDataCtr} = require("../../controller/userController");
const {getFansDataCtr,handleGetUserInfoCtr} = require("../../controller/userController");
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
  const currentLoginUserInfo = ctx.session.userInfo;
  const result = await handleGetBlogList({
    userName,
    pageSize: 5
  })

  let isMe = userName === currentLoginUserInfo.userName;
  let currentUserInfo = {};
  if(isMe){
    currentUserInfo = currentLoginUserInfo;
  }else {
    currentUserInfo = await handleGetUserInfoCtr({
      userName
    });
    currentUserInfo = currentUserInfo.data;
  }

  //获取粉丝的数据
  const fansData = await getFansDataCtr(currentUserInfo.id);

  const amIFollowed = fansData.data.list.some((elem)=>{
    return elem.userName === userName;
  })

  //获取关注人的数据
  const followerData = await getFollowerDataCtr(currentUserInfo.id);


  await ctx.render('profile', {
    blogData: result.data,
    userData: {
      userInfo: currentUserInfo,
      isMe,
      fansData: fansData.data,
      followersData: followerData.data,
      amIFollowed
    },
  });
})

router.get('/square', loginRedirect,async (ctx, next) => {

  const result = await handleGetBlogList({
    pageSize: 5
  })

  await ctx.render('square', {
    blogData: result.data,
  });
})

// todo 测试session
router.get('/json',loginCheckApi, async (ctx, next) => {

  ctx.body = {
    title: 'koa2 json',
  }
})

module.exports = router
