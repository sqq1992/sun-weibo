const {addFollowDb,deleteFollowDb} = require("../service/userService");
const {getBlogListStr} = require("../utils/setTpl");
const {getBlogListService} = require("../service/blogShowService");
const {SuccessDataModel,ErrorDataModel} = require("../model/resModel");


async function handleGetBlogList({
    userName = '',
    pageIndex = 0,
    pageSize = 10,
    isShowTpl = false
}){
    let blogInfo = await getBlogListService({
        userName,
        pageIndex,
        pageSize
    });

    if(isShowTpl){
        blogInfo.blogListTpl = getBlogListStr(blogInfo.blogList);
    }

    return new SuccessDataModel(blogInfo);
}

async function handleAddFollow(myUserId,followerId) {

    let result = await addFollowDb(myUserId, followerId);

    if(result.id){
        return new SuccessDataModel(result)
    }

    return new ErrorDataModel('添加失败!')
}

async function handleDeleteFollow(myUserId,followerId) {

    let result = await deleteFollowDb(myUserId, followerId);

    if(result){
        return new SuccessDataModel("删除成功!")
    }

    return new ErrorDataModel('删除失败!')
}

module.exports = {
    handleGetBlogList,
    handleAddFollow,
    handleDeleteFollow
};