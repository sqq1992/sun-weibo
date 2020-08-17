
const {userSeq,userRelationsSeq} = require('../db/model');
const {get} = require('lodash');
const Sequelize = require('sequelize')

async function handleSearchUser({
    userName = '',
    ...extraParams
}) {
    const userInfo = await userSeq.findOne({
        attributes: ['id', 'userName', 'password', 'nickName', 'gender', 'picture', 'city'],
        where:{
            userName,
            ...extraParams
        }
    })

    return get(userInfo,'dataValues',{});
}

async function handleInsertUser(params){

    const userInfo = await userSeq.create({
        ...params
    })

    return get(userInfo,'dataValues',{})
}

async function updateUserInfoDb(updateParams,searchParams){

    const userInfo = await userSeq.update({
        ...updateParams
    }, {
        where: {
            ...searchParams
        }
    });

    return !!userInfo[0];
}

async function getUserListByFansIdDb(followerId){

    const result = await userSeq.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: userRelationsSeq,
                where: {
                    followerId,
                    userId: {
                        [Sequelize.Op.ne]: followerId
                    }
                },
            }
        ],
    })

    let list = result.rows.map((elem)=>{
        return get(elem, 'dataValues', {});
    })


    return {
        count: result.count,
        list
    }

}

async function getUserListByFollowerIdDb(userId){

    const result = await userRelationsSeq.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: userSeq,
                attributes: ['id', 'userName', 'nickName', 'picture']
            }
        ],
        where: {
            userId,
            followerId: {
                [Sequelize.Op.ne]: userId
            }
        }
    })

    let list = result.rows.map((elem)=>{
        return get(elem, 'dataValues.user.dataValues', {});
    })

    return {
        count: result.count,
        list
    }

}



async function addFollowDb(myUserId,followerId) {

    const relationResult = await userRelationsSeq.create({
        userId:myUserId,
        followerId
    })

    return get(relationResult,'dataValues',{})
}

async function deleteFollowDb(myUserId,followerId) {

    const relationResult = await userRelationsSeq.destroy({
        where: {
            userId:myUserId,
            followerId
        }
    })

    return !!relationResult;
}

module.exports = {
    handleSearchUser,
    handleInsertUser,
    updateUserInfoDb,
    getUserListByFansIdDb,
    addFollowDb,
    deleteFollowDb,
    getUserListByFollowerIdDb
};