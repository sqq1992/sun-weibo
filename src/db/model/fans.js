
const Sequelize = require('sequelize');
const seq = require('../seq');

// 创建 userRelations 数据模型
const userRelations = seq.define("userRelations",{
    userId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        comment:'用户ID对应users表中的Id'
    },
    followerId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "粉丝的用户ID"
    },
})

module.exports = {
    userRelationsSeq: userRelations
};