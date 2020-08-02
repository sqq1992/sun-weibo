
const Sequelize = require('sequelize');

const config = {
    host: 'localhost',
    dialect: 'mysql'
};

//todo 线上使用的连接池
// config.pool = {
//     max:5,      // 连接池的最大数量
//     min:0,      // 连接池的最小数量
//     idle: 10000  // 如何一个连接池10s之内没有被使用, 则释放
// };


const seq = new Sequelize('weibo', 'root', 'xuwei466', config);



module.exports = seq;