const {getUserListByFollowerIdDb} = require("../service/userService");
const {updateUserInfoDb} = require("../service/userService");
const {formatUserInfo} = require("../utils/format");
const {doCrypto} = require("../utils/utils");
const {SuccessDataModel,ErrorDataModel} = require("../model/resModel");
const {handleSearchUser, handleInsertUser} = require("../service/userService");
const {isEmpty,pick} = require('lodash');


async function handleGetUserInfoCtr(params) {

    let userInfo = await handleSearchUser({
        ...params
    });

    if(!isEmpty(userInfo)){
        return new SuccessDataModel(userInfo)
    }

    return new ErrorDataModel('找不到此帐号!');
}

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

    let {userName,password,nickName} = ctx.request.body;
    let registerUserInfo = await handleInsertUser({
        ...pick(ctx.request.body, ['userName', 'gender']),
        password:doCrypto(password),
        nickName: nickName ? nickName : userName
    });

    if(registerUserInfo.id){
        return new SuccessDataModel('注册成功!')
    }

    return new ErrorDataModel('注册失败!')
}

async function handleLoginUser(ctx, next){

    let {userName,password} = ctx.request.body;
    let userInfo = await handleSearchUser({
        userName,
        password: doCrypto(password)
    })

    if(!isEmpty(userInfo)){
        ctx.session.userInfo = formatUserInfo(userInfo);
        return new SuccessDataModel('登录成功!')
    }

    return new ErrorDataModel('帐号或密码有误!')
}

async function handleUpdateUserInfoCtl(ctx, updateParams, searchParams) {

    let result = await updateUserInfoDb(updateParams, searchParams);

    if (result) {
        ctx.session.userInfo = formatUserInfo({
            ...ctx.session.userInfo,
            ...updateParams
        })
        return new SuccessDataModel('修改成功!')
    }

    return new ErrorDataModel('修改失败!')
}

async function handleLogout(ctx){
    delete ctx.session.userInfo;
    return new SuccessDataModel();
}

async function getFansDataCtr(userId) {

    let result = await getUserListByFollowerIdDb(userId)
    return new SuccessDataModel(result)
}

module.exports = {
    handleIsExitUser,
    handleRegisterUser,
    handleLoginUser,
    handleUpdateUserInfoCtl,
    handleLogout,
    getFansDataCtr,
    handleGetUserInfoCtr
};