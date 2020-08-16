
const {userSeq,userRelationsSeq} = require('../db/model');
const {get} = require('lodash');

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

async function getUserListByFollowerIdDb(followerId){

    const result = await userSeq.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: userRelationsSeq,
                where: {
                    followerId
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


module.exports = {
    handleSearchUser,
    handleInsertUser,
    updateUserInfoDb,
    getUserListByFollowerIdDb
};