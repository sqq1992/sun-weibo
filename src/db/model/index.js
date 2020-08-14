const {userSeq} = require("./user");
const {blogsSeq} = require("./blog");

blogsSeq.belongsTo(userSeq,{
    foreignKey: 'userId'
})

module.exports = {
    userSeq,
    blogsSeq
};