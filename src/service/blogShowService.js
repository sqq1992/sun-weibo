const {blogsSeq, userSeq, userRelationsSeq} = require('../db/model');
const {get} = require('lodash');
const Sequelize = require('sequelize')

async function getBlogListService({
    userName = '',
    pageIndex = 0,
    pageSize = 10
}){

    let whereOptions = {};
    if(userName){
        whereOptions.userName = userName;
    }

    const blogInfo = await blogsSeq.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: userSeq,
                attributes: ['id', 'userName', 'password', 'nickName', 'gender', 'picture', 'city'],
                where: {
                    ...whereOptions
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
        isEmpty: blogList.length === 0,
        blogList,
        pageIndex,
        pageSize
    };
}


async function getBlogListWithFollowerService({
      userId = '',
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
            },
            {
                model: userRelationsSeq,
                attributes: ['userId', 'followerId'],
                where:{
                    userId,
                    followerId: {
                        [Sequelize.Op.ne]: userId
                    }
                }
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
        isEmpty: blogList.length === 0,
        blogList,
        pageIndex,
        pageSize
    };
}

module.exports = {
    getBlogListService,
    getBlogListWithFollowerService
};