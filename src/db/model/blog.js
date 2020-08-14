
const Sequelize = require('sequelize');
const seq = require('../seq');

// 创建 blogs 数据模型
const blogs = seq.define("blogs",{
    userId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        comment:'用户ID对应users表中的Id'
    },
    content:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    image:{
        type: Sequelize.STRING,
        allowNull: true,
    },
})

module.exports = {
    blogsSeq: blogs
};