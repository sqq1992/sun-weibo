const {userSeq} = require("./user");
const {blogsSeq} = require("./blog");
const {userRelationsSeq} = require("./fans");

blogsSeq.belongsTo(userSeq,{
    foreignKey: 'userId'
})

userRelationsSeq.belongsTo(userSeq,{
    foreignKey: 'userId'
})
userSeq.hasMany(userRelationsSeq,{
    foreignKey: 'followerId'
})

module.exports = {
    userSeq,
    blogsSeq,
    userRelationsSeq
};