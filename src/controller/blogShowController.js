const {getBlogListStr} = require("../utils/setTpl");
const {getBlogListService} = require("../service/blogShowService");
const {SuccessDataModel} = require("../model/resModel");


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

module.exports = {
    handleGetBlogList
};