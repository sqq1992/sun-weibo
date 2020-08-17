const {userSeq} = require("./user");
const {blogsSeq} = require("./blog");
const {userRelationsSeq} = require("./fans");

blogsSeq.belongsTo(userSeq,{
    foreignKey: 'userId'
})

userRelationsSeq.belongsTo(userSeq,{
    foreignKey: 'followerId'
})
userSeq.hasMany(userRelationsSeq,{
    foreignKey: 'userId'
})

blogsSeq.belongsTo(userRelationsSeq,{
    foreignKey: 'userId',
    targetKey: 'followerId'
})


module.exports = {
    userSeq,
    blogsSeq,
    userRelationsSeq
};