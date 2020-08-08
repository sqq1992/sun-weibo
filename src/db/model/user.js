
const Sequelize = require('sequelize');
const seq = require('../seq');

// 创建 user 数据模型
const user = seq.define("users",{
    userName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    nickName:{
        type: Sequelize.STRING,
        allowNull: true,
        comment:'昵称'
    },
    gender:{
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 1     //1:男  2:女
    },
    picture:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    city:{
        type: Sequelize.STRING,
        allowNull: true,
    },
})

module.exports = {
    userSeq: user
};