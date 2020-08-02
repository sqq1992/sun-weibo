
const Sequelize = require('sequelize');
const seq = require('./seq');


// 创建 User 模型
const User = seq.define('user',{
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
        comment:'昵称'
    }
})


// 创建 Blog 模型
const Blog = seq.define('blog',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    content:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    userId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})


// 外键关联
Blog.belongsTo(User,{
    foreignKey: 'userId'
})

// user管理到blog
User.hasMany(Blog,{
    foreignKey:'userId'
})

module.exports = {
    User,
    Blog
};

