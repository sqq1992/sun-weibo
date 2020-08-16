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

module.exports = {
    userSeq,
    blogsSeq,
    userRelationsSeq
};