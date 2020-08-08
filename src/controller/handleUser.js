const {SuccessDataModel,ErrorDataModel} = require("../model/resModel");
const {handleSearchUser, handleInsertUser} = require("../service/userService");
const {isEmpty,pick} = require('lodash');

async function handleIsExitUser(ctx, next) {

    let {userName} = ctx.request.body;
    let userInfo = await handleSearchUser({
        userName
    })

    if(!isEmpty(userInfo)){
        return new SuccessDataModel('该帐号已存在!')
    }

    return new ErrorDataModel('该帐号可以注册!');
}

async function handleRegisterUser(ctx, next){

    let existUserInfo = await handleIsExitUser(ctx);

    if(existUserInfo.success){
        return new ErrorDataModel('该帐号已存在!')
    }

    let {userName,nickName} = ctx.request.body;
    let registerUserInfo = await handleInsertUser({
        ...pick(ctx.request.body, ['userName', 'password', 'gender']),
        nickName: nickName ? nickName : userName
    });

    if(registerUserInfo.id){
        return new SuccessDataModel('注册成功!')
    }

    return new ErrorDataModel('注册失败!')
}





module.exports = {
    handleIsExitUser,
    handleRegisterUser
};