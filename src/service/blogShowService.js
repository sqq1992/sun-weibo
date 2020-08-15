
const {blogsSeq,userSeq} = require('../db/model');
const {get} = require('lodash');


async function getBlogListService({
    userName = '',
    pageIndex = 0,
    pageSize = 10
}){

    const blogInfo = await blogsSeq.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: userSeq,
                attributes: ['id', 'userName', 'password', 'nickName', 'gender', 'picture', 'city'],
                where: {
                    userName
                },
            }
        ],
        // 分页数据
        limit: pageSize,
        offset: pageIndex * pageSize
    });

    let count = blogInfo.count;
    let blogList = blogInfo.rows.map((elem)=>{

        let detailObj = get(elem, 'dataValues', {});
        let userInfoObj = get(elem, 'user.0.dataValues', {});

        return {
            ...detailObj,
            userInfo: userInfoObj
        };
    })


    return {
        count,
        isEmpty: count === 0,
        blogList,
        pageIndex,
        pageSize
    };
}


module.exports = {
    getBlogListService,
};