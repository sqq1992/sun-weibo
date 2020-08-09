const {loginCheckApi} = require("../../middleWares/loginCheck");
const router = require('koa-router')()
const koaForm = require('formidable-upload-koa')
const {handleSaveFile} = require("../../controller/utilsController");

router.prefix('/api/utils')

router.post('/upload', loginCheckApi, koaForm(), async (ctx, next) => {

  const file = ctx.req.files['file']  // 在ctx.req.files里获取到上传的文件，['file']是前端input上传文件组件的name属性值
  const { size, path, name, type } = file  // file 里面的参数
  ctx.body = await handleSaveFile({  // 将文件移动的静态资源目录，用于下载
    name,
    type,
    size,
    filePath: path
  })
});


module.exports = router
