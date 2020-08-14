const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const koaStatic = require('koa-static');

const blogRouterView = require('./routes/views/blogView');
const userRouterView = require('./routes/views/userRouterView');

const userApi = require('./routes/api/userApi');
const blogOperateApi = require('./routes/api/blogOperateApi');
const utilsApi = require('./routes/api/utilsApi');

const error = require('./routes/views/error')
const {targetFilePath} = require("./conf/global");
const {REDIS_CONFIG} = require("./conf/db");

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  httpOnly: true,
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

//todo 静态文件
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(targetFilePath))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

//todo session 配置
app.keys = ['SUN#1992'];
app.use(session({
  key: 'weibo.sid',
  prefix: 'weibo.sess',
  cookie: {
    path: '/',
    maxAge: 24 * 60 * 60 * 1000
  },
  // ttl: 24 * 60 * 60 * 1000,   //session 过期时间
  store: redisStore({
    all: `${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`
  })
}));



// api路由
app.use(userApi.routes(), userApi.allowedMethods());
app.use(utilsApi.routes(), utilsApi.allowedMethods());
app.use(blogOperateApi.routes(), blogOperateApi.allowedMethods());

// 页面路由
app.use(blogRouterView.routes(), blogRouterView.allowedMethods())
app.use(userRouterView.routes(), userRouterView.allowedMethods())
app.use(error.routes(), error.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
