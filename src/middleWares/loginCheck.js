const {ErrorDataModel} = require("../model/resModel");
const {isEmpty} = require("lodash");


async function loginCheckApi(ctx,next) {
    if(ctx.session && !isEmpty(ctx.session.userInfo)){
        await next();
        return;
    }

    ctx.body = new ErrorDataModel("尚未登录!");
}

async function loginRedirect(ctx,next) {

    if(ctx.session && !isEmpty(ctx.session.userInfo)){
        await next();
        return;
    }

    const curUrl = ctx.url;
    ctx.redirect(`/login?url=${encodeURIComponent(curUrl)}`);
}


module.exports = {
    loginCheckApi,
    loginRedirect
};