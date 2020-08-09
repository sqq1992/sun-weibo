
const {userSeq} = require('../db/model');
const {get} = require('lodash');

async function handleSearchUser({
    userName = '',
    ...extraParams
}) {
    const userInfo = await userSeq.findOne({
        attributes: ['userName', 'password', 'nickName', 'gender', 'picture', 'city'],
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


module.exports = {
    handleSearchUser,
    handleInsertUser
};