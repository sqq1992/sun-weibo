
const {blogsSeq} = require('../db/model');
const {get} = require('lodash');


async function createBlogService(params){
    const blogInfo = await blogsSeq.create({
        ...params
    })
    return get(blogInfo,'dataValues',{})
}


module.exports = {
    createBlogService,
};