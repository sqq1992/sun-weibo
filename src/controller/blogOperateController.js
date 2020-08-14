const {createBlogService} = require("../service/blogOperateService");
const {SuccessDataModel,ErrorDataModel} = require("../model/resModel");


async function handleCreateBlog(params){

    let blogInfo = await createBlogService({
        ...params
    });

    if(blogInfo.id){
        return new SuccessDataModel(blogInfo);
    }

    return new ErrorDataModel('创建失败!')
}

module.exports = {
    handleCreateBlog
};